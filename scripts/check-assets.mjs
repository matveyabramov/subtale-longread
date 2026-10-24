import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const map = JSON.parse(readFileSync(resolve(root, 'docs/FIGMA_ASSET_MAP.json'), 'utf8'));
const deliveryFile = resolve(root, 'docs/ASSET_DELIVERY.json');
const delivery = existsSync(deliveryFile) ? JSON.parse(readFileSync(deliveryFile, 'utf8')) : { assets: [] };
const moduleIndex = process.argv.indexOf('--sharp-module');
const sharp = moduleIndex >= 0 ? createRequire(import.meta.url)(process.argv[moduleIndex + 1]) : null;
const problems = [], sourceHashes = new Map(), outputHashes = new Map(), decoded = new Set();
let ok = 0, pending = 0, posters = 0, outputs = 0;
// The approved Figma source registry is pinned to 41 unique image hashes.
if (map.sources.length !== 41 || new Set(map.sources.map(a => a.hash)).size !== 41) problems.push('Expected 41 unique original Figma resources');

function geometry(b) {
  if (b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    if (b.length < 33 || b.toString('ascii', 12, 16) !== 'IHDR' || !b.includes(Buffer.from('IEND'))) throw Error('Incomplete PNG');
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), format: 'PNG' };
  }
  if (b[0] === 255 && b[1] === 216) {
    let i = 2;
    while (i < b.length) {
      if (b[i++] !== 255) throw Error('Invalid JPEG marker');
      while (b[i] === 255) i++;
      const marker = b[i++];
      if (marker === 0xD9 || marker === 0xDA) break;
      if (marker === 0x01 || (marker >= 0xD0 && marker <= 0xD7)) continue;
      const length = b.readUInt16BE(i);
      if (length < 2 || i + length > b.length) throw Error('Truncated JPEG segment');
      if ([0xC0,0xC1,0xC2,0xC3,0xC5,0xC6,0xC7,0xC9,0xCA,0xCB,0xCD,0xCE,0xCF].includes(marker)) {
        return { width: b.readUInt16BE(i + 5), height: b.readUInt16BE(i + 3), format: 'JPEG' };
      }
      i += length;
    }
    throw Error('JPEG has no dimensions');
  }
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    if (b.readUInt32LE(4) + 8 !== b.length) throw Error('Truncated WebP RIFF');
    const type = b.toString('ascii', 12, 16);
    if (type === 'VP8X') return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1, format: 'WebP' };
    if (type === 'VP8L' && b[20] === 0x2F) {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3FFF) + 1, height: ((bits >>> 14) & 0x3FFF) + 1, format: 'WebP' };
    }
    if (type === 'VP8 ' && b[23] === 0x9D && b[24] === 0x01 && b[25] === 0x2A) {
      return { width: b.readUInt16LE(26) & 0x3FFF, height: b.readUInt16LE(28) & 0x3FFF, format: 'WebP' };
    }
    throw Error('Unsupported WebP bitstream');
  }
  throw Error('Unsupported image format');
}

async function check(path, width, height, expectedSha, known, expectedBytes) {
  try {
    const file = resolve(root, path);
    if (!file.startsWith(root + '/')) throw Error('Unsafe path');
    const b = readFileSync(file);
    if (!b.length) throw Error('Empty file');
    if (expectedBytes !== undefined && b.length !== expectedBytes) throw Error('Byte length differs');
    const sha = createHash('sha256').update(b).digest('hex');
    if (expectedSha && sha !== expectedSha) throw Error('SHA256 differs');
    if (known.has(sha) && known.get(sha) !== path) throw Error('Duplicate bytes with ' + known.get(sha));
    known.set(sha, path);
    const g = geometry(b);
    if (g.width !== width || g.height !== height) throw Error('Dimensions ' + g.width + 'x' + g.height + ', expected ' + width + 'x' + height);
    if (sharp && !decoded.has(file)) {
      // Header and checksum checks alone are not a full image decode.
      const { info } = await sharp(b, { failOn: 'warning' }).raw().toBuffer({ resolveWithObject: true });
      if (info.width !== width || info.height !== height) throw Error('Decoded dimensions differ');
      decoded.add(file);
    }
    console.log('OK ' + path + ' | ' + g.width + 'x' + g.height + ' | ' + g.format + ' | ' + b.length + ' bytes');
    return true;
  } catch (error) {
    problems.push(path + ': ' + error.message);
    return false;
  }
}

const outputFiles = new Map();
for (const a of map.sources) {
  if (!a.localPath) { pending++; continue; }
  if (!a.sourceSha256) { problems.push('Missing original SHA256: ' + a.localPath); continue; }
  if (await check(a.localPath, a.sourceWidth, a.sourceHeight, a.sourceSha256, sourceHashes)) ok++;
  if (a.optimizedPath) outputFiles.set(a.optimizedPath, { path: a.optimizedPath, width: a.optimizedWidth, height: a.optimizedHeight, sha256: a.optimizedSha256, bytes: a.optimizedBytes });
}
for (const a of delivery.assets) {
  if (a.poster && await check(a.sourcePath, a.sourceWidth, a.sourceHeight, a.sourceSha256, sourceHashes, a.sourceBytes)) posters++;
  if (a.optimizedPath) {
    const entry = { path: a.optimizedPath, width: a.width, height: a.height, sha256: a.sha256, bytes: a.bytes };
    if (outputFiles.has(entry.path) && JSON.stringify(outputFiles.get(entry.path)) !== JSON.stringify(entry)) problems.push('Conflicting delivery metadata: ' + entry.path);
    outputFiles.set(entry.path, entry);
  } else if (!a.sourceOnly) problems.push('Missing delivery path: ' + a.sourcePath);
}
for (const a of outputFiles.values()) {
  if (!a.path.startsWith('public/assets/')) { problems.push('Delivery outside public assets: ' + a.path); continue; }
  if (!a.sha256 || !a.width || !a.height || !a.bytes) { problems.push('Incomplete delivery metadata: ' + a.path); continue; }
  if (await check(a.path, a.width, a.height, a.sha256, outputHashes, a.bytes)) outputs++;
}
function inspectPublic(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const file = resolve(folder, entry.name);
    if (entry.isDirectory()) inspectPublic(file);
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      const path = relative(root, file);
      if (!outputFiles.has(path)) problems.push('Unregistered public raster: ' + path);
    }
  }
}
inspectPublic(resolve(root, 'public/assets'));
console.log('Verified: ' + ok + ' | Pending: ' + pending + ' | Errors: ' + problems.length);
console.log('Poster originals: ' + posters + ' | Delivery files: ' + outputs + (sharp ? ' | Fully decoded: ' + decoded.size : ' | Full decoding available with --sharp-module'));
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
