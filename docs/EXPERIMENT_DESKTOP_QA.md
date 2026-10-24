# SUBTALE — Stage 1B.2 Experiment Desktop 1920

Completed 2026-10-24. Scope: Experiment only, 1920×1080, DPR 1. Stage 0.3 remains Approved. Hero, the other eight section components, global styles, fonts and existing assets are unchanged. No dependencies, animation, responsive composition or Figma writes were added.

## Sources and implementation

Read-only Figma MCP inspection was limited to [Instructions 10:718](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-718), [Target 10:730](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-730) and [Result 10:760](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-760). Full design context/reference screenshots and a scoped layer read checked text, source vector paths, geometry, fills, list ranges and typography. No full-file audit. [EXPERIMENT_LAYOUT_SOURCE.json](EXPERIMENT_LAYOUT_SOURCE.json) retains the measured 41 nodes; existing VECTOR_ASSET_SOURCE remains unchanged.

`ExperimentSection.tsx` contains three simultaneously mounted sections, with `#experiment-instructions`, `#experiment-target` and `#experiment-result`. Each is 1920×1080 in normal vertical flow. Their document tops are 1080, 2160 and 3240 px, immediately after Hero, with no gaps or overlap. Experiment was moved outside the diagnostic foundation wrapper in App; the remaining placeholders keep that wrapper. No global CSS change was needed.

Scoped CSS Modules reproduce the source banners, exact copy, layout, colors, texture, controls, frames and stacking. The original mosaic delivery file supplies the tiled background at its source scale, opacity 0.2 / 0.2 / 0.3. Existing `hero-cta-arrow.svg` supplies the three CTA arrows at native export dimensions, including stroke overflow. No whole-screen runtime image, source archive import or new art is used.

Instructions Next links to Target; Target Next links to Result. Instructions Skip, the underlined help word and Result CTA link to the existing Emptiness anchor. This does not implement Emptiness. Help is always displayed in the original visible Figma state for Stage 1B, with its existing trigger appearance. Disclosure/closing and outcome/focus state belong to Stage 3; there is no new user-facing QA mode. No progress detection, success judgment, timer, stepper, snapping or pinning.

The cross uses the exact two vector paths and transforms, white 10px butt strokes, inside x610/y490/100×100. The yellow Target dot is x1210/y490/100×100. Both are static with opacity 1, no transform, animation or transition. The separate Result dot retains its own source x1206/y490/100×100; no shared dot is moved between screens. Code never hides the dot or simulates the physiological effect.

## Visual comparison method

Followed the Hero method: Figma references exported at 1920×1080; production build served by Vite preview; Chrome viewport 1920×1080 and deviceScaleFactor 1. Each capture waited for local fonts, decoded image resources and settled rendering, then aligned the relevant section to viewport top. Two production captures and visual comparisons were performed for **each** frame, including unchanged Result on the second pass.

Full-frame metrics below compare RGB channel samples in the actual PNGs. MAE is mean absolute delta on the 0–255 channel scale; the percentage counts pixels with any channel delta >12. Background dominates these averages: they are not a pixel-perfect score. [Pass 1 measurements](../artifacts/experiment-1920/comparison-pass-1.json) / [pass 2 measurements](../artifacts/experiment-1920/comparison-pass-2.json) include regional metrics and ±2px alignment checks.

| Frame | Pass 1 MAE / >12 pixels | Pass 2 MAE / >12 pixels | Comparison result |
|---|---:|---:|---|
| Instructions 10:718 | 0.722 / 0.885% | 0.657 / 0.857% | Title/banner, two-line scroll instruction and three-line distance instruction match. Corrected link underline by 1px; no composition or wrap discrepancy remains. |
| Target 10:730 | 1.722 / 1.356% | 0.649 / 0.689% | Corrected list body indent by −8px, ordered-marker placement, help title glyph baseline by +1px inside the unchanged text box, and underlines by +1px. Cross/dot positions, visible panel and CTA match. |
| Result 10:760 | 0.634 / 0.556% | 0.634 / 0.556% | Three display lines, yellow banner, separate dot, two-line explanation and three-line note match. Second comparison confirmed no further layout correction was needed. |

The 37 directly comparable frame/text/control/panel/stimulus boxes match Figma x/y/width/height within **1/64 CSS px**: [geometry-comparison.json](../artifacts/experiment-1920/geometry-comparison.json). Three native SVG export canvases and one rotated path are explicitly excluded from that box comparison: Figma's nominal vector dimensions exclude stroke overflow or describe the pre-rotation line. Their source paths/transforms and export offsets are retained.

Remaining measurable visual differences, recorded rather than called pixel-identical:

- Instructions display title/banner region MAE **1.767 / 1.417**; body text regions **3.491 / 3.641**. Best whole-pixel offset is 0/0. Glyph edge rasterization and underline skip boundaries differ between Chrome and Figma.
- Target help title MAE **1.218**, list region **4.387**, whole panel **2.323** after calibration. Residual differences lie along text/marker/underline edges; best whole-pixel text offset is 0/0. The blue/white panel geometry is preserved. Cross region MAE **0.501**, maximum channel delta **12**; dot region MAE **0.247**, 0.660% pixels above threshold along the ellipse boundary.
- Result title/second-line/banner MAE **1.709 / 1.881 / 0.580**; explanation/note **2.689 / 3.481**; dot **0.266**. Best whole-pixel text offset is 0/0. Residual glyph and ellipse edge rasterization remains.
- Empty upper-background sample MAE **0.395** for Instructions/Target, maximum delta **4**; Result **0.480**, maximum **5**. Source tile size and opacity are retained; texture sampling/compositing is not identical.
- The existing SVG arrow region has MAE **5.513** (35×35 sample), 7.592% pixels above threshold; source geometry/color and native asset are preserved. Differences remain on the rasterized stroke boundary. CTA region MAE is **1.205 / 0.910 / 1.126** across the three screens.

No omitted content, wrong line break, misplaced panel/stimulus or accidental horizontal overflow remains at the target viewport. Smaller/wider compositions are not approved by this stage; the fixed canvas has native horizontal containment below 1920 and is centered above it.

## Technical checks and Hero regression

- TypeScript typecheck and production build passed: 39 modules, JS 249.97 kB / 75.19 kB gzip; CSS 13.59 kB / 3.52 kB gzip, excluding public media.
- `node scripts/check-assets.mjs`: 41 verified, 0 pending, 0 errors; five poster originals and 35 raster delivery files.
- All **16 exact source text contents** checked in both passes. Actual rendered fonts inspected through Chrome CDP for every text node: only custom TT Bluescreens Trial and IBM Plex Mono, no system fallback. All six existing local WOFF2 faces/subsets loaded; font files and unicode ranges were not changed.
- Six native anchor routes passed, including Hero → Instructions and the existing help Skip link. The three inner anchors exist simultaneously; exact section order/height/top positions passed.
- Cross/dot geometry and computed styles remained identical after 750ms, a reduced-motion preference change, and leaving/returning through anchors. Zero browser animations. This checks technical immobility, not whether a participant experiences the physiological effect.
- Production browser console/page errors: **0**. Failed/HTTP-error requests: **0**. External requests, including font CDNs: **0**. Existing local image/SVG resources loaded and decoded. Document width is exactly **1920 px** on all three captures; DPR is 1.
- Both Hero regression captures are **pixel-identical** to Stage 1B.1's production PNG: RGB MAE 0, maximum delta 0, 100% exact pixels. This confirms preservation of the accepted Hero result, including its previously documented Figma rendering limits.
- SHA256 preservation check: all **123** tracked files in public assets, source assets, Hero source and global styles match the pre-task baseline; [preservation-check.json](../artifacts/experiment-1920/preservation-check.json). Other eight section components and package manifests are unchanged.
- No functional disclosure, full keyboard/screen-reader audit, adaptive composition or motion implementation is claimed. These remain in their assigned later stages. No blocker for the static 1920 scope.

## Control artifacts

All images are outside public and are never imported by runtime code. QA used existing bundled Playwright/Chrome and Sharp without installing dependencies.

| Screen | Figma reference | Production pass 1 | Production pass 2 | Final difference ×4 |
|---|---|---|---|---|
| Instructions | [Reference](../artifacts/experiment-1920/figma-instructions.png) | [Pass 1](../artifacts/experiment-1920/instructions-production-pass-1.png) | [Pass 2](../artifacts/experiment-1920/instructions-production-pass-2.png) | [Difference](../artifacts/experiment-1920/instructions-difference-pass-2-x4.png) |
| Target | [Reference](../artifacts/experiment-1920/figma-target.png) | [Pass 1](../artifacts/experiment-1920/target-production-pass-1.png) | [Pass 2](../artifacts/experiment-1920/target-production-pass-2.png) | [Difference](../artifacts/experiment-1920/target-difference-pass-2-x4.png) |
| Result | [Reference](../artifacts/experiment-1920/figma-result.png) | [Pass 1](../artifacts/experiment-1920/result-production-pass-1.png) | [Pass 2](../artifacts/experiment-1920/result-production-pass-2.png) | [Difference](../artifacts/experiment-1920/result-difference-pass-2-x4.png) |

[Browser QA pass 1](../artifacts/experiment-1920/qa-pass-1.json) / [pass 2](../artifacts/experiment-1920/qa-pass-2.json); [Hero regression pass 1](../artifacts/experiment-1920/hero-regression-pass-1.png) / [pass 2](../artifacts/experiment-1920/hero-regression-pass-2.png). Locate the separate Stage 1B.2 commit with `git log -1 --format=%h -- docs/EXPERIMENT_DESKTOP_QA.md`.
