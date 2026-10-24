# SUBTALE — Asset optimization results

## Stage 0.2H.1 — Idiom (2026-10-24)

The nine-file public Idiom package decreased from **39,997,317 bytes (39.997317 MB)** to **10,942,476 bytes (10.942476 MB)**: **29,054,841 bytes / 29.054841 MB saved, 72.64%**. MB here means 1,000,000 bytes. This is asset-package size, not a measured page transfer: layout/loading has not started. Originals remain in the repository outside `public/`; source retention intentionally does not reduce total repository storage.

**Nine originals** were moved unchanged with `git mv` to `source-assets/images/`. **Nine WebP derivatives** are in `public/assets/images/`: seven ice sources, a visible transparent telephone, and an optional hidden-JPEG telephone derivative. No original Idiom PNG/JPEG remains in public. Only eight unique delivery files are visible in the designed states; never display/preload the hidden telephone base automatically.

The source registry keeps original imageHash → original `localPath` and adds separate `optimizedPath`, dimensions, byte counts and SHA256. `IDIOM_ASSET_IMPORT.json` preserves Figma dimensions/fills/crops but selects derivatives in `objectMapping`; `MOTION_SPEC.md` records their delivery paths. Per-file encoder versions, all 45 candidate measurements and QA: `docs/IDIOM_ASSET_OPTIMIZATION.json`.

### File results

Original filenames below are archived `.png` (ice and cutout) or `.jpg` (telephone base); matching delivery filenames use `.webp`.

| Asset stem | Original → delivery dimensions | Original bytes | WebP bytes | Saved | Selected encoding |
|---|---|---:|---:|---:|---|
| `idiom-ice-center` | 4096×2286 → 2304×1286 | 5,115,592 | 1,468,314 | 71.30% | lossless |
| `idiom-ice-left-small` | 4096×2286 → 2304×1286 | 5,129,695 | 1,489,202 | 70.97% | lossless |
| `idiom-ice-lower-middle` | 4096×2286 → 2304×1286 | 5,104,941 | 1,487,862 | 70.85% | lossless |
| `idiom-ice-lower-shared` | 4096×2286 → 2304×1286 | 6,893,692 | 1,488,938 | 78.40% | lossless |
| `idiom-ice-right-small` | 4096×2286 → 2304×1286 | 5,132,569 | 1,488,796 | 70.99% | lossless |
| `idiom-ice-upper-left` | 4096×2286 → 2304×1286 | 4,982,184 | 1,430,316 | 71.29% | lossless |
| `idiom-ice-upper-right` | 4096×2286 → 2304×1286 | 5,006,341 | 1,427,006 | 71.50% | lossless |
| `idiom-telephone-base` | 1792×2400 → 1344×1800 | 1,276,691 | 109,800 | 91.40% | q96 (hidden JPEG derivative) |
| `idiom-telephone-cutout` | 1792×2400 → 1344×1800 | 1,355,612 | 552,242 | 59.26% | lossless |

### Resolution and crop reasoning

At the approved 1920px viewport, the eight ice wrappers are 501×337, 232×147, 424×299, 203×379, 210×145, 133×116, 393×273 and 457×265 CSS px. The source is not simply resized to each wrapper: each crops a different region of a full 4096×2286 canvas. From the normalized crop matrices, `wrapperWidth / cropScaleX` and `wrapperHeight / cropScaleY` give an effective full-canvas display of **1080.441×603 CSS px** for every ice use. Thus 4096px originals provide ≈3.79 source pixels/CSS px, while **2304×1286** derivatives provide ≈**2.13**. Identical target canvas sizes follow independent calculations for every use, not a blind per-file resize preset. Integer height rounding is absorbed by the normalized crop mapping; no crop windows or wrapper proportions change.

The telephone slot is **635×851 CSS px**, centered FILL/cover. Original 1792×2400 sources provide ≈2.82 pixels/CSS px; **1344×1800** derivatives retain the exact original aspect ratio and ≈**2.12** pixels/CSS px. The small original FILL cover crop remains. The cable still touches the original canvas bottom; no source clipping was “repaired” or trimmed.

Retain full canvases and transparent margins; do not bake in any crop or mask. Crop coordinates remain normalized to the selected file’s actual dimensions. The eight ice wrappers, six independent SVG masks and one telephone remain separate; two lower wrappers share `idiom-ice-lower-shared.webp` but retain different crops and positions. A/B geometry, paint order, upper-left stacking change and texture overlay remain unchanged. No motion was implemented or inferred.

### Candidate selection

Each of the nine sources was tested independently with five WebP encodings after resizing: lossy q82/q90/q96 (alphaQuality 100, smartSubsample, effort 6), near-lossless q80, and lossless (effort 6). That is **45 candidates**. Candidate byte sizes follow; only selected files were copied into public.

| Asset | q82 bytes | q90 bytes | q96 bytes | near80 bytes | lossless bytes |
|---|---:|---:|---:|---:|---:|
| `idiom-ice-center` | 327,430 | 370,534 | 444,608 | 1,318,634 | 1,468,314 |
| `idiom-ice-left-small` | 329,218 | 372,564 | 447,328 | 1,336,734 | 1,489,202 |
| `idiom-ice-lower-middle` | 329,776 | 373,044 | 448,162 | 1,336,066 | 1,487,862 |
| `idiom-ice-lower-shared` | 328,920 | 372,106 | 446,720 | 1,337,038 | 1,488,938 |
| `idiom-ice-right-small` | 331,030 | 374,426 | 449,474 | 1,336,722 | 1,488,796 |
| `idiom-ice-upper-left` | 316,814 | 357,330 | 432,360 | 1,284,698 | 1,430,316 |
| `idiom-ice-upper-right` | 321,402 | 365,616 | 440,654 | 1,275,848 | 1,427,006 |
| `idiom-telephone-base` | 52,038 | 71,344 | 109,800 | 1,062,364 | 1,091,468 |
| `idiom-telephone-cutout` | 75,004 | 92,690 | 125,220 | 499,940 | 552,242 |

Lossy files are smaller but change high-contrast yellow/black/white edges and local texture. Near-lossless slightly changes alpha (up to one level in tested ice sources) while providing only a modest saving over resized lossless. **Lossless was selected individually for all eight visible PNG-derived files**: RGB wherever alpha is nonzero and every alpha sample match the resized reference exactly. This avoids adding encoding artifacts to the resampling step. Lossless refers to WebP encoding of the resized pixels; downsampling itself is not claimed to preserve all 4096px source data. The hidden, opaque telephone JPEG derivative uses q96 after its own visual/metric review; it never contributes pixels to either approved composition. Its unmodified JPEG remains archived.

### Verification

- All **nine original SHA256 values** match the Stage 0.2D.1 import fingerprints after their Git moves. All 41 original resources and nine WebPs fully decode, dimensions match their respective registries, and no duplicate original or derivative byte contents were found.
- All **eight visible WebPs** retain real zero-alpha and partial-alpha pixels, with alpha range 0–255. Their alpha and visible RGB exactly match the alpha-aware resized reference. Original margins and the telephone cable clipping are retained.
- All eight separately cropped/masked ice wrappers were inspected side by side against the archived originals at the design scale. DPR2 candidate details, checkerboard/blue edge views and both telephone sources were also inspected. No new visible halos, blocking, color fringes or loss of silhouette detail were observed in the selected files.
- Pixel comparisons use black, blue, yellow and white backgrounds at DPR1 and DPR2. Metrics are restricted to nonempty source regions for per-object measurements; complete-frame metrics are recorded separately so empty background does not hide local differences. These measure delivery-vs-original rendering, not fresh Figma pixel identity.
- Both A/B illustration reconstructions retain the normalized crop matrices, six Boolean cutouts, wrapper positions, paint order and mosaic overlay. The comparison reference is the original source/crop data already verified against Figma in Stage 0.2D.1; no Figma changes or new animation endpoints. Temporary QA renders are outside the repository.
- All **six SVG mask SHA256 values** remain unchanged. Source geometry/fill/crop metadata and all non-Idiom registry entries were compared with HEAD and remain unchanged.
- All **56 other public asset files**, including images, fonts and SVGs, remain byte-identical to the pre-task snapshot. No files from other sections were optimized.
- Reproduction check regenerated all nine outputs in memory through `scripts/optimize-idiom.mjs --verify-only`; all derivative SHA256 values matched.
- `node scripts/check-assets.mjs` → **Verified: 41 | Pending: 0 | Errors: 0**. This existing checker validates original PNG/JPEG paths; the separate full-decoding/hash/alpha checks above validate WebP delivery files.

| State | DPR | Full-frame mean absolute RGB difference, 0–255 channels |
|---|---:|---|
| A | 1 | 0.060747, 0.060357, 0.077272 |
| A | 2 | 0.110338, 0.102198, 0.136873 |
| B | 1 | 0.070750, 0.069895, 0.082822 |
| B | 2 | 0.131855, 0.125769, 0.151697 |

### Reproduction

Use an existing Sharp installation with the encoder versions in `IDIOM_ASSET_OPTIMIZATION.json`; no runtime dependency was added to this project. The current environment used bundled Sharp 0.35.5, libvips 8.18.7 and libwebp 1.6.0.

```sh
node scripts/optimize-idiom.mjs --sharp-module /absolute/path/to/sharp --verify-only
```

Omit `--verify-only` to rebuild public derivatives. The script checks original hashes first and refuses output whose checksum differs from the recorded version.

### Problems and scope limits

`docs/ASSET_WEIGHT_AUDIT.md` was absent when this task began (a repository file search found no replacement). The scoped weight/resolution audit above was reconstructed from the nine verified sources, `IDIOM_ASSET_IMPORT.json` and the Idiom section of `MOTION_SPEC.md`. No missing-source or optimization blockers remain.

Delivery was checked for the approved 1920px composition at DPR1 and DPR2. Future larger display sizes or extra zoom would need a new resolution check; original sources are retained. Figma, other-section imagery, layout, animation and application dependencies were not changed.

The completion message records the Git commit hash. To locate the committed report later: `git log -1 --format=%h -- docs/ASSET_OPTIMIZATION_RESULTS.md`.
