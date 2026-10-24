# SUBTALE — asset weight and delivery audit

**Snapshot:** current remote `main` at `d64a173bf42a` (2026-10-24). Measured from committed Git tree file sizes, not browser network requests.

## Baseline

| Class | Files | Bytes | MB (decimal) |
|---|---:|---:|---:|
| PNG | 30 | 72,325,670 | 72.33 |
| JPEG | 16 | 19,034,125 | 19.03 |
| MP4 | 4 | 1,424,446 | 1.42 |
| WOFF2 + SVG | 20 | 122,620 | 0.12 |
| **Total public assets** | **70** | **92,906,861** | **92.91** |

Image-heavy sections (includes stored original JPEG bases and PNG cutouts, not necessarily all visible in a single view):

| Group | Raster files | Raw MB |
|---|---:|---:|
| Idiom | 9 | 40.00 |
| Cultural reference | 4 | 10.46 |
| Emptiness | 5 | 8.45 |
| Footer | 6 | 8.03 |
| Pun | 4 | 6.76 |
| Hero | 5 | 6.71 |
| Shared late texture | 1 | 4.24 |
| Elephant | 2 | 3.94 |
| Double meaning | 2 | 1.97 |
| Blind-spot-scene | 2 | 0.44 |
| Film posters | 5 | 0.33 |
| Shared mosaic | 1 | 0.04 |

The **seven ice PNGs** alone weigh **0.00 MB**. The late shared texture is 4.24 MB. Source assets are intentionally unoptimized; no claim is made about their simultaneous browser download.

## Required delivery architecture

1. **Keep editable/source-exact masters**, but move them **outside `public/`**, preferably `source-assets/images/`. This prevents deployment of unused originals. Use `git mv`, not a destructive overwrite. The Figma mapping `docs/FIGMA_ASSET_MAP.json` must continue pointing at the **exact originals**, with `localPath` updated after moves.
2. Put **web-optimized derivatives** in `public/assets/images/`, preferably WebP for large alpha cutouts/photographs; use PNG or SVG where lossless vector-like edges or pixel-perfect transparency materially require it. Keep semantic names and reference optimized files from the future app. Track `sourceHash / originalPath / deliveredPath / deliveredWidth / deliveredHeight / bytes / encoder settings` in a simple manifest.
3. Do not edit original rasters in place. For Figma nodes with **multiple image fills**, preserve all active layers; hidden JPEG bases can stay as masters only unless genuinely needed by a visible state.
4. Preserve visible size, aspect ratio, premultiplied-looking edge fidelity, alpha transparency, Figma layer position/crop/blend/transform. Do not flatten the ice pieces or two-state interactive images into a single bitmap.
5. Compress to **display-size-aware assets**; avoid assuming all source images need their original 2K–4K dimensions at 1920 viewport. Provide at least 1× and 2× sensible derivatives only when visual QA demonstrates a benefit; avoid generating dozens of unused variants.
6. Prefer installed local tools such as `cwebp`, `magick`, `ffmpeg` as actually available; inspect their encoder options before choosing. No new runtime dependencies or actual app implementation. Encoder settings are QA-tuned, never asserted as universal quality.
7. Validate with representative screenshots comparing optimized and original layers **at final display size**, paying particular attention to ice edges, pixels, small text baked into images, gradients and blended layer boundaries. Record any variance. File checksum of source files must remain unchanged.
8. Implement **lazy media loading** and poster-backed videos during the app build, not now. Avoid loading all 5 videos at once. `preload="none"` or `metadata` plus poster is a reasonable initial media policy depending on interaction contract; don't hardcode before Stage 0.3.

## Stage 0.2H atomic plan

- **0.2H.1 Idiom pilot**: only 7 ice PNGs + telephone layer(s). Establish master-vs-delivery directory convention, test WebP transparent edges, compare reference layout, update manifest and validator for original paths. Report savings and any QA failures. If results are not visually faithful, keep optimized lossless or source PNG.
- **0.2H.2 Other large interactive illustrations**: Cultural reference, Pun, Double meaning, Elephant, Emptiness and Blind-spot-scene; keep independently transformable layers.
- **0.2H.3 Hero, Footer and shared textures**: focus on fast initial view and preventing giant background textures. Preserve Figma filters and mosaic tiling, avoid downscaling the 397×322 repeat texture if the repeat pattern changes.
- **0.2H.4 Video and final budget**: Sherlock MP4 is not yet pushed; retrieve it locally with the command in `docs/VIDEO_ASSETS.md`. Independently validate `ffprobe`, playback and audio; transcode only where needed for browser compatibility. Keep movie poster JPGs.

**Gate:** 41 original Figma-image hashes still resolve and validate; all real display assets load; no missing alpha/composite layers or visible regression at 1920; total shipped bytes and page-level load estimates reported. No target file-size limit overrides visible fidelity.

## Current blocker

Remote `main` contains 4/5 MP4s; `sherlock-sher-locked.mp4` still needs local copy from legacy `case-04.mp4`. Font files (both TT Bluescreens Trial weights and both IBM Plex Mono weights) are present.
