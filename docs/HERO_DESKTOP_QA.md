# SUBTALE — Stage 1B.1 Hero Desktop 1920

Completed 2026-10-24. Scope: Hero only, [Figma frame 10:472](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-472), 1920×1080, DPR 1. Stage 0.3 remains Approved. No other section component, editorial copy, existing image/SVG/font/video, motion dependency or Figma node was changed.

## Sources and implementation

Hero get_design_context returned the full high-fidelity prototype plus reference screenshot. Read-only session `2d48476b-79bf-433f-afdf-21d292e09836` then checked only Hero text/layer geometry and the render bounds of its existing SVG nodes. No project-wide audit.

- [HERO_LAYOUT_SOURCE.json](HERO_LAYOUT_SOURCE.json): 52 layout/text/art nodes with source transforms, fills, clipping and typography; Boolean operands/logo primitives already retained in VECTOR_ASSET_SOURCE.
- [HERO_RENDER_BOUNDS.json](HERO_RENDER_BOUNDS.json): bounds used to place existing native-size SVG canvases, accounting for stroke/path overflow and rounded export dimensions.
- HERO_ASSET_IMPORT, FIGMA_ASSET_MAP optimizedPath, ASSET_DELIVERY and the pre-existing runtime URL catalogue supply every raster and SVG.

`HeroSection.tsx` owns the semantic heading, brand, contents control, introduction, CTA and nonmodal hint. `HeroArtwork.tsx` renders measured portrait fragments, isolated eye, film backing/film bitmap and stars; `heroArtworkData.ts` holds Hero-only geometry. CSS Modules isolate the canvas. No generic Figma renderer or whole-screen image is used.

The 1920×1080 canvas preserves both headline lines, all eleven exact text contents, capitalization, explicit introduction break, hint wrapping, all four Union boundaries (including the fully clipped lower one), original Boolean operand geometry, source crops, yellow underlay, independent isolated eye/accent and the film's white backing. The texture is painted above the introduction/primary CTA but below the later artwork, matching source order. Hint overlays the portrait and part of the primary CTA exactly as in the approved frame.

Existing SVGs retain native root dimensions; their export/render-bound offsets are applied to positioning. No redraw or new art exports. Normalized source crops are applied to optimized files without trimming alpha margins. Boolean API operands were converted from their repeated parent-coordinate offset into one local coordinate system, once.

The Stage 1A diagnostic header/padding was removed from the first-screen path; the old scaffold styles are confined to wrappers around the remaining placeholders. The other nine section source files are unchanged and remain in their original narrative order. At widths below 1920, the fixed canvas has its own native horizontal overflow; at wider widths it is centered. This is technical containment, not an approved responsive composition.

CTA/Start use native `#experiment-instructions`; Skip uses `#emptiness`. The existing contents appearance is preserved; its expanded state and interactions are deferred to Stage 3. Hint remains visible and optional, with no mandatory intermediate step. No animation, timeline, scroll interception, scroll-driven effects or new disclosure design.

## Font repair (separate commit)

`1ef5ddb` adds matching IBM Plex Mono Latin 500/600. The source package's Cyrillic files match existing files byte-for-byte; all four IBM files report internal Version 2.3. Source unicode-range declarations route scripts/punctuation correctly. OFL license is retained. See [FONT_ASSETS.md](FONT_ASSETS.md) and [font-rendering.json](../artifacts/hero-1920/font-rendering.json).

Actual Chrome rendered-font inspection confirms Latin/Cyrillic at both weights use the custom IBM face. Hero's eleven text nodes use only custom TT Bluescreens Trial or IBM Plex Mono, with no system fallback. All six local WOFF2 subsets/faces load; no external font requests.

**Approved-family exceptions:** source `10:676` (small SUBTALE label) specifies Inter Semi Bold; `10:681` (contents label) specifies Manrope SemiBold. D11 permits only TT Bluescreens Trial and IBM Plex Mono, so both use IBM Plex Mono 600 at the recorded size/line-height, in the unchanged source box. No third family or synthetic horizontal scaling was introduced. Glyph shapes/advance differ from those two Figma families; this is an explicit fidelity limit, not an unresolved loading failure. Text and source tracking stay unchanged.

## Visual passes and measured differences

All reference/browser images are 1920×1080; browser devicePixelRatio is 1. Each pass waited for fonts and image decode, captured at scrollY=0, and was inspected visually.

| Pass | Findings / correction | Full-frame mean absolute RGB delta (0–255) | Pixels with any RGB-channel delta >12 |
|---|---|---:|---:|
| 1 — initial implementation | Missing middle/lower portrait bands exposed repeated Boolean-coordinate offsets | 6.699 | 7.028% |
| 2 — geometry correction | Normalize operands, restore all bands, exact eye crop, off-white intro, measured text boxes | 2.090 | 2.892% |
| Final — type raster calibration | Scoped antialiased font smoothing; 1px hint-title glyph alignment inside unchanged text box | 1.179 | 2.043% |

These metrics compare the actual PNGs, not perceptual estimates. Background pixels dominate full-frame averages; the figures are **not a pixel-perfect score**. Raw results: [comparison.json](../artifacts/hero-1920/comparison.json).

Twelve key boxes (canvas, intro/CTA, portrait, headline/banner/text, contents, eye accent, hint/title/copy) match the expected Figma x/y/width/height within **1/64 CSS px**; see [geometry-comparison.json](../artifacts/hero-1920/geometry-comparison.json). The headline remains one line per source text node, introduction two lines and hint copy two lines; production QA records actual DOM Range line grouping.

Remaining measurable differences:

- Header/question text regions have RGB MAE **1.534 / 0.994** respectively; edge rasterization still differs. Source typography values/containers are preserved.
- Portrait region MAE **1.468**, 1.952% pixels above the >12 threshold: raster resampling/alpha edges remain different from Figma's renderer while the existing optimized delivery files/crops are retained. No asset re-encoding was done to hide this difference.
- Empty background sample MAE **0.484**, maximum channel delta **6**: small texture sampling/compositing differences.
- Contents-family exception region MAE **18.945**: IBM glyphs differ from source Manrope. The small Latin brand label similarly differs from source Inter, while position/size/box remain measured.
- Dev vs production captures differ in only **115 RGB channel samples**, each by **1**, mean delta 0.0000185; this is below the declared visual threshold.

No large misplaced/omitted illustration, wrong wrap or accidental page overflow remains in the final 1920 capture. The intentional source clipping and hint overlap remain. The result is close to the approved composition with the explicit family/rasterization limits above; it is not claimed to be pixel-identical.

## Checks performed

- TypeScript typecheck and production build passed (38 modules, JS 243.85 kB / 73.47 kB gzip; CSS 9.64 kB / 2.75 kB gzip, excluding public media).
- `node scripts/check-assets.mjs`: 41 verified / 0 pending / 0 errors; five poster originals and 35 raster delivery files.
- Dev and production Chrome: viewport 1920×1080, DPR 1, hero height 1080; document width 1920; ten narrative section boundaries, one explorer; zero animations.
- Eleven source text strings compared exactly to Figma extraction; actual rendered fonts inspected through CDP, not only FontFaceSet.
- Thirteen distinct Hero image/SVG/texture URLs successfully loaded from local delivery resources; font/image decode completed; no console errors, page errors, failed requests or external requests.
- Original preservation: all 114 tracked asset/source files from the post-font-fix baseline match SHA256; no other section component changed.
- No tablet/mobile/responsive design, expanded contents/hint UI, screen-reader audit, Experiment implementation or motion QA was added to this scope.

## Control artifacts

- [Figma reference](../artifacts/hero-1920/figma-reference.png)
- [Initial pass](../artifacts/hero-1920/browser-pass-1.png)
- [Second pass](../artifacts/hero-1920/browser-pass-2.png)
- [Final dev capture](../artifacts/hero-1920/browser-pass-final.png)
- [Production capture](../artifacts/hero-1920/browser-pass-production.png)
- [Difference amplified ×4](../artifacts/hero-1920/difference-x4.png)
- [Final dev QA](../artifacts/hero-1920/qa-pass-final.json) / [production QA](../artifacts/hero-1920/qa-pass-production.json)

Screenshots live outside public and are never imported by runtime code. Browser QA used the pre-existing bundled Playwright/Chrome; no project test or animation dependency was installed. Locate the Hero implementation commit with `git log -1 --format=%h -- docs/HERO_DESKTOP_QA.md`.
