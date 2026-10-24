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

## Stage 0.2H.2 — all remaining raster assets (2026-10-24)

Started only after merge commit `30a570c`; no active merge, no conflicts and a clean working tree were confirmed. This single stage covers **all 37 remaining public PNG/JPEG files**: **32 Figma sources plus five movie posters**, including Hero, Emptiness, Elephant, Pun, Double Meaning, Cultural Reference, Blind-spot-scene, Footer and both shared textures. Existing Idiom files were not re-encoded or moved again.

### Package totals

| Measurement | Before | After | Saved |
|---|---:|---:|---:|
| This stage's 37-file package (excludes unchanged Idiom) | 51,362,478 bytes / 51.362478 MB | 13,987,800 bytes / 13.987800 MB | 37,374,678 bytes / 72.77% |
| All public raster images, including unchanged Idiom and five posters | **62,304,954 bytes / 62.304954 MB** | **24,930,276 bytes / 24.930276 MB** | **37,374,678 bytes / 37.374678 MB / 59.99%** |
| All public assets, including unchanged SVG, fonts and MP4 | 63,852,024 bytes / 63.852024 MB | **26,477,346 bytes / 26.477346 MB** | 37,374,678 bytes |
| Raster delivery files | 46 | 35 | 11 source-only files removed from delivery |

MB means 1,000,000 bytes. These are actual directory sizes after the merge, not browser transfer measurements. The historical weight audit is a different, pre-Idiom snapshot; its totals are not the baseline for this run. Original retention outside public intentionally does not reduce Git storage.

**37 originals archived this stage**, using `git mv` into `source-assets/images/` (posters under `video-posters/`); **46 originals now archived overall**: 41 Figma resources and five posters. All source SHA256 values, byte counts and dimensions remain unchanged. There are **26 delivery results** this stage: **19 lossless WebPs, six JPEGs and one PNG**. Eleven hidden/occluded masters are archived only. Of the 26 delivery results, 24 are smaller; two stay unchanged for the reasons below. Nine existing Idiom WebPs remain byte-identical, giving 35 public images overall.

### Complete per-file decisions

Every original path, SHA256, imageHash, delivery path/hash/dimensions, crop-use metadata, settings, encoder versions, candidate byte sizes and per-slot/background measurements are in `docs/ASSET_DELIVERY.json`. Figma registry `localPath` always locates the original; `optimizedPath` is separate. Hidden helpers explicitly use `deliveryStatus: source-only`; this does not make their original source pending.

| Original filename | Original → delivery dimensions | Original bytes | Delivery bytes | Delivery path | Decision |
|---|---|---:|---:|---|---|
| `mosaic-texture.png` | 397×322 → 397×322 | 43,725 | 43,725 | `public/assets/images/mosaic-texture.png` | Unchanged native delivery (exception) |
| `hero-person-collage.png` | 1122×1402 → 1122×1402 | 2,380,332 | 1,573,184 | `public/assets/images/hero-person-collage.webp` | WebP lossless |
| `cultural-snowflake-base.jpg` | 1792×2400 | 1,752,022 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `cultural-snowflake-cutout.png` | 1792×2400 → 1176×1575 | 2,584,249 | 854,824 | `public/assets/images/cultural-snowflake-cutout.webp` | WebP lossless |
| `au-fg-texture4-8k.jpg` | 3370×2247 → 3370×2247 | 4,242,403 | 3,536,596 | `public/assets/images/au-fg-texture4-8k.jpg` | JPEG coefficient/Huffman repack |
| `hero-eye-accent.png` | 1254×1254 → 1254×1254 | 1,050,513 | 673,426 | `public/assets/images/hero-eye-accent.webp` | WebP lossless |
| `pun-bicycle-base.jpg` | 1792×2400 | 1,637,962 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `pun-bicycle-cutout.png` | 1792×2400 → 1624×2175 | 2,600,467 | 538,332 | `public/assets/images/pun-bicycle-cutout.webp` | WebP lossless |
| `pun-wheels-base.jpg` | 1792×2400 | 1,558,592 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `pun-wheels-cutout.png` | 1792×2400 → 1624×2175 | 959,426 | 500,938 | `public/assets/images/pun-wheels-cutout.webp` | WebP lossless |
| `double-meaning-eye.png` | 3072×2048 → 1860×1240 | 940,785 | 606,452 | `public/assets/images/double-meaning-eye.webp` | WebP lossless |
| `double-meaning-eye-couple.png` | 1536×1024 → 1536×1024 | 1,027,282 | 518,428 | `public/assets/images/double-meaning-eye-couple.webp` | WebP lossless |
| `hero-film-base.jpg` | 1792×2400 | 1,428,684 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `hero-film-cutout.png` | 1792×2400 → 728×975 | 1,711,853 | 183,840 | `public/assets/images/hero-film-cutout.webp` | WebP lossless |
| `hero-man-eye.png` | 1698×2122 → 1698×2122 | 133,874 | 51,188 | `public/assets/images/hero-man-eye.webp` | WebP lossless |
| `emptiness-male-base.jpg` | 2752×1536 | 1,472,785 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `emptiness-male-cutout.png` | 2752×1536 → 2752×1536 | 1,001,055 | 517,746 | `public/assets/images/emptiness-male-cutout.webp` | WebP lossless |
| `emptiness-pixel-strip-source.png` | 1122×1402 | 2,798,104 | 0 | — | Archive only: Occluded by later opaque tiles in the only approved state |
| `emptiness-female-base.jpg` | 2752×1536 | 1,402,762 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `emptiness-female-cutout.png` | 2752×1536 → 1892×1056 | 1,770,817 | 546,618 | `public/assets/images/emptiness-female-cutout.webp` | WebP lossless |
| `elephant-base.jpg` | 2752×1536 | 1,638,136 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `elephant-cutout.png` | 2752×1536 → 1935×1080 | 2,302,668 | 825,916 | `public/assets/images/elephant-cutout.webp` | WebP lossless |
| `blind-spot-circle-source.png` | 512×512 | 222,197 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `blind-spot-circle-cutout.png` | 512×512 → 512×512 | 215,215 | 167,628 | `public/assets/images/blind-spot-circle-cutout.webp` | WebP lossless |
| `footer-eye.png` | 1774×887 → 570×285 | 2,326,187 | 142,104 | `public/assets/images/footer-eye.webp` | WebP lossless |
| `footer-unsaid-strip.png` | 2172×724 → 963×321 | 1,888,868 | 240,328 | `public/assets/images/footer-unsaid-strip.webp` | WebP lossless |
| `footer-between-lines-strip.png` | 2172×724 → 1008×336 | 1,448,962 | 201,510 | `public/assets/images/footer-between-lines-strip.webp` | WebP lossless |
| `footer-mouth.png` | 2172×724 → 951×317 | 2,260,107 | 259,488 | `public/assets/images/footer-mouth.webp` | WebP lossless |
| `footer-school-logo-base.jpg` | 640×640 | 27,132 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `footer-school-logo-cutout.png` | 640×640 → 640×640 | 78,077 | 40,014 | `public/assets/images/footer-school-logo-cutout.webp` | WebP lossless |
| `cultural-iron-throne-base.jpg` | 1792×2400 | 2,262,774 | 0 | — | Archive only: Hidden auxiliary fill in every recorded state |
| `cultural-iron-throne-cutout.png` | 1792×2400 → 1344×1800 | 3,860,281 | 1,631,728 | `public/assets/images/cultural-iron-throne-cutout.webp` | WebP lossless |
| `austin-powers-number-two.jpg` | 1600×667 → 1600×667 | 58,961 | 58,961 | `public/assets/videos/posters/austin-powers-number-two.jpg` | Unchanged native delivery (exception) |
| `sherlock-sher-locked.jpg` | 1600×900 → 1600×900 | 55,904 | 55,884 | `public/assets/videos/posters/sherlock-sher-locked.jpg` | JPEG coefficient/Huffman repack |
| `the-shining-heres-johnny.jpg` | 1600×1200 → 1600×1200 | 95,979 | 95,955 | `public/assets/videos/posters/the-shining-heres-johnny.jpg` | JPEG coefficient/Huffman repack |
| `back-to-the-future-tree.jpg` | 1600×899 → 1600×899 | 74,618 | 74,551 | `public/assets/videos/posters/back-to-the-future-tree.jpg` | JPEG coefficient/Huffman repack |
| `airplane-surely.jpg` | 1600×934 → 1600×934 | 48,720 | 48,436 | `public/assets/videos/posters/airplane-surely.jpg` | JPEG coefficient/Huffman repack |

### Method and fidelity decisions

- Every visible candidate was tested as WebP q92, q96 and lossless. Additional q85 poster, native PNG and lossless JPEG repacks were measured. Quality was selected per file; the outcome favors lossless pixels over the smaller lossy variants. No runtime dependencies were installed.
- Full source canvases and exact original aspect ratios are retained; integer dimensions are multiples of the reduced source ratio. For CROP uses, required full-canvas display size is derived from `slotWidth / cropScaleX` and `slotHeight / cropScaleY`, rather than from the slot alone. FILL uses centered cover; all normalized crop transforms, slot dimensions, rotations/reflections, clipping and paint order stay unchanged.
- Resized illustrations retain at least approximately 2.2 source samples/CSS pixel at the approved 1920px viewport, capped at the original. Native lower-resolution sources are not upsampled. Both Footer lettering strips retain 3× resolution. `image 22` stays at native resolution so the existing nonlinear Figma filters cannot acquire a new resampling interaction; the school logo also remains native. Originals remain available for future larger sizes or newly approved zoom.
- All 19 selected WebPs use lossless encoding after alpha-aware Lanczos3 resizing (or without resizing where required). Their **entire alpha plane and RGB wherever alpha is nonzero exactly match the prepared reference**. This is lossless encoding of prepared pixels, not a claim that downsampling preserves every original high-resolution sample.
- `AU-FG-Texture4-8K` stays **3370×2247** with exactly equal decoded RGB and retained ICC policy. Lossless JPEG coefficient/Huffman progressive repacking is smaller than WebP q96 and avoids adding lossy noise differences. Its CROP mapping, LIGHTEN blend and 0.2/0.4 paint opacity remain source metadata; no filter or blend is baked into the image.
- Four movie posters use lossless JPEG Huffman optimization, preserve native dimensions and decode to exactly equal RGB. Their reductions are intentionally small. No final poster/video display slot is approved, so none was invented or downscaled. MP4 files were untouched.

### Exceptions and source-only fills

1. **Mosaic:** the 397×322 PNG delivery bytes and path remain unchanged. Tests included native PNG, lossy WebP and lossless WebP. A small additional compression gain did not justify changing the shared texture references of the already verified Idiom work. Its exact repeat period, palette/alpha and TILE settings are preserved. The source master is separately archived; this is one intentional native delivery copy, not duplicate public images.
2. **Austin Powers poster:** native JPEG delivery remains unchanged. Lossless repacking increased its size; high-quality q92/q96 WebP also grew. q85 was smaller but adds another lossy generation for little absolute benefit. The original format and pixels are retained.
3. **11 source-only files:** nine hidden JPEG bases, the hidden RGB Blind-spot PNG and the Emptiness portrait strip covered by later opaque tiles. All were decoded, measured and archived unchanged, with no public derivative. Visible/alternate-state fills remain available. The two Double Meaning images are both delivered because each is visible in one state. Hidden sources remain available if a later approved motion decision requires preparing a derivative; no such reveal is inferred now.
4. **Existing limits remain:** JPEG/PNG pairs do not establish extra independent parts inside a bitmap; wheel pairs and baked paper/letter/photo compositions retain their original independence limits. CSS pixel geometry, Boolean/SVG masks, the five snowflake instances and their shared source relationship are preserved, not flattened. Footer filter conversion and film scene/playback/audio QA remain the earlier implementation/media tasks.

### Checks and visual review

All 37 source files fully decoded before migration. All 26 selected outputs were visually inspected side by side against originals; distinct Figma crop/slot configurations were compared at the 1920px design scale and DPR1/DPR2 over near-black, blue, yellow and white. Additional native DPR2 detail comparisons covered snowflake branches/counters, throne sword tips, Footer paper edges/lettering and logo. No noticeable new halos, blocking, color fringe, missing thin detail or text degradation was observed. Posters were additionally inspected at native resolution; all five selected outputs are pixel-exact to their originals.

Comparison uses SHA-verified originals and the exact Figma source geometry previously audited/imported, not a new Figma read or a browser implementation. No Figma layer, position, crop, mask, blend, source filter, opacity, stacking or animation endpoint was edited. No masks or active fill pairs were merged. Non-Idiom import reports retain their original geometry and now separately record current master/delivery paths. Idiom reports, encoder settings, sources and WebPs remain unchanged; the shared Mosaic path/bytes also remain unchanged.

- `node scripts/check-assets.mjs` → **Verified: 41 | Pending: 0 | Errors: 0**; five poster originals and all 35 delivery paths/hashes/dimensions also verified.
- The same command with the existing bundled Sharp supplied through `--sharp-module` fully decoded **81 files: 46 masters + 35 delivery files**. No damaged, missing or duplicate delivery images.
- Validator integrity was strengthened: original SHA256, original JPEG dimensions, delivery SHA256/bytes/dimensions and WebP headers are checked; optional full decoding needs no application dependency. Original checks were not weakened.
- All 37 archived master hashes/byte lengths match the pre-task snapshot and prior committed originals. All nine Idiom source entries/files and nine existing delivery files match the previous commit exactly. All 16 SVGs, four WOFF2 files and four MP4 files remain byte-identical.
- Reproduction regenerated all 26 new outputs in memory and matched their selected SHA256/byte counts, checking all 37 master hashes without touching Idiom. Encoder versions/settings are pinned in `ASSET_DELIVERY.json`; script: `scripts/optimize-assets.mjs --sharp-module /path/to/sharp --jpegtran /path/to/jpegtran --verify-only`.

No image-optimization blockers remain. Sherlock MP4 is still absent as before and was not part of image optimization; the total public size includes only the four existing MP4s. Video optimization, layout and animation were not started. This stage completes the remaining raster work in one commit; the earlier separate section-optimization plan is superseded by this requested full pass.
