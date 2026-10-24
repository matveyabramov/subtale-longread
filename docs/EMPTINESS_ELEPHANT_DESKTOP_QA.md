# SUBTALE — Stage 1B.3 Emptiness + Elephant Desktop 1920

Completed 2026-10-24. Static implementation of [Emptiness 10:838](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-838), 1920×1080, and [Elephant 10:917](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-917), 1920×2187. Stage 0.3 remains Approved. No animation, new interaction, responsive design, dependency, editorial change, asset change or Figma write. Blind Zones Explorer and the other later sections were not implemented.

## Source and component boundaries

Started from a clean working tree with the completed `1ef5ddb`, `ae44661` and `06596af` commits present. Figma MCP design context and screenshots were requested only for the two target frames. A compact read-only measurement retained 110 nodes in [EMPTINESS_ELEPHANT_LAYOUT_SOURCE.json](EMPTINESS_ELEPHANT_LAYOUT_SOURCE.json); asset paints, source crops and full matrices come from the existing EMPTINESS_ASSET_IMPORT and ELEPHANT_ASSET_IMPORT registers. No repeated full-project audit.

The existing `EmptinessSection` and `ElephantSection` now own their semantic copy and artwork, each with a CSS Module and a small section-specific geometry file. App moves them outside the diagnostic foundation wrapper, immediately after Experiment. The remaining six placeholders keep that wrapper. Existing section IDs and reading order are retained. Global styles, tokens, font faces and all other section source files are unchanged.

### Emptiness

- Canvas: 1920×1080, blue background. Mosaic tile 354.9999899864197×287.9345006942749, opacity 0.4; texture is painted first.
- Heading box: x30/y30/454×80. Yellow banner: x30/y125/278×120, text inset 20px. Display type is TT Bluescreens Trial ExtraBold 100px, line-height 80px, tracking 0. Copy: x30/y930/572×120, IBM Plex Mono Medium 25px/30px, tracking −1px, four source-matching lines.
- Yellow frame: x761/y30/1129×1020, 10px inside border and 30px inner padding. Labels: x801/y70 and x801/y954, 1049×56 each, TT ExtraBold 70px/56px, latter right-aligned. Glyphs are calibrated +1px inside the unchanged source text boxes.
- Artwork `10:846`: x801/y300/1049×480. All **54 direct children** retain source paint order: 50 independent yellow 77×77 squares, two composite 231×77 Union rectangles, and two character slots. The six Union operands are represented by their two unions, not six extra painted squares. The coincident `10:898` / `10:901` squares remain on opposite sides of the female image in paint order.
- Character `10:864`: group-local x0/y0/508×480. Character `10:899`: x721/y17/328×463. Both use the registry's optimized WebP and the complete normalized source CROP matrix; original transparent margins are retained. Crop formula is image width = slot width / sx, image left = −tx × slot width / sx, likewise for height/top. Actual image geometry is recorded in [asset-slot-check.json](../artifacts/emptiness-1920/asset-slot-check.json); maximum observed image-box delta is 0.015594 CSS px.
- Source-only portrait `10:875` is fully covered by later opaque squares `10:881`, `10:880`, `10:904`. Its yellow Union base remains in the correct layer position; its occluded raster is not loaded or revealed. Hidden JPEG fills are not rendered. All source files remain intact.

### Elephant

- Canvas: **1920×2187**, normal page flow, no internal vertical scroller. Background texture retains its **2512px** source height, tile scale 0.8942065238952637 and opacity 0.4; the outer canvas deliberately clips its final 325px.
- Art frame `10:919`: 749.2565307617188×666.5664672851562, with the exact recorded transform, including x30/y383.75390625. Illustration `10:920`: 864.4822387695312×482.4964904785156, with its separate inverse transform and FILL behavior. The optimized `elephant-cutout.webp` retains alpha and the full original canvas. Hidden JPEG is not rendered. The two matrices are applied independently with origin 0/0; no rounded angle replacement or merged transform.
- The frame does **not** clip its child. A local SVG rectangle, inset 5px with a 10px yellow stroke, paints the measured inside border without CSS border's whole-pixel paint snapping. This is a frame primitive, not a replacement illustration or changed SVG asset.
- Heading/banner: x30/y30/216×80 and x30/y125/496×120. Introduction: x975/y559/267×30. English phrase: x975/y619/883×400, TT ExtraBold 250px/200px, two exact lines, yellow “elephant”; glyphs are calibrated +1px inside the unchanged text box.
- Four always-visible levels: Words → Construction → Context → Cultural knowledge. Heading tops 1170, 1410, 1650, 1890px; copy tops 1270, 1510, 1750, 1990px. X coordinates are **19.5, 266.5, 503.5, 739.5px**. Headings are TT ExtraBold 100px/80px, tracking 0; body is IBM Medium 25px/30px, tracking −1px, two lines per level. No accordion, tabs, sequential reveal or progress logic.
- Five independent 1920px divider primitives at x−0.5, centerline y1130 / 1370 / 1610 / 1850 / 2090. White 4px centered stroke, opacity 0.3. They are not inferred grid borders.
- All nine yellow squares keep their exact 77.14286041259766px dimensions and fractional coordinates. Rightmost squares extend to x1922.4289932250977 and are intentionally clipped at the 1920px canvas edge.

## Production visual comparisons

Used the Hero/Experiment method: full-resolution Figma reference, production build served with Vite preview, Chrome DPR 1, fonts ready and images decoded before capture. Emptiness viewport/capture is 1920×1080; Elephant viewport/capture is **1920×2187** in one PNG. No source or browser image was scaled for numeric comparison. Three complete production passes were captured for each section; the final Elephant render was inspected after its border correction.

MAE means mean absolute RGB-channel delta on a 0–255 scale. The percentage counts pixels with any channel delta >12. These full-frame numbers are dominated by background and are **not a pixel-perfect score**.

| Section | Pass 1 MAE / >12 pixels | Pass 2 MAE / >12 pixels | Pass 3 MAE / >12 pixels |
|---|---:|---:|---:|
| Emptiness | 0.781 / 0.867% | 0.663 / 0.761% | 0.663 / 0.761% |
| Elephant | 1.143 / 1.613% | 1.038 / 1.553% | 1.017 / 1.525% |

Pass 1 verified copy, wrapping, composition, crops, stacking and boundaries. Pass 2 corrected both 70px label baselines and the 250px phrase baseline by +1px, preserving their text boxes. Pass 3 replaced the snapped CSS frame border with its exact inside-stroke SVG primitive. Emptiness was recaptured unchanged alongside the final Elephant pass.

**104 measured boxes** pass the 1/64 CSS px comparison: Emptiness 64 boxes with maximum delta **0**; Elephant 40 boxes with maximum delta **0.013499px**. Rotated art/image bounds are compared against all four source-matrix-transformed corners, not unrotated width/height. The six Boolean operands are not independently painted DOM elements and are excluded from the 64-node Emptiness comparison. Geometry is recorded in each section's `geometry-pass-3.json`.

Remaining measurable differences:

- Emptiness artwork region MAE **0.809**, 0.903% pixels above threshold; male slot **1.289**, female **0.514**. Remaining resampling/alpha-edge differences use the existing delivery files and original crops; assets were not re-encoded to hide them.
- Emptiness heading/banner MAE **0.842 / 0.336**, copy **2.425**, labels **0.921 / 1.138**. Residual text edge rasterization remains; whole-pixel alignment search gives best offset 0/0 after calibration.
- Elephant art/frame region MAE **1.702**, 3.789% pixels above threshold, reduced from **1.849** before the SVG border correction. Optimized bitmap resampling, silhouette edges and rotated-stroke antialiasing still differ from Figma.
- Elephant phrase region MAE **2.830**, four level regions **1.061 / 1.580 / 1.415 / 2.006**. Text remains exact and correctly wrapped; best whole-pixel offset is 0/0. No family exception or synthetic font stretch was introduced.
- Background sample MAE **0.491** / **0.479**, maximum channel delta **8** / **6** for Emptiness / Elephant. Source tile scale/opacity are preserved; texture sampling/compositing differs slightly.
- Elephant decorative-square sample MAE **0.664**; first divider sample **0.440**. Fractional edge coverage differs from Figma; source coordinates, colors, stroke width and opacity remain unchanged.

No missing visible artwork, exposed source-only fill, wrong line break, displaced content block or unintended clipping remains at the target dimensions. The result is not claimed to be pixel-identical to Figma.

## Regression, assets and technical checks

- All three passes compare new 1920×1080 Hero / Instructions / Target / Result captures with their accepted production baselines. **All four screens are pixel-identical in every pass:** MAE 0, max delta 0, 100% exact pixels. [Final regression measurements](../artifacts/emptiness-1920/regression-pass-3.json).
- Story boundaries: Hero y0–1080; Experiment y1080–4320; Emptiness y4320–5400; Elephant y5400–7587. No gaps/overlap between implemented sections. The untouched Explorer placeholder begins at y7617 inside its existing 30px diagnostic wrapper. All ten narrative sections remain in the original order.
- All 13 reading IDs (ten sections plus three Experiment anchors) are unique and present. Existing Instructions Skip and Result CTA reach Emptiness at scrollY4320. No scroll interception was added.
- TypeScript typecheck and production build passed: **43 modules**, JS **260.48 kB / 77.83 kB gzip**, CSS **17.80 kB / 4.12 kB gzip**, excluding public media. No new dependency or package manifest change.
- `node scripts/check-assets.mjs`: **41 verified / 0 pending / 0 errors**, five poster originals and 35 raster delivery files.
- All **17 source text contents** compare exactly. Chrome CDP actual rendered-font inspection passes for every text layer: custom TT Bluescreens Trial / IBM Plex Mono only, no system fallback. [Additional nested phrase/colored-word inspection](../artifacts/elephant-1920/nested-rendered-fonts.json) confirms the yellow word independently. All six existing local WOFF2 faces/subsets load; no font CDN or new font family.
- Existing optimized paths and image decoding pass: two character WebPs, elephant WebP and reused local Mosaic. No source-archive, hidden JPEG or occluded-portrait request. Each QA JSON retains successful local requests/responses, natural image dimensions and final effective image geometry.
- Browser console/page errors **0**; failed/HTTP-error requests **0**; external requests **0**. Zero browser animations. Document width exactly **1920px** for both viewport heights. Section clientHeight equals scrollHeight (1080 / 2187), with no internal vertical scrolling.
- SHA256 preservation check: **137** protected tracked files match the pre-task baseline, covering assets, source assets, global styles, all other section sources and package manifests; [preservation-check.json](../artifacts/emptiness-1920/preservation-check.json).
- The fixed canvases have native horizontal containment below 1920 and center above it; this is not a designed responsive layout. Full accessibility, cross-browser/mobile and motion QA are outside this static stage. No blocker remains for the requested scope.

## Control artifacts

| Section | Figma reference | Production pass 1 | Production pass 2 | Final production | Final difference ×4 |
|---|---|---|---|---|---|
| Emptiness | [Reference](../artifacts/emptiness-1920/figma-reference.png) | [Pass 1](../artifacts/emptiness-1920/production-pass-1.png) | [Pass 2](../artifacts/emptiness-1920/production-pass-2.png) | [Pass 3](../artifacts/emptiness-1920/production-pass-3.png) | [Difference](../artifacts/emptiness-1920/difference-pass-3-x4.png) |
| Elephant | [Reference](../artifacts/elephant-1920/figma-reference.png) | [Pass 1](../artifacts/elephant-1920/production-pass-1.png) | [Pass 2](../artifacts/elephant-1920/production-pass-2.png) | [Pass 3](../artifacts/elephant-1920/production-pass-3.png) | [Difference](../artifacts/elephant-1920/difference-pass-3-x4.png) |

Each folder also contains `qa-pass-{1,2,3}.json`, `comparison-pass-{1,2,3}.json`, `geometry-pass-{1,2,3}.json` and amplified differences. Regression screenshots/measurements are in `artifacts/emptiness-1920/`. No QA image is in public or imported by runtime. Temporary diagnostic scripts/captures remain outside the repository. Existing bundled Playwright/Chrome and Sharp were used without installing test dependencies. Locate this stage's single commit with `git log -1 --format=%h -- docs/EMPTINESS_ELEPHANT_DESKTOP_QA.md`.
