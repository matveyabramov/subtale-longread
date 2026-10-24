import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'docs/FIGMA_ASSET_MAP.json'), 'utf8'));
let ok = 0, pending = 0;
const problems = [], known = new Map();
for (const asset of manifest.sources) {
  if (!asset.localPath) { pending++; continue; }
  const file = resolve(root, asset.localPath);
  if (!file.startsWith(root + '/')) { problems.push('Unsafe path: ' + asset.localPath); continue; }
  if (!existsSync(file)) { problems.push('Missing: ' + asset.localPath); continue; }
  const buf = readFileSync(file);
  if (!buf.length) { problems.push('Empty: ' + asset.localPath); continue; }
  const sha = createHash('sha256').update(buf).digest('hex');
  if (known.has(sha)) problems.push('Duplicate bytes: ' + asset.localPath + ', ' + known.get(sha));
  else known.set(sha, asset.localPath);
  if (buf.length >= 26 && buf.subarray(1,4).toString() === 'PNG') {
    const width = buf.readUInt32BE(16), height = buf.readUInt32BE(20);
    if (width !== asset.sourceWidth || height !== asset.sourceHeight) {
      problems.push('Dimensions: ' + asset.localPath + ': ' + width + 'x' + height +
        ', expected ' + asset.sourceWidth + 'x' + asset.sourceHeight);
      continue;
    }
    console.log('OK ' + asset.localPath + ' | ' + width + 'x' + height + ' | PNG color type ' + buf[25] + ' | ' + buf.length + ' bytes');
  } else if (buf.subarray(0,2).equals(Buffer.from([0xff,0xd8]))) {
    console.log('OK ' + asset.localPath + ' | JPEG | ' + buf.length + ' bytes');
  } else { problems.push('Unsupported format: ' + asset.localPath); continue; }
  ok++;
}
console.log('Verified: ' + ok + ' | Pending: ' + pending + ' | Errors: ' + problems.length);
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
