# Original design sources

`images/` contains the nine unchanged original Figma raster fills for Idiom moved here with `git mv` in Stage 0.2H.1. This directory is outside `public/` and is not a delivery asset directory.

- Keep these PNG/JPEG bytes, original resolution and alpha unchanged. Do not optimize in place.
- `docs/FIGMA_ASSET_MAP.json` maps each original Figma imageHash to its current `localPath`; `sourceSha256` verifies the actual file bytes. A Figma imageHash is not a file checksum.
- `optimizedPath` points to a separate WebP derivative under `public/assets/images/`. Use the derivative for future layout, retaining normalized crops, masks, visibility and independent object wrappers.
- `docs/IDIOM_ASSET_OPTIMIZATION.json` records dimensions, encoder settings and original/derivative SHA256. The hidden telephone JPEG is preserved and must not become a visible layer by default.
- `scripts/optimize-idiom.mjs` rebuilds the derivatives with an explicitly supplied Sharp installation; no application runtime dependency is required. Use the recorded encoder versions for byte-for-byte output.

This is a source archive, not an export of either complete Figma frame. The six independent SVG masks remain in `public/assets/illustrations/`.
