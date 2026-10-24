# SUBTALE — Vector asset audit (Stage 0.2F.1)

Audited **2026-10-24**, read-only Figma MCP, file `H4HI00uGY2UOxpcfHogUat`, page `0:1`. The 19 approved frames from `FIGMA_AUDIT.md` were queried for geometry types and styled containers only. No full-document design context, Figma changes, layout, animation, dependency installation or raster modification.

## Coverage and counting

**713 geometry nodes checked: 627 shape/Boolean nodes + 86 painted/bordered frames.** Of these, **530 are CSS/HTML candidates** (444 shapes + 86 frames), **182 are covered by 15 existing SVG files**, and **1 requires a new SVG**. A single file can cover many primitives or repeated instances. Counts include hidden/clipped geometry and Boolean operands; they are not counts of independently visible assets. Raster-filled rectangles, text, unpainted layout frames and the 19 root frames are excluded from this total. Image-filled Boolean geometry is included because its shape affects raster clipping.

The prior manifest’s **25 SVG entries** were export-metadata references, not a unique-resource count or a complete primitive census. The present audit resolves those references by actual geometry. There are now **16 local SVGs**, including six previously derived Idiom clipping masks. No decorative CSS geometry was newly exported.

Exact per-node geometry, paint arrays, ancestry, clipping, vector paths/matrices, Boolean operations, source IDs and checksums are in [VECTOR_ASSET_SOURCE.json](VECTOR_ASSET_SOURCE.json). Its arrays follow the documented column order. Coordinates are raw Figma API values; for vector placement use complete recorded matrices rather than assuming that group child x/y is frame-relative.

| Frame | Shapes | Styled frames | Existing-SVG shape nodes | New-SVG shape nodes | CSS/HTML nodes |
|---|---:|---:|---:|---:|---:|
| Hero `10:472` | 198 | 7 | 72 | 0 | 133 |
| Experiment-1 `10:718` | 1 | 3 | 1 | 0 | 3 |
| Experiment-2 `10:730` | 4 | 4 | 1 | 0 | 7 |
| Experiment-3 `10:760` | 2 | 3 | 1 | 0 | 4 |
| Emptiness `10:838` | 58 | 2 | 0 | 0 | 60 |
| Elephant `10:917` | 14 | 2 | 0 | 0 | 16 |
| Blind-zones_idiom-1 `10:1431` | 20 | 5 | 20 | 0 | 5 |
| Blind-zones_idiom-2 `10:1596` | 20 | 5 | 20 | 0 | 5 |
| Blind-zones_pun-1 `10:1495` | 0 | 5 | 0 | 0 | 5 |
| Blind-zones_pun-2 `10:1981` | 0 | 5 | 0 | 0 | 5 |
| Blind-zones_dmeaning-1 `10:1528` | 0 | 5 | 0 | 0 | 5 |
| Blind-zones_dmeaning-2 `10:2017` | 0 | 5 | 0 | 0 | 5 |
| Blind-zones_ref-1 `10:1560` | 0 | 5 | 0 | 0 | 5 |
| Blind-zones_ref-2 `10:2049` | 0 | 5 | 0 | 0 | 5 |
| Movies `10:1794` | 53 | 18 | 5 | 0 | 66 |
| Vocab `10:966` | 1 | 1 | 0 | 1 | 1 |
| Blind-spot-scene `10:997` | 6 | 1 | 0 | 0 | 7 |
| What-to-do `10:1272` | 68 | 3 | 0 | 0 | 71 |
| Footer `10:1016` | 182 | 2 | 62 | 0 | 122 |

## New SVG

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:970` (in `10:969`, Vocab `10:966`) | Outlined «98%» illustration | SVG | `public/assets/illustrations/vocab-illustration.svg` | Direct unchanged SVG_STRING; 679×395 / viewBox `0 0 679 395`; source 678.853820801×394.455017090; one filled compound path, #FED128, opacity 1, no stroke/effects/mask |

The vector network has 105 vertices / 105 segments / one region. This is existing outlined artwork, not newly typeset text or an independently verified statistic. Its surrounding 679×395 frame has a hidden white fill and clips children; no white background was added to the SVG. At Vocab frame offset (30,30), the contour fits its rounded-up export viewBox, including the digit/percent counters and transparent remainder. No accidental cropping or external font dependency. Digits and percent sign are fused in a single source node; no independent layers or motion are specified.

## Existing SVG resources and reuse

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1933`, `10:697`, `10:728`, `10:745`, `10:772`, `10:1858`, `10:1874`, `10:1888`, `10:1902`, `10:1916` | CTA icon | exists | `public/assets/illustrations/hero-cta-arrow.svg` | One original 20×20 stroked path; SVG viewBox 29×29 includes 10px stroke. See reflection/color rules below. |
| `10:474` | Hero star | exists | `public/assets/illustrations/star-accent.svg` | Exact current SVG_STRING export match; independent star instances retain their original transforms. |
| `10:478`, `10:479`, `10:480` | Hero star | exists | `public/assets/illustrations/hero-star-62.svg` | Exact current SVG_STRING export match; independent star instances retain their original transforms. |
| `10:481` | Hero star | exists | `public/assets/illustrations/hero-star-43.svg` | Exact current SVG_STRING export match; independent star instances retain their original transforms. |
| `10:482` | Hero star | exists | `public/assets/illustrations/hero-star-78x79.svg` | Exact current SVG_STRING export match; independent star instances retain their original transforms. |
| `10:483` | Hero star | exists | `public/assets/illustrations/hero-star-50.svg` | Exact current SVG_STRING export match; independent star instances retain their original transforms. |
| `10:687` | Hero star | exists | `public/assets/illustrations/hero-star-108.svg` | Exact current SVG_STRING export match; independent star instances retain their original transforms. |
| `10:612` + 62 rectangle children | Pixel brand mark | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | Exact current export match; 46×68 viewBox. Keep existing source-specific quantization; no additional pixel SVGs. |
| `10:2093` + 62 rectangle children | Pixel brand mark | exists | `public/assets/illustrations/footer-pixel-mark.svg` | Exact current export match; 46×68 viewBox. Keep existing source-specific quantization; no additional pixel SVGs. |
| `10:1937` / `10:1629` + Boolean descendants | Ice silhouette cutouts | exists | `public/assets/illustrations/idiom-ice-upper-right-mask.svg` | Existing derived mask, 424×299; source dimensions/operands and SHA256 rechecked. Not a direct raster-filled SVG export. |
| `10:1940` / `10:1632` + Boolean descendants | Ice silhouette cutouts | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | Existing derived mask, 203×379; source dimensions/operands and SHA256 rechecked. Not a direct raster-filled SVG export. |
| `10:1945` / `10:1637` + Boolean descendants | Ice silhouette cutouts | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | Existing derived mask, 210×145; source dimensions/operands and SHA256 rechecked. Not a direct raster-filled SVG export. |
| `10:1950` / `10:1642` + Boolean descendants | Ice silhouette cutouts | exists | `public/assets/illustrations/idiom-ice-left-small-mask.svg` | Existing derived mask, 133×116; source dimensions/operands and SHA256 rechecked. Not a direct raster-filled SVG export. |
| `10:1953` / `10:1645` + Boolean descendants | Ice silhouette cutouts | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | Existing derived mask, 393×273; source dimensions/operands and SHA256 rechecked. Not a direct raster-filled SVG export. |
| `10:1958` / `10:1650` + Boolean descendants | Ice silhouette cutouts | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | Existing derived mask, 457×265; source dimensions/operands and SHA256 rechecked. Not a direct raster-filled SVG export. |

The Hero/experiment arrow path and gold stroke #F3CA27 are identical at source level. Export strings differ only by subpixel rounding (<0.0002px) between canvas positions. Reuse the source rather than duplicating it for those rounding differences. Movies arrows use the same local path with white stroke and relative matrix `[[1,0,22],[0,-1,45]]`: vertically reflected, pointing northeast. Reuse the existing SVG as an alpha mask with white CSS color and the measured reflection; align by the source path origin and expanded stroke bounds, not a guessed center of its rounded 29px export. No new arrow file or approximate CSS arrow is needed. Exact matrices/render bounds for every instance are in the JSON.

The six ice masks already exist and remain unchanged. Their cutouts are rectangular Boolean geometry and can also be represented with measured CSS clipping later; the audit does not create extra mask copies or flatten their raster content. A/B geometry matches the prior import metadata.

## Priority findings

- **Optical blind-spot experiment:** `10:733` and `10:734` are two independent white straight strokes, each 100px long and 10px thick, butt caps. Their measured frame projections form a plus: horizontal (610,540.666015625)→(710,540.666015625), vertical x≈660.0068359375, y=490…590. Preserve this small measured offset. Do not replace them with a font glyph. Dots `10:735` and `10:768` are complete 100×100 #FED128 circles at (1210,490) and (1206,490) respectively; CSS border-radius is exact. The result frame has no cross; retain that state difference. CTA arrows reuse Hero. Overlay frames and borders are CSS/HTML. No experiment SVG is missing.
- **Vocab:** one unique vector export as above; all surrounding copy remains live text. Do not infer further numerical claims or a multi-layer animation.
- **Blind-spot-scene:** `10:1000`, `10:1001`, `10:1002`, `10:1003`, `10:1006`, `10:1009` are six straight paths, not complex illustration artwork. Widths 284,146,146,29,323,343px, centered 4px white strokes at 0.3 opacity; preserve each endpoint and stacking independently through CSS. The central image `10:1012` is already imported PNG, not a vector circle to redraw. See `BLIND_SPOT_SCENE_ASSET_IMPORT.json` and `MOTION_SPEC.md` for existing placement/crop evidence.
- **What-to-do:** 60 axis-aligned 30×30 rectangles form four film-perforation columns (15 each), with no stroke/corner/effect. Keep their actual colors/opacity and ancestor 915×545 clips: each column layout is 698px tall, so some squares are clipped. Eight dividers are straight 730px paths, 4px centered strokes at 0.3 opacity; left four white, right four #0B0D0F. The two card fills, left 1px gray border and yellow heading strip are CSS/HTML; no extra filmstrip SVG.
- **Hero/Footer:** all six unique star SVGs, CTA arrow and two pixel-mark files already exist. Collage pixel squares/unions retain measured fractional coordinates, source order and clips through CSS; they do not need more SVGs. The Hero/Footer brand wordmarks are text next to the pixel mark, not missing outlined logo files. Footer school logo and both eye accents are already raster sources, despite their icon-like use.
- **Other frames:** Elephant’s five 1920px dividers, nine yellow squares and rotated 10px yellow frame are CSS/HTML. Movies has 42 50px film-perforation squares, six straight dividers and five reused reflected arrows. Emptiness has 56 square/operand rectangles and two three-square unions; preserve occlusion and existing raster fills. The eight meaning-trap frames have 32 rectangular cards with BACKGROUND_BLUR radius 34; retain source opacity/border and use CSS backdrop filtering at implementation, with visual calibration then. No card SVG is justified. Pun bicycle, Cultural snowflakes/throne and Double Meaning eye are raster IMAGE fills even when a layer name says “vector”; no vector export is missing.

## Checks and remaining questions

- All **16 SVGs** parse as XML, have positive dimensions/viewBox, render as nonempty RGBA through the bundled libvips renderer, and contain no embedded image, live text, font, script, foreignObject, external href or external paint dependency. All existing files are unchanged.
- The new Vocab SVG was rendered locally, visually compared with the Figma screenshot at 679×395 and checked against the source bounds; the digit/percent counters and edges match. A temporary #012ED7-backed comparison has mean absolute RGB differences [0.181313,0.120031,0.119875] on a 0–255 scale, consistent with renderer antialiasing differences. Temporary screenshots/renders were not stored as project assets.
- Existing Hero/Footer source SVG exports match directly. Six Idiom mask checksums and all 40 inventoried A/B geometry positions/sizes/rotations match prior metadata; Boolean operations remain SUBTRACT.
- Raster regression check: `node scripts/check-assets.mjs` → **41 verified / 0 pending / 0 errors**; no raster or registry change.
- **No vector-import blockers.** Exact browser rendering of backdrop blur and Footer raster color filters remains later layout QA. No interaction, animation, alternative viewport or statistical/source-attribution decision was made by this audit.

## Exhaustive node decision table

The table below enumerates all 713 counted geometry nodes. Compound-asset child rows point to the containing existing SVG so they are not counted as new files. Unpainted layout containers are recorded only in the JSON ancestry; they have no standalone graphic resource. Text and raster nodes are outside this vector table.

### Hero — `10:472`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1933` | CTA arrow | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:1932 |
| `10:474` | Star accent | exists | `public/assets/illustrations/star-accent.svg` | STAR; 79.000000000×79.000000000; parent 10:472 |
| `10:476` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 189.477264404×311.159912109; parent 10:475 |
| `10:478` | Star accent | exists | `public/assets/illustrations/hero-star-62.svg` | STAR; 62.000000000×62.000000000; parent 10:475 |
| `10:479` | Star accent | exists | `public/assets/illustrations/hero-star-62.svg` | STAR; 62.000000000×62.000000000; parent 10:475 |
| `10:480` | Star accent | exists | `public/assets/illustrations/hero-star-62.svg` | STAR; 62.000000000×62.000000000; parent 10:475 |
| `10:481` | Star accent | exists | `public/assets/illustrations/hero-star-43.svg` | STAR; 43.000000000×43.000000000; parent 10:475 |
| `10:482` | Star accent | exists | `public/assets/illustrations/hero-star-78x79.svg` | STAR; 78.000000000×79.000000000; parent 10:475 |
| `10:483` | Star accent | exists | `public/assets/illustrations/hero-star-50.svg` | STAR; 50.000000000×50.000000000; parent 10:475 |
| `10:486` | Pixel Union / raster silhouette geometry | CSS/HTML | — | BOOLEAN_OPERATION; 771.428710938×462.857421875; parent 10:485 |
| `10:487` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:488` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:489` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:490` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:491` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:492` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:493` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:494` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:495` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:496` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:497` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:498` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:499` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:500` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:501` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:502` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:503` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:504` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:505` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:506` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:507` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:508` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:509` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:510` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:511` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:512` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:513` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:514` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:515` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:516` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:517` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:518` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:519` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:520` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:521` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:522` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:523` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:486 |
| `10:524` | Pixel Union / raster silhouette geometry | CSS/HTML | — | BOOLEAN_OPERATION; 462.857421875×231.427734375; parent 10:484 |
| `10:525` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:526` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:527` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:528` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:529` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:530` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:531` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:532` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:533` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:534` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:535` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:536` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:537` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:538` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:539` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:524 |
| `10:540` | Pixel Union / raster silhouette geometry | CSS/HTML | — | BOOLEAN_OPERATION; 617.142578125×385.712890625; parent 10:484; fully outside ancestor clip |
| `10:541` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:542` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:543` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:544` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:545` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:546` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:547` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:548` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:549` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:550` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:551` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:552` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:553` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:554` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:555` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:556` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:557` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:558` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:559` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:560` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:561` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:562` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:563` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:564` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:565` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:566` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:567` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:568` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:569` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:540 |
| `10:571` | Pixel Union / raster silhouette geometry | CSS/HTML | — | BOOLEAN_OPERATION; 771.428710938×462.857421875; parent 10:570 |
| `10:572` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:573` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:574` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:575` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:576` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:577` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:578` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:579` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:580` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:581` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:582` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:583` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:584` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:585` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:586` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:587` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:588` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:589` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:590` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:591` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:592` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:593` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:594` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:595` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:596` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:597` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:598` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:599` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:600` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:601` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:602` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:603` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:604` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:605` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:606` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:607` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:608` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:609` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:571 |
| `10:613` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 7.546543121×7.546543121; parent 10:612 |
| `10:614` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:615` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 6.288803577×6.288803577; parent 10:612 |
| `10:616` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 6.288803577×6.288803577; parent 10:612 |
| `10:617` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 6.288803577×6.288803577; parent 10:612 |
| `10:618` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:619` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:620` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:621` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:622` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:623` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:624` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:625` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:626` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:627` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:628` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:629` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:630` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:631` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:632` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:633` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:634` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:635` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:636` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:637` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:638` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:639` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:640` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:641` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:642` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:643` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:644` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:645` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:646` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:647` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:648` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:649` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:650` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:651` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:652` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:653` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:654` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 27.670658112×5.031028748; parent 10:612 |
| `10:655` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 10.062057495×5.031028748; parent 10:612 |
| `10:656` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:657` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:658` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:659` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:660` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:661` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:662` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:663` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:664` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:665` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:666` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:667` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:668` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:612 |
| `10:669` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:612 |
| `10:670` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:612 |
| `10:671` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:612 |
| `10:672` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:612 |
| `10:673` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:612 |
| `10:674` | Pixel brand-mark primitive | exists | `public/assets/illustrations/subtale-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:612 |
| `10:683` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 32.000000000×3.000000000; parent 10:682 |
| `10:684` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 32.000000000×3.000000000; parent 10:682 |
| `10:687` | Star accent | exists | `public/assets/illustrations/hero-star-108.svg` | STAR; 108.000000000×108.000000000; parent 10:472 |
| `10:697` | CTA arrow | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:696 |
| `10:1930` | HTML container fill / border | CSS/HTML | — | 680.000000000×86.000000000; rotation 0.000000000°; clip false |
| `10:1932` | HTML container fill / border | CSS/HTML | — | 75.000000000×76.000000000; rotation 0.000000000°; clip true |
| `10:678` | HTML container fill / border | CSS/HTML | — | 1580.000000000×136.000000000; rotation 0.000000000°; clip false |
| `10:688` | HTML container fill / border | CSS/HTML | — | 956.000000000×196.000000000; rotation -0.000000000°; clip false |
| `10:689` | HTML container fill / border | CSS/HTML | — | 936.000000000×176.000000000; rotation 0.000000000°; clip false |
| `10:694` | HTML container fill / border | CSS/HTML | — | 260.000000000×77.000000000; rotation 0.000000000°; clip false |
| `10:696` | HTML container fill / border | CSS/HTML | — | 67.000000000×67.000000000; rotation 0.000000000°; clip true |

### Experiment-1 — `10:718`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:728` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:727 |
| `10:721` | HTML container fill / border | CSS/HTML | — | 1127.000000000×120.000000000; rotation 0.000000000°; clip false |
| `10:725` | HTML container fill / border | CSS/HTML | — | 442.000000000×86.000000000; rotation 0.000000000°; clip false |
| `10:727` | HTML container fill / border | CSS/HTML | — | 75.000000000×76.000000000; rotation 0.000000000°; clip true |

### Experiment-2 — `10:730`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:733` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 100.000000000×0.000000000; parent 10:732 |
| `10:734` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 100.000000000×0.000000000; parent 10:732 |
| `10:735` | Experiment dot | CSS/HTML | — | ELLIPSE; 100.000000000×100.000000000; parent 10:730 |
| `10:745` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:744 |
| `10:737` | HTML container fill / border | CSS/HTML | — | 785.000000000×320.000000000; rotation -0.000000000°; clip false |
| `10:738` | HTML container fill / border | CSS/HTML | — | 765.000000000×300.000000000; rotation 0.000000000°; clip false |
| `10:742` | HTML container fill / border | CSS/HTML | — | 442.000000000×86.000000000; rotation 0.000000000°; clip false |
| `10:744` | HTML container fill / border | CSS/HTML | — | 75.000000000×76.000000000; rotation 0.000000000°; clip true |

### Experiment-3 — `10:760`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:768` | Experiment dot | CSS/HTML | — | ELLIPSE; 100.000000000×100.000000000; parent 10:760 |
| `10:772` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:771 |
| `10:762` | HTML container fill / border | CSS/HTML | — | 546.000000000×120.000000000; rotation 0.000000000°; clip false |
| `10:769` | HTML container fill / border | CSS/HTML | — | 442.000000000×86.000000000; rotation 0.000000000°; clip false |
| `10:771` | HTML container fill / border | CSS/HTML | — | 75.000000000×76.000000000; rotation 0.000000000°; clip true |

### Emptiness — `10:838`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:847` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:848` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:849` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:850` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:851` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:852` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:853` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:854` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:855` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:856` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:857` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:858` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:859` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:860` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:861` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:862` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:863` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:865` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:866` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:867` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:868` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:869` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:870` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:871` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:872` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:873` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:874` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:875` | Pixel Union / raster silhouette geometry | CSS/HTML | — | BOOLEAN_OPERATION; 231.000000000×77.000000000; parent 10:846; portrait fill currently occluded |
| `10:876` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:875 |
| `10:877` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:875 |
| `10:878` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:875 |
| `10:879` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:880` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:881` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:882` | Pixel Union / raster silhouette geometry | CSS/HTML | — | BOOLEAN_OPERATION; 231.000000000×77.000000000; parent 10:846 |
| `10:883` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:882 |
| `10:884` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:882 |
| `10:885` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:882 |
| `10:886` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:887` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:888` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:889` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:890` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:891` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:892` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:893` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:894` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:895` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:896` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:897` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:898` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:900` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:901` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:902` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:903` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:904` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:905` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:906` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.000000000×77.000000000; parent 10:846 |
| `10:841` | HTML container fill / border | CSS/HTML | — | 278.000000000×120.000000000; rotation 0.000000000°; clip false |
| `10:844` | HTML container fill / border | CSS/HTML | — | 1129.000000000×1020.000000000; rotation 0.000000000°; clip false |

### Elephant — `10:917`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:924` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:923 |
| `10:929` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:928 |
| `10:934` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:933 |
| `10:939` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:938 |
| `10:943` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:922 |
| `10:948` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:949` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:950` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:951` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:952` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:953` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:954` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:955` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:956` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:917 |
| `10:919` | HTML container fill / border | CSS/HTML | — | 749.256530762×666.566467285; rotation 1.999999907°; clip false |
| `10:945` | HTML container fill / border | CSS/HTML | — | 496.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_idiom-1 — `10:1431`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1937` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-upper-right-mask.svg` | BOOLEAN_OPERATION; 424.000000000×299.000000000; parent 10:1431 |
| `10:1939` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-upper-right-mask.svg` | RECTANGLE; 84.000000000×48.000000000; parent 10:1937 |
| `10:1940` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | BOOLEAN_OPERATION; 203.000000000×379.000000000; parent 10:1431 |
| `10:1941` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | BOOLEAN_OPERATION; 203.000000000×379.000000000; parent 10:1940 |
| `10:1943` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | RECTANGLE; 91.000000000×39.000000000; parent 10:1941 |
| `10:1944` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | RECTANGLE; 94.000000000×58.000000000; parent 10:1940 |
| `10:1945` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | BOOLEAN_OPERATION; 210.000000000×145.000000000; parent 10:1431 |
| `10:1946` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | BOOLEAN_OPERATION; 210.000000000×145.000000000; parent 10:1945 |
| `10:1948` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | RECTANGLE; 38.000000000×32.000000000; parent 10:1946 |
| `10:1949` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | RECTANGLE; 22.000000000×17.000000000; parent 10:1945 |
| `10:1950` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-left-small-mask.svg` | BOOLEAN_OPERATION; 133.000000000×116.000000000; parent 10:1431 |
| `10:1952` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-left-small-mask.svg` | RECTANGLE; 36.000000000×31.000000000; parent 10:1950 |
| `10:1953` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | BOOLEAN_OPERATION; 393.000000000×273.000000000; parent 10:1431 |
| `10:1955` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | RECTANGLE; 30.000000000×25.000000000; parent 10:1953 |
| `10:1956` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | RECTANGLE; 95.000000000×79.000000000; parent 10:1953 |
| `10:1957` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | RECTANGLE; 65.000000000×45.000000000; parent 10:1953 |
| `10:1958` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | BOOLEAN_OPERATION; 457.000000000×265.000000000; parent 10:1431 |
| `10:1959` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | BOOLEAN_OPERATION; 457.000000000×265.000000000; parent 10:1958 |
| `10:1961` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | RECTANGLE; 183.000000000×81.000000000; parent 10:1959 |
| `10:1962` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | RECTANGLE; 75.000000000×103.000000000; parent 10:1958 |
| `10:1434` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1440` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1446` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1452` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1459` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_idiom-2 — `10:1596`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1629` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-upper-right-mask.svg` | BOOLEAN_OPERATION; 424.000000000×299.000000000; parent 10:1596 |
| `10:1631` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-upper-right-mask.svg` | RECTANGLE; 84.000000000×48.000000000; parent 10:1629 |
| `10:1632` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | BOOLEAN_OPERATION; 203.000000000×379.000000000; parent 10:1596 |
| `10:1633` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | BOOLEAN_OPERATION; 203.000000000×379.000000000; parent 10:1632 |
| `10:1635` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | RECTANGLE; 91.000000000×39.000000000; parent 10:1633 |
| `10:1636` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-center-mask.svg` | RECTANGLE; 94.000000000×58.000000000; parent 10:1632 |
| `10:1637` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | BOOLEAN_OPERATION; 210.000000000×145.000000000; parent 10:1596 |
| `10:1638` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | BOOLEAN_OPERATION; 210.000000000×145.000000000; parent 10:1637 |
| `10:1640` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | RECTANGLE; 38.000000000×32.000000000; parent 10:1638 |
| `10:1641` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-right-small-mask.svg` | RECTANGLE; 22.000000000×17.000000000; parent 10:1637 |
| `10:1642` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-left-small-mask.svg` | BOOLEAN_OPERATION; 133.000000000×116.000000000; parent 10:1596 |
| `10:1644` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-left-small-mask.svg` | RECTANGLE; 36.000000000×31.000000000; parent 10:1642 |
| `10:1645` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | BOOLEAN_OPERATION; 393.000000000×273.000000000; parent 10:1596 |
| `10:1647` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | RECTANGLE; 30.000000000×25.000000000; parent 10:1645 |
| `10:1648` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | RECTANGLE; 95.000000000×79.000000000; parent 10:1645 |
| `10:1649` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-left-mask.svg` | RECTANGLE; 65.000000000×45.000000000; parent 10:1645 |
| `10:1650` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | BOOLEAN_OPERATION; 457.000000000×265.000000000; parent 10:1596 |
| `10:1651` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | BOOLEAN_OPERATION; 457.000000000×265.000000000; parent 10:1650 |
| `10:1653` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | RECTANGLE; 183.000000000×81.000000000; parent 10:1651 |
| `10:1654` | Existing ice clipping geometry / Boolean operand | exists | `public/assets/illustrations/idiom-ice-lower-right-mask.svg` | RECTANGLE; 75.000000000×103.000000000; parent 10:1650 |
| `10:1601` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1607` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1613` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1619` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1626` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_pun-1 — `10:1495`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| — | No non-raster shape nodes | — | — | Styled frames below remain HTML/CSS; imagery already exists in raster registry. |
| `10:1498` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1504` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1510` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1516` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1523` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_pun-2 — `10:1981`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| — | No non-raster shape nodes | — | — | Styled frames below remain HTML/CSS; imagery already exists in raster registry. |
| `10:1984` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1990` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1996` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2002` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2009` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_dmeaning-1 — `10:1528`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| — | No non-raster shape nodes | — | — | Styled frames below remain HTML/CSS; imagery already exists in raster registry. |
| `10:1531` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1537` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1543` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1549` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1556` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_dmeaning-2 — `10:2017`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| — | No non-raster shape nodes | — | — | Styled frames below remain HTML/CSS; imagery already exists in raster registry. |
| `10:2020` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2026` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2032` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2038` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2045` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_ref-1 — `10:1560`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| — | No non-raster shape nodes | — | — | Styled frames below remain HTML/CSS; imagery already exists in raster registry. |
| `10:1563` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1569` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1575` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1581` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:1588` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-zones_ref-2 — `10:2049`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| — | No non-raster shape nodes | — | — | Styled frames below remain HTML/CSS; imagery already exists in raster registry. |
| `10:2052` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2058` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2064` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2070` | HTML container fill / border | CSS/HTML | — | 680.000000000×232.500000000; rotation 0.000000000°; clip false; backdrop blur 34 |
| `10:2077` | HTML container fill / border | CSS/HTML | — | 596.000000000×120.000000000; rotation 0.000000000°; clip false |

### Movies — `10:1794`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1797` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1798` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1799` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1800` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1801` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1802` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1803` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1804` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1805` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1806` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1807` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1808` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1809` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1810` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1811` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1812` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1813` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1814` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1815` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1816` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1817` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1796 |
| `10:1819` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1820` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1821` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1822` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1823` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1824` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1825` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1826` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1827` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1828` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1829` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1830` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1831` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1832` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1833` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1834` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1835` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1836` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1837` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1838` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1839` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 50.000000000×50.000000000; parent 10:1818 |
| `10:1842` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:1841 |
| `10:1858` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:1857; white + vertical reflection |
| `10:1860` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:1859 |
| `10:1874` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:1873; white + vertical reflection |
| `10:1876` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:1875 |
| `10:1888` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:1887; white + vertical reflection |
| `10:1890` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:1889 |
| `10:1902` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:1901; white + vertical reflection |
| `10:1904` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:1903 |
| `10:1916` | CTA arrow; source geometry reused | exists | `public/assets/illustrations/hero-cta-arrow.svg` | VECTOR; 20.000000000×20.000000000; parent 10:1915; white + vertical reflection |
| `10:1917` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 1920.000000000×0.000000000; parent 10:1840 |
| `10:1847` | HTML container fill / border | CSS/HTML | — | 44.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1849` | HTML container fill / border | CSS/HTML | — | 55.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1851` | HTML container fill / border | CSS/HTML | — | 77.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1857` | HTML container fill / border | CSS/HTML | — | 67.000000000×67.000000000; rotation 0.000000000°; clip true |
| `10:1865` | HTML container fill / border | CSS/HTML | — | 44.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1867` | HTML container fill / border | CSS/HTML | — | 156.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1869` | HTML container fill / border | CSS/HTML | — | 111.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1873` | HTML container fill / border | CSS/HTML | — | 67.000000000×67.000000000; rotation 0.000000000°; clip true |
| `10:1881` | HTML container fill / border | CSS/HTML | — | 44.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1883` | HTML container fill / border | CSS/HTML | — | 178.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1887` | HTML container fill / border | CSS/HTML | — | 67.000000000×67.000000000; rotation 0.000000000°; clip true |
| `10:1895` | HTML container fill / border | CSS/HTML | — | 44.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1897` | HTML container fill / border | CSS/HTML | — | 189.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1901` | HTML container fill / border | CSS/HTML | — | 67.000000000×67.000000000; rotation 0.000000000°; clip true |
| `10:1909` | HTML container fill / border | CSS/HTML | — | 44.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1911` | HTML container fill / border | CSS/HTML | — | 223.000000000×44.000000000; rotation 0.000000000°; clip false |
| `10:1915` | HTML container fill / border | CSS/HTML | — | 67.000000000×67.000000000; rotation 0.000000000°; clip true |
| `10:1919` | HTML container fill / border | CSS/HTML | — | 679.000000000×120.000000000; rotation 0.000000000°; clip false |

### Vocab — `10:966`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:970` | Outlined 98% illustration | SVG | `public/assets/illustrations/vocab-illustration.svg` | VECTOR; 678.853820801×394.455017090; parent 10:969 |
| `10:974` | HTML container fill / border | CSS/HTML | — | 932.000000000×120.000000000; rotation 0.000000000°; clip false |

### Blind-spot-scene — `10:997`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1000` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 284.000000000×0.000000000; parent 10:997 |
| `10:1001` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 146.000000000×0.000000000; parent 10:997 |
| `10:1002` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 146.000000000×0.000000000; parent 10:997 |
| `10:1003` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 29.000000000×0.000000000; parent 10:997 |
| `10:1006` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 323.000000000×0.000000000; parent 10:997 |
| `10:1009` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 343.000000000×0.000000000; parent 10:997 |
| `10:1014` | HTML container fill / border | CSS/HTML | — | 734.000000000×120.000000000; rotation 0.000000000°; clip false |

### What-to-do — `10:1272`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1280` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1281` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1282` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1283` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1284` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1285` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1286` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1287` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1288` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1289` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1290` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1291` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1292` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1293` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1294` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1279 |
| `10:1296` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1297` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1298` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1299` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1300` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1301` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1302` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1303` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1304` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1305` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1306` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1307` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1308` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1309` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1310` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1295 |
| `10:1312` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1311 |
| `10:1316` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1311 |
| `10:1320` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1311 |
| `10:1324` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1311 |
| `10:1328` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1329` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1330` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1331` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1332` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1333` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1334` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1335` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1336` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1337` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1338` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1339` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1340` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1341` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1342` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1327 |
| `10:1344` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1345` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1346` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1347` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1348` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1349` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1350` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1351` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1352` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1353` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1354` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1355` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1356` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1357` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1358` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 30.000000000×30.000000000; parent 10:1343 |
| `10:1360` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1359 |
| `10:1364` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1359 |
| `10:1368` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1359 |
| `10:1373` | Straight rule / experiment cross stroke | CSS/HTML | — | VECTOR; 730.000000000×0.000000000; parent 10:1359 |
| `10:1274` | HTML container fill / border | CSS/HTML | — | 986.000000000×136.000000000; rotation 0.000000000°; clip false |
| `10:1278` | HTML container fill / border | CSS/HTML | — | 915.000000000×545.000000000; rotation 0.000000000°; clip true |
| `10:1326` | HTML container fill / border | CSS/HTML | — | 915.000000000×545.000000000; rotation 0.000000000°; clip true |

### Footer — `10:1016`

| Figma node ID | Purpose | Decision | Local path | Comment |
|---|---|---|---|---|
| `10:1021` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1022` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1023` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1024` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1025` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1026` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1027` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1028` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1029` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1030` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1031` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1032` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1033` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1034` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1035` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1036` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1037` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1038` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1039` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1040` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1041` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1042` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1043` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1044` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1045` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1046` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1047` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1048` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1049` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1050` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1051` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1052` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1053` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1054` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1055` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1056` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1057` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1020 |
| `10:1058` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1059` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1060` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1061` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1062` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1063` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1064` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1065` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1066` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1067` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1068` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1069` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1070` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1071` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1072` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1019 |
| `10:1073` | Pixel Union / raster silhouette geometry | CSS/HTML | — | BOOLEAN_OPERATION; 617.142578125×385.712890625; parent 10:1019; fully outside ancestor clip |
| `10:1074` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1075` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1076` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1077` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1078` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1079` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1080` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1081` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1082` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1083` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1084` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1085` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1086` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1087` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1088` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1089` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1090` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1091` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1092` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1093` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1094` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1095` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1096` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1097` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1098` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1099` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1100` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1101` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1102` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1073 |
| `10:1104` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1105` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1106` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1107` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1108` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1109` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1110` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1111` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1112` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1113` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1114` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1115` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1116` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1117` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1118` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1119` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1120` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1121` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1122` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1123` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1124` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1125` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1126` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1127` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1128` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1129` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1130` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1131` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1132` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1133` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1134` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1135` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1136` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1137` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1138` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1139` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1140` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:1141` | Pixel / film-perforation rectangle or Boolean operand | CSS/HTML | — | RECTANGLE; 77.142860413×77.142860413; parent 10:1103 |
| `10:2094` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 7.546543121×7.546543121; parent 10:2093 |
| `10:2095` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2096` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 6.288803577×6.288803577; parent 10:2093 |
| `10:2097` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 6.288803577×6.288803577; parent 10:2093 |
| `10:2098` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 6.288803577×6.288803577; parent 10:2093 |
| `10:2099` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2100` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2101` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2102` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2103` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2104` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2105` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2106` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2107` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2108` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2109` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2110` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2111` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2112` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2113` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2114` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2115` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2116` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2117` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2118` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2119` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2120` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2121` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2122` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2123` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2124` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2125` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2126` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2127` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2128` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2129` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2130` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2131` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2132` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2133` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2134` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2135` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 27.670658112×5.031028748; parent 10:2093 |
| `10:2136` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 10.062057495×5.031028748; parent 10:2093 |
| `10:2137` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2138` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2139` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2140` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2141` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2142` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2143` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2144` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2145` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2146` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2147` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2148` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2149` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 5.031028748×5.031028748; parent 10:2093 |
| `10:2150` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:2093 |
| `10:2151` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:2093 |
| `10:2152` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:2093 |
| `10:2153` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:2093 |
| `10:2154` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:2093 |
| `10:2155` | Pixel brand-mark primitive | exists | `public/assets/illustrations/footer-pixel-mark.svg` | RECTANGLE; 2.515514374×2.515514374; parent 10:2093 |
| `10:1147` | HTML container fill / border | CSS/HTML | — | 832.000000000×232.000000000; rotation 0.000000000°; clip false |
| `10:1149` | HTML container fill / border | CSS/HTML | — | 1920.000000000×254.000000000; rotation 0.000000000°; clip true |
