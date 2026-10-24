/** Reproduce Stage 0.2H.2 with existing local tools; no application dependencies.
 * node scripts/optimize-assets.mjs --sharp-module /path/to/sharp --jpegtran /path/to/jpegtran --verify-only
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const option = key => { const i = process.argv.indexOf(key); return i >= 0 ? process.argv[i + 1] : undefined; };
const sharp = createRequire(import.meta.url)(option('--sharp-module') || 'sharp');
const jpegtran = option('--jpegtran') || 'jpegtran';
const verify = process.argv.includes('--verify-only');
const spec = JSON.parse(readFileSync(resolve(root, 'docs/ASSET_DELIVERY.json'), 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
sharp.concurrency(2);
for (const a of spec.assets) {
  const sourceFile = resolve(root, a.sourcePath), source = readFileSync(sourceFile);
  if (source.length !== a.sourceBytes || hash(source) !== a.sourceSha256) throw Error('Changed master: ' + a.sourcePath);
  if (a.sourceOnly) { console.log('ARCHIVE ' + a.sourcePath); continue; }
  let output;
  if (a.method === 'webp') {
    const ref = await sharp(source).resize(a.width, a.height, { fit: 'fill', kernel: 'lanczos3' }).png().toBuffer();
    output = await sharp(ref).webp(a.settings).toBuffer();
  } else if (a.method === 'jpegtran') {
    output = execFileSync(jpegtran, [...a.settings.args, sourceFile], { maxBuffer: 64 * 1024 * 1024 });
  } else if (a.method === 'copy') output = source;
  else throw Error('Unknown encoding method: ' + a.method);
  if (output.length !== a.bytes || hash(output) !== a.sha256) throw Error('Output differs; check recorded encoder versions: ' + a.optimizedPath);
  if (!verify) { const target = resolve(root, a.optimizedPath); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, output); }
  console.log('VERIFIED ' + a.optimizedPath + ' | ' + output.length + ' bytes');
}
