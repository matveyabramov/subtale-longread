# SUBTALE — Figma asset manifest

Current raster status (Stage 0.2E.2, 2026-10-24): **41 verified / 0 pending / 0 errors**. Every unique imageHash in `FIGMA_ASSET_MAP.json` has an original local file. All 41 files passed full pixel decoding, source-dimension and duplicate-byte checks; total original raster size is **91,025,613 bytes**. Sources remain unoptimized. Section reports preserve exact fills, crop/transform metadata and source checksums.

The inventory and staged reports below retain historical findings; earlier pending statements describe their stage dates, not current raster status. Font files, movie video selection and later implementation/visual QA remain separate work. No temporary Figma MCP URL is used as a project asset.

Current vector status (Stage 0.2F.1): **19 frames audited, 1 missing SVG imported, 15 existing SVG files reused**. All 16 SVGs parse and render without external dependencies. See `docs/VECTOR_ASSET_AUDIT.md` for the exhaustive node decision table and `docs/VECTOR_ASSET_SOURCE.json` for exact geometry and checksums.

## Initial candidate inventory (historical)

| Section / Figma node | Candidate media or vector layers | Verification / action |
|---|---|---|
| Hero `10:472` | Mosaic texture, main collage, person image, star shapes, logo/CTA icon | Export layers individually. Some collage imagery may be rasterized. Confirm transparency and cropping. |
| Experiment `10:718`, `10:730`, `10:760` | Background texture, cross and dot geometry, arrow graphics | Prefer CSS/SVG for simple geometry if exact Figma vector data supports it; verify contrast. |
| Emptiness `10:838` | Male and female isolated cutouts + many 77px pixel masking squares | Preserve editable mask/tiles separately for planned reveal; confirm exported alpha. |
| Elephant `10:917` | Custom elephant illustration, decorative pixel blocks, background texture | Export approved artwork, do not reuse legacy `elephant-temp.png`. |
| Blind zones — Idiom `10:1431`, `10:1596` | Ice block/shards, telephone receiver, separate before/after art | Pair first/second state asset coordinates. |
| Blind zones — Pun `10:1495`, `10:1981` | Bicycle frame, wheel components | Export independently for falling/rotating animation. |
| Blind zones — Double Meaning `10:1528`, `10:2017` | Eye illustration, hidden romantic figures | Compare states and masking method. |
| Blind zones — Reference `10:1560`, `10:2049` | Snowflake pieces, Iron Throne illustration | Validate two-state silhouette and relative scale. |
| Movies `10:1794` | Visual cards, text, movie scene previews | Figma does **not** establish final movie video files. Check five scene sources, captions, audio and desired hover/play behavior. Legacy MP4 files remain REVIEW only. |
| Vocab `10:966` | Large vector graphic, blue texture | Verify if graphic contains flattened text/number. |
| Blind-spot-scene `10:997` | Large central yellow/black circle `image 51`, line vectors, texture | Inspect PNG resolution and line layering for scroll reveal. |
| What-to-do `10:1272` | Blue textured background and graphical dividers | Prefer CSS for simple lines. |
| Footer `10:1016` | Torn-paper/photo collages, several raster images, texture, logos | Export original fragments and inspect visual quality. |

## Migration guardrails

No unchecked transfer from legacy `public/` or `context/`. Record each accepted file as `source path → content/role → exact destination → SHA256 → tested dimensions/transparency`. Avoid using large combined screenshots as implementation assets. No placeholders unless explicitly approved.

## Stage 0.2 — asset inventory findings

Read-only Figma export metadata obtained for all **19** top-level frames. Totals before deduplication: **128 raw-image entries + 25 SVG entries**. These are references, not 153 unique files: the same image/texture may appear in many layers or states.

| Frame | Raw | SVG |
|---|---:|---:|
| Hero `10:472` | 11 | 7 |
| Experiment 1/2/3 `10:718` / `10:730` / `10:760` | 3 | 6 |
| Emptiness `10:838` | 11 | 1 |
| Elephant `10:917` | 5 | 1 |
| Idiom 1/2 `10:1431` / `10:1596` | 34 | 0 |
| Pun 1/2 `10:1495` / `10:1981` | 18 | 0 |
| Double meaning 1/2 `10:1528` / `10:2017` | 10 | 0 |
| Cultural reference 1/2 `10:1560` / `10:2049` | 10 | 0 |
| Movies `10:1794` | 1 | 2 |
| Vocab `10:966` | 1 | 1 |
| Blind-spot-scene `10:997` | 5 | 5 |
| What-to-do `10:1272` | 2 | 2 |
| Footer `10:1016` | 18 | 0 |

**Shared images found by internal Figma hash** (not cryptographic checksums): Mosaic texture `6be621144e7ecf462b8e2789f21ec8f7499d659e` appears throughout early sections; `AU-FG-Texture4-8K` `364855320f08ade1d04f13556e9f3defb0d52bcb` appears in the later ones. Deduplicate each to a single optimized local source.

**Animation-related findings:** ice shards often reuse the same underlying image under different crops; the two Pun states reuse the same bicycle image fills; the two Double meaning states reuse the same eye image fills; five snowflake elements use two repeated underlying fills at different sizes. Implement independent layers/transforms rather than storing duplicate bitmaps for each state, unless a visual comparison shows distinct imagery.

**Font audit:** Figma file has 229 text nodes; 133 report `hasMissingFont`. Families/styles: TT Bluescreens Trial ExtraBold (128), Bold (5); IBM Plex Mono Medium (92), SemiBold (1); Inter Semi Bold (2); Manrope SemiBold (1). No local Figma variable collections or Figma text styles were returned. Prioritize collecting **font files with correct styles** so rendered geometry can match; no legal/licensing audit is in scope for this educational project.

**Outstanding:** original asset bytes, deduplicated count, intrinsic pixel dimensions, transparency, optimization, reliable font files, and candidate film video verification. Figma MCP provided short-lived export URLs but no original files have been saved in this repository. All images are still pending local download and pixel QA. **Do not mark asset migration complete based on the metadata inventory alone.**

## Stage 0.2 — verified transfers (2026-10-24)

Original bytes acquired via read-only Figma Plugin API, transferred directly into GitHub as Git blobs (not screenshot derivatives):

| Git path | Figma node / hash | Format | Actual image geometry |
|---|---|---|---|
| `public/assets/images/mosaic-texture.png` | `10:473`, `6be621144e7ecf462b8e2789f21ec8f7499d659e` | original PNG | 397 × 322; 43,725 bytes |
| `public/assets/illustrations/subtale-pixel-mark.svg` | `10:612` | exported SVG | 5,018 bytes |
| `public/assets/illustrations/star-accent.svg` | `10:474` | exported SVG | 300 bytes |

A machine-readable Figma hash-to-layer registry is in `docs/FIGMA_ASSET_MAP.json`, covering **41 unique image hashes** found in the current Figma file. Its `localPath` field is null until the actual source is saved. Run `node scripts/check-assets.mjs` once assets are present locally; it checks files, PNG geometry and duplicate bytes without npm installs. SVGs are not included in the raster hash inventory.

**Not yet done:** export the other 40 raster sources, verify images' real alpha pixels / visual cropping, fetch needed font files, collect movie MP4s. The next import should target the actual Hero art and the individual exploded-animation layers. The secondary texture is a large JPEG (3370 × 2247; 4.24 MB) and should be downloaded locally rather than transmitted in small API chunks.

## Stage 0.2A — Hero original assets (2026-10-24)

Imported **11 new files, 6,706,924 bytes** from Hero `10:472`: five original raster sources and six separate SVG exports. Existing mosaic texture, star accent and pixel mark are reused. Updated five raster `localPath` entries in `FIGMA_ASSET_MAP.json`. Detailed source identities, SHA256 checksums, original-byte fingerprints, alpha pixel counts, SVG node mappings and crop/fill metadata: `docs/HERO_ASSET_IMPORT.json`.

| New file under `public/assets/` | Original geometry / role |
|---|---|
| `images/hero-film-base.jpg` | 1792 × 2400; hidden original JPEG fill of `10:477` |
| `images/hero-film-cutout.png` | 1792 × 2400; visible transparent PNG fill of `10:477` |
| `images/hero-person-collage.png` | 1122 × 1402; shared source for four Union crops |
| `images/hero-man-eye.png` | 1698 × 2122; isolated eye with original transparent canvas |
| `images/hero-eye-accent.png` | 1254 × 1254; circular eye accent and yellow rays |
| `illustrations/hero-cta-arrow.svg` | Separate arrow; reused by both CTA nodes |
| `illustrations/hero-star-62.svg` | Shared by stars `10:478`, `10:479`, `10:480` |
| `illustrations/hero-star-43.svg` | Star `10:481` |
| `illustrations/hero-star-78x79.svg` | Star `10:482` |
| `illustrations/hero-star-50.svg` | Star `10:483` |
| `illustrations/hero-star-108.svg` | Star `10:687` |

**Checks:** `node scripts/check-assets.mjs` → **Verified: 6 | Pending: 35 | Errors: 0**. Additional decoded pixel checks verified all five new raster dimensions (including JPEG), real alpha pixels and transparent edges in all four PNGs. Visually inspected originals on a checkerboard. All eight local SVGs parse, have positive dimensions/viewBox and no embedded raster images. Downloaded original raster bytes match Figma byte counts and FNV-1a fingerprints; existing pixel mark and star match direct SVG exports exactly.

**Composition findings:** film JPEG is hidden in Figma; preserve it as a source, not a visible extra layer. Four Union fragments have a yellow SOLID underlay plus the same transparent portrait IMAGE with different crops; these are not redundant layers. Crop transforms and visibility are recorded for the later layout stage. Original transparent margins remain intact. No Hero-wide render is stored as an asset. No outstanding Hero source downloads; remaining 35 raster hashes are outside this stage. No Figma edits, layout implementation, optimization or dependency installation.

## Stage 0.2B — Emptiness original assets (2026-10-24)

Imported **5 original raster files, 8,445,523 bytes** from Emptiness `10:838`. Updated all five corresponding `localPath` entries. Existing `images/mosaic-texture.png` is reused by Figma hash and its original byte fingerprint was verified; no duplicate texture was saved. Source identities, SHA256 checksums, pixel QA, character crop transforms and pixel-layer coordinates/order are recorded in `docs/EMPTINESS_ASSET_IMPORT.json`.

| New file under `public/assets/images/` | Figma source | Original dimensions | Role |
|---|---|---|---|
| `emptiness-male-base.jpg` | `10:864`, `40eccc4ce44ce41732834332152c96e11bfcaabd` | 2752 × 1536 | Hidden original JPEG fill; white background |
| `emptiness-male-cutout.png` | `10:864`, `a7989beee0d2ab130f2012d50167c4ed4862f4d0` | 2752 × 1536 | Visible transparent male PNG, CROP fill |
| `emptiness-female-base.jpg` | `10:899`, `5117fe324500367f27967d387a1ca2d13f13b5b0` | 2752 × 1536 | Hidden original JPEG fill; white background |
| `emptiness-female-cutout.png` | `10:899`, `7a1b43ea9e3c8bbaab739debe43323d87d1c550f` | 2752 × 1536 | Visible transparent female PNG, CROP fill |
| `emptiness-pixel-strip-source.png` | `10:875`, `b7c41bc585e7ce56a516ed7cc7c897a8339c874d` | 1122 × 1402 | Distinct transparent portrait source in a Union strip; currently occluded |

**Fills and transparency:** both characters contain a hidden JPEG followed by a visible PNG. Retain both originals, but do not display the JPEG automatically. All three PNGs contain real fully transparent and partially transparent pixels, including transparent edge pixels. Both character sources reach the bottom of their original canvas; this existing source clipping and their large transparent margins were preserved. No trimming, resizing or re-encoding was performed.

**Pixel-mask assessment:** artwork group `10:846` is 1049 × 480 at frame offset (801, 300). It has **50 direct solid yellow squares, each 77 × 77**, two character image layers and two Union layers. All inspected `isMask` flags are false: the pixel effect comes from overlapping layers, not a Figma mask. The squares have no rotation, corner radius, strokes or effects and can use CSS rectangles. Each Union consists of three adjacent 77 × 77 squares, producing a 231 × 77 rectangle; their geometry also needs no separate graphic file. `10:882` has only a solid yellow fill. `10:875` has yellow plus a cropped PNG portrait; that source is preserved separately, rather than flattened into a strip or replaced with the different Hero portrait.

**Paint order matters:** the PNG fill of `10:875` is fully covered by later opaque squares `10:881`, `10:880`, `10:904`, whose bounds exactly tile its 231 × 77 area. It contributes no visible pixels in the current static composition. Squares `10:898` and `10:901` share bounds but sit on opposite sides of female layer `10:899` in paint order; do not deduplicate their source records by coordinates alone. The later layout can use CSS for pixel geometry and original PNGs for imagery while preserving this stacking and the recorded crop transforms. No pixel-square SVGs or composite frame images were imported.

**Checks:** original byte counts and FNV-1a fingerprints match Figma for all five downloads; decoded JPEG/PNG dimensions match the registry; visually inspected originals against a checkerboard. A temporary pixel QA reconstruction using the original crops and child order was visually compared with the Figma composition. `node scripts/check-assets.mjs` → **Verified: 11 | Pending: 30 | Errors: 0**. No duplicate raster bytes detected.

**Outstanding:** no missing Emptiness source files. Whether the occluded portrait strip should appear during a future reveal is not established by this static frame; its source is retained for the motion stage. The remaining 30 raster hashes belong to other sections. No Figma edits, layout or animation implementation, dependency installation, or changes to legacy files.

## Stage 0.2C — Elephant original assets (2026-10-24)

Imported **2 original raster files, 3,940,804 bytes** from Elephant `10:917`; updated both `localPath` entries. Existing `images/mosaic-texture.png` is reused by its Figma hash and verified original byte fingerprint. Source identities, SHA256 checksums, pixel QA, transforms, decoration coordinates and divider paths are recorded in `docs/ELEPHANT_ASSET_IMPORT.json`.

| New file under `public/assets/images/` | Figma source | Original dimensions | Bytes | Role |
|---|---|---|---:|---|
| `elephant-base.jpg` | `10:920`, `32e0e75e18ed7cf100a240a42dc39d57bdf810d4` | 2752 × 1536 | 1,638,136 | Hidden original JPEG fill; opaque gray background |
| `elephant-cutout.png` | `10:920`, `4c9b031136e4b4714ea5f8a5806597a98bfa2d41` | 2752 × 1536 | 2,302,668 | Visible transparent PNG fill |

**Composition:** node `10:920` has a hidden JPEG followed by a visible PNG at full opacity, NORMAL blend, FILL mode. Only the PNG contributes the elephant illustration; the JPEG is retained as an original source and must not be rendered automatically behind it. No other non-background image layers were found. The PNG contains 2,491,799 fully transparent pixels, 31,616 partially transparent pixels and transparent pixels on all four canvas edges. The full silhouette and original transparent margins were preserved without trimming, resizing or re-encoding. Visually checked both originals on a checkerboard against the Figma artwork.

**CSS candidates:** nine decorative yellow squares `10:948`–`10:956` are plain axis-aligned rectangles, **77.1428604 × 77.1428604**, with no corner radius, strokes or effects. Preserve their recorded fractional dimensions, coordinates and clipping at the right frame edge; they need no standalone PNG/SVG. The yellow art frame `10:919` is a transparent rectangle with a 10px inside border and approximately 2° Figma rotation; it also fits CSS. Keep its unclipped image overflow and the image's separate inverse transform. Five divider vectors `10:924`, `10:929`, `10:934`, `10:939`, `10:943` are identical straight 1920px paths with centered 4px white strokes at 0.3 opacity; CSS rules can reproduce them without dedicated SVG files. These are implementation findings only; no CSS or animation was implemented.

**Background:** reuse the 397 × 322 mosaic with its existing TILE scale and 0.4 paint opacity. Current Elephant frame is 1920 × 2187; the texture layer is 1920 × 2512 and is clipped by the frame. Do not turn the texture's layer size into an image export or a new viewport assumption.

**Checks:** both original byte counts and FNV-1a fingerprints match Figma; decoded JPEG/PNG dimensions match the registry, and PNG transparency was verified by actual pixels. `node scripts/check-assets.mjs` → **Verified: 13 | Pending: 28 | Errors: 0**. No duplicate raster bytes detected. No unresolved Elephant source questions; remaining 28 hashes are outside this stage. No Figma edits, layout, animation, dependency installation, or legacy-file changes.

## Stage 0.2D.1 — Idiom original assets and state mapping (2026-10-24)

Compared frames A `10:1431` and B `10:1596`. Imported **9 unique original raster files (39,997,317 bytes)** plus **6 geometry-only SVG clipping masks (1,141 bytes)**: **15 files, 39,998,458 bytes total**. Updated nine `localPath` entries. Reused the existing mosaic by imageHash and verified its original byte fingerprint. No combined frame images or duplicate state/fragment bitmaps were imported.

| New file under `public/assets/images/` | Figma imageHash | Original size | Bytes |
|---|---|---|---:|
| `idiom-ice-upper-left.png` | `35938ea29ed9ca1307edc53950674e4c8ebe63d5` | 4096 × 2286 | 4,982,184 |
| `idiom-ice-lower-middle.png` | `528b075a5c6b35f819c787bff455d9dbd2436c83` | 4096 × 2286 | 5,104,941 |
| `idiom-ice-upper-right.png` | `c027bce002d6d9ef41326d8cce3bb29eac6f7e22` | 4096 × 2286 | 5,006,341 |
| `idiom-ice-center.png` | `a29311f1f1d2be133c14d891089c6650c953c32e` | 4096 × 2286 | 5,115,592 |
| `idiom-ice-right-small.png` | `82405a0f66f9cee86dbb6403577b78f20ce30fd4` | 4096 × 2286 | 5,132,569 |
| `idiom-ice-left-small.png` | `b71b959d5e0c085f6c923f1d4bc1aa9ef978464e` | 4096 × 2286 | 5,129,695 |
| `idiom-ice-lower-shared.png` | `b0d17f5142962d3ddc19f08fa9cae9df92eac834` | 4096 × 2286 | 6,893,692 |
| `idiom-telephone-base.jpg` | `bfdc63b7bc0f0d5abbdf1a00f3ec8121daffde5a` | 1792 × 2400 | 1,276,691 |
| `idiom-telephone-cutout.png` | `be5817d93162046d2b9f3af61b7489db7df1278c` | 1792 × 2400 | 1,355,612 |

Six masks in `public/assets/illustrations/`: `idiom-ice-upper-right-mask.svg`, `idiom-ice-center-mask.svg`, `idiom-ice-right-small-mask.svg`, `idiom-ice-left-small-mask.svg`, `idiom-ice-lower-left-mask.svg`, `idiom-ice-lower-right-mask.svg`. These reproduce the original Boolean SUBTRACT geometry from measured rectangle operands; they are explicitly derived clipping assets, not direct Figma SVG exports. Each contains only a white opaque remaining path and transparent cutouts, with no embedded raster. Both states share the same masks. Exact source operand identities, coordinates and reproduction details are retained in `docs/IDIOM_ASSET_IMPORT.json`.

**Fills and deduplication:** all seven ice PNGs are distinct original imageHashes with pixel differences, even where full artwork looks similar. Keep each original. Eight visible ice objects use these seven sources: both lower corner objects reuse `idiom-ice-lower-shared.png` with different crops. Telephone JPEG is hidden and PNG is visible; preserve both without enabling the JPEG in the composition. All eight PNG sources have real zero-alpha and partial-alpha pixels, including transparent edges. Original source canvases and cable clipping at the telephone PNG's bottom edge are retained. No cropping, resizing or re-encoding of originals.

**State comparison:** all eight ice objects and their 20 descendants retain position, dimensions, rotation, fills, crop transforms, opacity and Boolean geometry. B adds the telephone; the upper-left shard also moves below the telephone and below the mosaic in paint order. In B the mosaic overlays that shard and the telephone, while the other seven ice objects remain above it. Both states are 1920 × 1080. Full per-object A/B node correspondence, transforms, scales and stacking are documented in `docs/MOTION_SPEC.md`; exact metadata and SHA256 checksums are in `docs/IDIOM_ASSET_IMPORT.json`.

**Checks:** nine original byte counts and FNV-1a fingerprints match Figma; decoded dimensions match the registry; actual alpha pixels verified. Originals were visually inspected on a checkerboard. Temporary QA reconstructions using the recorded crops, Boolean cutouts and paint order were visually compared with both Figma screenshots. SVGs parse and retain the measured object bounds and cutouts. `node scripts/check-assets.mjs` → **Verified: 22 | Pending: 19 | Errors: 0**; no duplicate raster bytes.

**Animation feasibility:** eight ice wrappers and one telephone can animate independently; each ice crop/mask must move with its wrapper. These endpoints establish no ice movement or explosion. Telephone entry pose, timing, easing, trigger, replay/interruption and stacking transition remain decisions for the motion stage. No source downloads remain for Idiom. No Figma edits, layout/animation implementation, dependency installation or legacy-file changes.

## Stage 0.2D.2 — Pun bicycle originals and state mapping (2026-10-24)

Compared frames A `10:1495` and B `10:1981`. Imported **4 original raster files, 6,756,447 bytes**; updated four `localPath` entries. The same four imageHashes occur in both states and are stored once. Existing `images/mosaic-texture.png` is reused and its original byte fingerprint verified. Detailed source identities, SHA256 checksums, alpha QA and transforms are in `docs/PUN_ASSET_IMPORT.json`; object correspondence is documented in `docs/MOTION_SPEC.md`.

| New file under `public/assets/images/` | Figma imageHash | Original dimensions | Bytes | Role |
|---|---|---|---:|---|
| `pun-bicycle-base.jpg` | `f896e935d71fd96ad289d93b7e8ce7d177767633` | 1792 × 2400 | 1,637,962 | Hidden original JPEG of full bicycle |
| `pun-bicycle-cutout.png` | `062b06beeb916ea58e9db0134f2d6a1ba921958a` | 1792 × 2400 | 2,600,467 | Visible full bicycle PNG, including original wheels |
| `pun-wheels-base.jpg` | `abafb5e224150ff4820d1e37233090f06e1e9689` | 1792 × 2400 | 1,558,592 | Hidden original JPEG of extracted wheel pair |
| `pun-wheels-cutout.png` | `173aa0acd8edfb44bd3dee924ff505e613162e4f` | 1792 × 2400 | 959,426 | Visible PNG containing both wheels in one bitmap |

**Real differences:** the complete composite rotates approximately 34.367141° clockwise about initial center (417.5, 692.5). Both layers retain their dimensions, original fills, opacity and relative stacking; no separate wheel motion or new artwork appears. The bicycle slot remains 735 × 985 and the wheel-pair slot 735 × 984. The wheel pair overlays the complete bicycle in both states; the mosaic remains below them. Frame-local transforms, rotated bounds, frame clipping and all group/node mappings are recorded without inferring extra movement.

**Transparency, cropping and masks:** hidden JPEG/visible PNG fill pairs were retained. Both PNGs contain actual transparent and partially transparent pixels. The whole-bicycle PNG includes 10 faint source-edge alpha samples (1–3); they were preserved rather than cleaned up. Both original transparent canvases and the tiny FILL-mode aspect-ratio cover crops are retained. No explicit masks or Boolean geometry exist in this illustration subtree, so no mask exports were needed. No original trimming, resizing or re-encoding.

**Animation limits:** two image wrappers can transform separately, and both can rotate together to reproduce B. The full bicycle source includes its wheels, while the extracted pair is fused into one bitmap. There is no clean wheel-free frame or separate left/right wheel asset. Clean detached-wheel animation would require an additional agreed source-preparation stage; moving only the existing pair exposes the original wheels behind it.

**Checks:** all four original byte counts and FNV-1a fingerprints match Figma; decoded JPEG/PNG dimensions match the registry; pixel alpha checked. Originals inspected on a checkerboard; temporary affine/cover reconstructions of both compositions visually compared with Figma screenshots. `node scripts/check-assets.mjs` → **Verified: 26 | Pending: 15 | Errors: 0**; no duplicate raster bytes. No missing Pun originals. No Figma edits, layout/animation implementation, dependencies or legacy-file changes.

## Stage 0.2D.3 — Double Meaning original PNG fills (2026-10-24)

Compared A `10:1528` and B `10:2017`. Imported **2 original PNG files, 1,968,067 bytes**; updated both `localPath` entries. Both imageHashes occur in both states and are saved once. Existing mosaic texture is reused and its original byte fingerprint verified. Figma MCP also returned 384 × 256 variants; those were excluded after checking original dimensions, byte lengths and fingerprints.

| New file under `public/assets/images/` | Figma imageHash | Original dimensions | Bytes | Use |
|---|---|---|---:|---|
| `double-meaning-eye.png` | `a9f463489c07be031417200565743725d6a366ac` | 3072 × 2048 | 940,785 | Visible fill 0 in A; hidden in B |
| `double-meaning-eye-couple.png` | `3a4dbff1bde5d50b9dc399bc758f670e1fbee740` | 1536 × 1024 | 1,027,282 | Hidden fill 1 in A; visible in B |

**Actual difference and mechanism:** A has an empty yellow center; B has a couple silhouette there. Both PNGs contain the entire eye. In one rectangle (`10:1558` → `10:2047`), the two IMAGE fills exchange visibility; all other recorded in-frame properties remain unchanged. Position (115, 383), slot 845 × 563, rotation 0°, scale 1 × 1, node/paint opacity 1, FILL settings and paint order 4 are identical. No mask reveal, opacity tween, movement or stacking transition is encoded. Detailed state correspondence and parameter tables are in `docs/MOTION_SPEC.md`; exact metadata and SHA256 checksums are in `docs/DOUBLE_MEANING_ASSET_IMPORT.json`.

**Alpha, cropping and masks:** both PNGs retain full original RGBA data, transparent canvas margins, fully transparent edges and partially transparent pixels. A's alpha range is 0–255; B's is 0–254, so the latter has no fully opaque pixel. Do not normalize this alpha or flatten the sources. The two original 3:2 resolutions share the same logical slot and small FILL cover crop; no resizing or trimming was performed. No explicit masks or Boolean geometry exist in either frame, so no extra mask files were required.

**Checks:** both downloaded originals match Figma byte counts and FNV-1a fingerprints; decoded dimensions match the registry; actual alpha pixels verified. Originals inspected on a checkerboard at the common 845 × 563 slot and compared with Figma screenshots. The recorded 32-node structures differ internally only in the two fill visibility flags. `node scripts/check-assets.mjs` → **Verified: 28 | Pending: 13 | Errors: 0**; no duplicate raster bytes.

**Animation limits:** the existing assets support switching between full-eye states. The figures, pupil and eye are not separately layered; no independent figure movement or existing pupil-mask animation is available. Timing/interpolation and controls remain later design decisions. No missing Double Meaning sources. No Figma edits, layout/animation implementation, dependency installation or legacy-file changes.

## Stage 0.2D.4 — Cultural Reference originals and snowflake geometry (2026-10-24)

Compared A `10:1560` and B `10:2049`. Imported **4 original raster files, 10,459,326 bytes**; updated four `localPath` entries. The five snowflake objects share one JPEG/PNG pair, stored once by imageHash. Existing mosaic is reused and its original byte fingerprint verified. Exact per-instance geometry, fills, alpha QA and SHA256 checksums are in `docs/CULTURAL_REFERENCE_ASSET_IMPORT.json`; illustration structure and animation limits are documented in `docs/MOTION_SPEC.md`.

| New file under `public/assets/images/` | Figma imageHash | Original dimensions | Bytes | Role |
|---|---|---|---:|---|
| `cultural-snowflake-base.jpg` | `a3b7ac7e799505da584c86b7c42f8da6723eedbc` | 1792 × 2400 | 1,752,022 | Hidden JPEG shared by all five snowflakes |
| `cultural-snowflake-cutout.png` | `479c47cbc92ef29bc039dc843d2f7103b80d1391` | 1792 × 2400 | 2,584,249 | Visible transparent PNG shared by all five snowflakes |
| `cultural-iron-throne-base.jpg` | `429921b86495a728937851d97677ae3dcf8c9122` | 1792 × 2400 | 2,262,774 | Hidden original JPEG of throne |
| `cultural-iron-throne-cutout.png` | `76a447de6eae4a64eca6b2865f63ff9cdb9e566c` | 1792 × 2400 | 3,860,281 | Visible transparent PNG of throne |

**Actual differences:** A contains five complete snowflake instances; B contains a single throne image, with no snowflake counterparts in its subtree. All snowflakes have rotation 0°, but different slot positions and dimensions. B's throne has its own origin (301, 263) and slot 610 × 817. No one-to-one mapping, component morph or movement trajectory is specified between these different objects. The 30 common texture/interface nodes have no differences in the recorded in-frame properties. The geometry of every snowflake, including paint order 5–9 and exact transforms, is tabulated in `MOTION_SPEC.md`.

**Fills and fidelity:** each object has a hidden JPEG followed by a visible transparent PNG. Retain both, without displaying the JPEG behind the PNG. Both PNGs have alpha 0–255, real transparent/partial-alpha pixels and fully transparent canvas edges. All original canvases, source resolution and per-slot FILL cover crops were preserved; no trimming, normalization, re-encoding or per-instance source copies. No explicit masks or Boolean clipping objects exist in either frame; PNG alpha supplies the silhouette and interior holes, so no separate mask file was needed.

**Checks:** four original byte counts and FNV-1a fingerprints match Figma; decoded JPEG/PNG dimensions match the registry; actual alpha verified. Originals inspected on a checkerboard. Temporary FILL/position reconstructions of both compositions visually compared with Figma screenshots. `node scripts/check-assets.mjs` → **Verified: 32 | Pending: 9 | Errors: 0**; no duplicate raster bytes.

**Animation feasibility:** five snowflake instances can move independently while sharing one PNG, and the throne is a separate whole bitmap. Snowflake arms and throne swords are fused inside their images. No motion timing, disappearance/entry behavior or morph is defined by the supplied states; those remain decisions for the later motion stage. No missing Cultural Reference sources. No Figma edits, layout/animation implementation, dependencies or legacy-file changes.

## Stage 0.2E.1 — Blind-spot-scene originals and shared texture (2026-10-24)

Imported **3 original raster files, 4,679,815 bytes**; updated three `localPath` entries. Shared texture usage was verified in Blind-spot-scene `10:997`, What-to-do `10:1272` and Footer `10:1016`, with one local JPEG per imageHash. Secondary frames were checked only for the texture, without importing their other assets. Exact metadata, source checksums, line paths and alpha QA are in `docs/BLIND_SPOT_SCENE_ASSET_IMPORT.json`; layer structure is documented in `docs/MOTION_SPEC.md`.

| New file under `public/assets/images/` | Figma imageHash | Original dimensions | Bytes | Role |
|---|---|---|---:|---|
| `au-fg-texture4-8k.jpg` | `364855320f08ade1d04f13556e9f3defb0d52bcb` | 3370 × 2247 | 4,242,403 | Original shared JPEG; “8K” is the layer name, not measured resolution |
| `blind-spot-circle-source.png` | `097adb30ab0ee1356352c1673681a2318d190cad` | 512 × 512 | 222,197 | Hidden original RGB PNG; opaque white exterior |
| `blind-spot-circle-cutout.png` | `a3a4fd64ac220162df428e62b8a3cddf755b1fe7` | 512 × 512 | 215,215 | Visible original RGBA PNG; transparent exterior |

**Shared texture:** all three texture nodes are at (0, 0), 1920 × 1080, paint order 0, node opacity 1 and LIGHTEN blend. Paint opacity is 0.4 in Blind-spot-scene/Footer and 0.2 in What-to-do; IMAGE paint blend is NORMAL. Source mode is CROP with identity imageTransform, not TILE. Retain its measured full-source mapping instead of substituting the early Mosaic or a rendered PNG. Footer frame is 1334px high but its texture rectangle is only 1080px high. No duplicate texture files were saved.

**Central image:** node `10:1012` is at (670, 336), 581 × 581, rotation 0°, opacity 1, paint order 14. It retains a hidden RGB PNG followed by a visible RGBA PNG; both FILL paints have identity transforms and square aspect, with no crop. Original 512px files remain unchanged despite the designed 581px display slot. The visible PNG has real alpha-zero and partial-alpha pixels and transparent edges; its black center is opaque, not a hole. Hidden RGB PNG has no alpha channel. No extra mask/ellipse/Boolean geometry exists.

**Lines and CSS/SVG:** six independent straight VECTOR paths flank the bitmap, with 4px centered white strokes at opacity 0.3 and butt caps. They can use CSS rectangles or measured SVG paths without image exports. The left endpoints finish at x=640; the right segments start at x=1281; the image slot spans x=670–1251, leaving 30px gaps. There are no complete lines crossing beneath the circle. Exact endpoints and layer order are in `MOTION_SPEC.md`.

**Checks:** all three downloaded originals match Figma byte counts and FNV-1a fingerprints; decoded JPEG/PNG dimensions match the registry; actual alpha and opaque center verified. Originals inspected on a checkerboard. A temporary reconstruction of the source texture's LIGHTEN/opacity, six lines and visible circle geometry was visually compared with the Figma screenshot. `node scripts/check-assets.mjs` → **Verified: 35 | Pending: 6 | Errors: 0**; no duplicate raster bytes.

**Animation feasibility:** six lines, six row text nodes and the whole circle bitmap are independent source objects. Ring, center and cracks are fused in the PNG. No scrolling, reveal, moving mask or other animation is specified by the single static frame. No missing assets for this scoped import. No Figma edits, layout/animation implementation, dependency installation or legacy-file changes.

## Stage 0.2E.2 — Footer originals and completed raster registry (2026-10-24)

Imported **6 original raster files, 8,029,333 bytes**, plus one separate source SVG, **5,019 bytes**: **7 files / 8,034,352 bytes total**. All six remaining `localPath` entries are filled. Exact source checksums, image fills, transforms, ancestor clips and primitive geometry are recorded in `docs/FOOTER_ASSET_IMPORT.json`; placement and independent-object constraints are documented in `docs/MOTION_SPEC.md`.

| New file under `public/assets/images/` | Figma imageHash | Original dimensions | Bytes | Actual structure |
|---|---|---|---:|---|
| `footer-eye.png` | `a2527d39f79d61137e7c901c1bd8802fb781330d` | 1774 × 887 | 2,326,187 | `image 21`: one transparent PNG with fused eye and paper |
| `footer-unsaid-strip.png` | `b7079f327ac77217ba31eccfa428d1c9bf81ad54` | 2172 × 724 | 1,888,868 | `image 30`: one transparent PNG with baked-in lettering |
| `footer-between-lines-strip.png` | `bd6b5cacdd1170f72989f6b707a0d3eda9355621` | 2172 × 724 | 1,448,962 | `image 31`: one transparent PNG with baked-in lettering |
| `footer-mouth.png` | `f4f836747639bb4a43af9d32647b44556507ae72` | 2172 × 724 | 2,260,107 | `image 29`: one transparent PNG with fused mouth and paper |
| `footer-school-logo-base.jpg` | `c643e024e3da13f99a21672f8a7f13101d606a1c` | 640 × 640 | 27,132 | Hidden JPEG fill of `telegram-peer-photo` |
| `footer-school-logo-cutout.png` | `f9cf72afab8959879ed22d0f0b83522d3b03cbec` | 640 × 640 | 78,077 | Visible transparent PNG fill: HSE ART AND DESIGN SCHOOL logo |

**Vector file:** `public/assets/illustrations/footer-pixel-mark.svg`, direct SVG_STRING export of `10:2093`, 46 × 68, 62 rectangles, 5,019 bytes. It has no embedded raster. Its design matches Hero's mark, but the original Footer geometry has small subpixel quantization differences; its exact source export is retained.

**Reuse:** Footer has eight image-filled nodes referencing nine unique raster hashes. The shared `au-fg-texture4-8k.jpg`, `hero-eye-accent.png` (`image 22`) and `hero-person-collage.png` (Union) are reused without copies. Figma original byte lengths and fingerprints match all three existing files. The Union is fully outside its ancestor's clip, despite visible flags; the current Footer does not display its portrait. `image 22` has a horizontal reflection and exposure=1, contrast=1, shadows=-1; its original source and filter parameters are preserved without saving a filtered duplicate.

**Fidelity and composition:** all four collage PNGs contain one visible fill; there are no corresponding JPEG layers to invent. The school-logo node retains a hidden JPEG and visible PNG with its custom CROP transform; it is a logo rather than a portrait. Original dimensions, alpha, bytes and source canvases remain unchanged. Rotation, scale, layer order and nested clips are recorded separately. Eye and unsaid strip are clipped by both upper and outer collage frames; the mouth is a root child above the collage and does not inherit those clips. The 181 solid rectangles include 90 non-Union collage tiles, 29 fully clipped Union operands and 62 brand-mark primitives. Collage tiles can be reproduced through CSS; text remains text. No whole-frame image was exported as a project asset.

**Checks:** all six imported raster originals match Figma byte lengths and fingerprints; their decoded sizes, actual transparency and full image decoding pass. A temporary composition/crop reconstruction was visually compared with Figma. All **41** mapped raster files passed full decoding and registry-dimension checks, with **0 duplicate byte contents**; their combined size is **91,025,613 bytes**. `node scripts/check-assets.mjs` → **Verified: 41 | Pending: 0 | Errors: 0**. The additional SVG is outside the raster count. Originals were not optimized or re-encoded.

**Independent elements and remaining work:** eye, mouth, each paper strip, accent, school logo, tiles, brand mark and text groups are separate objects. Components baked inside each PNG cannot animate independently without additional source preparation. No motion behavior is specified by this static frame. Exact runtime reproduction of the accent's Figma color filters remains a later layout-stage validation task; no asset-import blockers remain. No Figma edits, layout/animation implementation, dependency installation or legacy-file changes.

## Stage 0.2F.1 — SVG audit and missing vector import (2026-10-24)

Audited vector geometry in all **19 approved frames** using scoped, read-only Figma MCP queries. Checked **627 shape/Boolean nodes and 86 painted/bordered frames** (713 geometry nodes total). **530 nodes** are CSS/HTML candidates; **182** are covered by **15 existing SVG files**; **one** unique artwork node required import. Counts include clipping operands and clipped/occluded geometry, not just independent visible objects. Text, raster rectangles and unpainted layout containers are excluded. Earlier “25 SVG entries” were export references, not a unique-resource target.

| New file | Figma source | Geometry | Bytes | SHA256 |
|---|---|---|---:|---|
| `public/assets/illustrations/vocab-illustration.svg` | `10:970`, Vocab `10:966` | 679 × 395 / viewBox `0 0 679 395`; one #FED128 compound path spelling «98%» | 4,134 | 6c52c7b82ce8d1e44747e0b5e0159f8d7f38df7f056dda3c3059b0c0ae0ad09c |

The SVG is an unchanged individual SVG_STRING export, with no embedded raster, external resources, font dependency, optimization or frame flattening. The original node is 678.853820801 × 394.455017090; rounded-up export bounds preserve its complete silhouette and transparent counters. Its single compound source node has no independent digit/percent layers. This is existing artwork, not a newly asserted or fact-checked statistic.

Reused six Hero star files, the Hero CTA arrow, two existing pixel-mark exports and six existing derived Idiom masks. Experiment arrows share the Hero geometry and gold paint; Movies uses the same contour with white color and vertical reflection, suitable for reuse as an SVG alpha mask with recorded placement. Small canvas-dependent export rounding does not justify duplicate files. All six Idiom mask checksums and source A/B geometry were rechecked; no new masks were exported.

Simple experiment cross/dots, section dividers, film perforations, pixel geometry, borders and card fills are documented for CSS/HTML. Existing raster imagery remains raster even where its Figma layer name contains “vector”. All original raster files and their registry are unchanged.

**Checks:** all **16 local SVGs** pass XML/viewBox and external-dependency checks and render as nonempty RGBA images. Vocab was visually compared with the Figma screenshot at 679 × 395, including silhouette, holes, color and bounds. Current individual Hero/Footer SVG exports match existing originals. `node scripts/check-assets.mjs` → **Verified: 41 | Pending: 0 | Errors: 0**. Full per-node decisions, layer independence, special transforms, opacity and source checksums are in `VECTOR_ASSET_AUDIT.md` and `VECTOR_ASSET_SOURCE.json`.

**Blockers:** none for vector import. Browser calibration of Figma backdrop blur and the previously recorded Footer raster filters belongs to later layout QA. No Figma edits, layout/animation implementation, dependency installation or legacy changes.

## Stage 0.2G — legacy film video migration (partial)

Imported four of five verified MP4s plus all five original JPEG posters from private `matveyabramov/sp-longread`; exact source/destination Git object SHA values match for each imported file. `case-04.mp4` (Sherlock, 1,075,310 bytes) is pending due to the GitHub 1 MiB content retrieval limit. Detailed mapping, durations for the four retrievable files, output paths and one-command local completion: `docs/VIDEO_ASSETS.md`.

This is a direct copy; no transcoding, filtering or page implementation. Actual playback and visual scene verification remain open until local `ffprobe`/browser QA.
