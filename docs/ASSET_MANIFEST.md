# SUBTALE — initial Figma asset manifest

Status: **candidates located; no assets extracted into project yet**. Source: document-wide Figma layer metadata + selected node design contexts. Assets must be exported as originals / SVG where available and verified locally; do not commit ephemeral Figma MCP asset URLs.

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
