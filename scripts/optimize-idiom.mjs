/** Rebuild Idiom derivatives without adding an application dependency.
 * node scripts/optimize-idiom.mjs --sharp-module /absolute/path/to/bundled/sharp
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const verifyOnly = process.argv.includes('--verify-only');
const moduleIndex = process.argv.indexOf('--sharp-module');
const sharp = require(moduleIndex >= 0 ? process.argv[moduleIndex + 1] : 'sharp');
sharp.concurrency(2);
const spec = JSON.parse(readFileSync(resolve(root, 'docs/IDIOM_ASSET_OPTIMIZATION.json'), 'utf8'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
for (const asset of spec.assets) {
  const source = readFileSync(resolve(root, asset.sourcePath));
  if (sha256(source) !== asset.sourceSha256) throw new Error('Changed original: ' + asset.sourcePath);
  // Retain the entire source canvas: existing normalized crops and separate SVG masks remain valid.
  const reference = await sharp(source)
    .resize(asset.width, asset.height, { fit: 'fill', kernel: 'lanczos3' })
    .png().toBuffer();
  const output = await sharp(reference).webp(asset.settings).toBuffer();
  if (sha256(output) !== asset.sha256) {
    throw new Error('Derivative differs; check the recorded sharp/libvips/libwebp versions: ' + asset.optimizedPath);
  }
  const target = resolve(root, asset.optimizedPath);
  if (!verifyOnly) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, output);
  }
  console.log(asset.optimizedPath + ' | ' + output.length + ' bytes | SHA256 matches');
}
