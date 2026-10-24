# Original design sources

`images/` contains all **41 unchanged original Figma raster sources**; `images/video-posters/` contains **five original JPEG movie posters**. Stage 0.2H.1 archived nine Idiom originals; Stage 0.2H.2 moved the other 37 files using `git mv`. No source file was optimized in place.

- Keep master bytes, resolution, alpha and SHA256 unchanged. `docs/FIGMA_ASSET_MAP.json` maps every original Figma imageHash to its current original `localPath`; a Figma hash is not a file checksum.
- Separate `optimizedPath` fields identify delivery pixels under `public/assets/`. `docs/ASSET_DELIVERY.json` records non-Idiom/poster master and delivery hashes, dimensions, visibility roles and encoder settings; the existing Idiom specification remains `docs/IDIOM_ASSET_OPTIMIZATION.json`.
- Eleven hidden/occluded source-only helpers are retained here without public duplicates. Do not enable a hidden JPEG behind its transparent PNG by default. A later approved reveal can prepare a derivative from these masters.
- Full canvases and normalized crops remain intact; preserve masks, blends, filters, paint order and independent object wrappers. No complete Figma frame was flattened.
- Mosaic PNG and Austin Powers poster intentionally retain source-exact native delivery copies for compatibility/fidelity. There is only one public delivery file per resource, shared between its uses.
- Existing local Sharp and jpegtran can reproduce the new delivery with `scripts/optimize-assets.mjs`; `--verify-only` checks output hashes without writing. No runtime application dependency is needed. Idiom has its own unchanged reproduction script.

Movie MP4s are not stored or optimized here. The 16 existing SVG files remain under `public/assets/illustrations/` unchanged.
