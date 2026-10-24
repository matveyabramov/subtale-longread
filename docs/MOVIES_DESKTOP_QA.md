# Movies — Desktop 1920 QA

Stage 1B.5 **Completed**. Static Movies frame `10:1794` is implemented at **1920×1899**. Five episodes remain within one narrative section. Three production passes were captured with a **1920×1080 viewport, DPR 1**, including full-height section images. This report records measured differences and does not claim pixel-identical rendering against Figma.

## Scope and evidence

Starting point: clean `main`, HEAD `a23b9cf`, tracking `origin/main` with no ahead/behind difference. Existing implementation commits were preserved. Only Movies source and its placement in `App.tsx` changed; no global CSS, font faces, runtime assets, media, dependencies or previous section source was edited.

Figma source: [Movies 10:1794](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1794), file `H4HI00uGY2UOxpcfHogUat`. A scoped design-context read, descendant style/geometry read and full-resolution screenshot were obtained through Figma MCP, session `ce5b7985-a395-4f25-9603-dee81a09f416`. No full-file audit or Figma mutation occurred. [MOVIES_LAYOUT_SOURCE.json](MOVIES_LAYOUT_SOURCE.json) records 127 relevant nodes and the existing Stage 0.2 arrow transform metadata.

The frame contains text, tags, Mosaic, six separators, five arrow frames and two rows of film perforation. **It contains no movie poster or video rectangle.** Existing JPGs/MP4s were therefore not substituted into the static composition.

## Component and media boundaries

- `MoviesSection.tsx`: one `#movies` section, measured 1920×1899 canvas, heading/banner, Mosaic, 42 independent perforation squares and a list of five scenes. It sits immediately after Explorer, outside the remaining placeholder wrapper.
- `MovieCase.tsx`: one `article` per scene, metadata/tags, quote, optional original reply, and the existing static arrow decoration. Each article has a stable `movie-${case.id}` anchor and film-label heading. Articles are not additional narrative sections.
- `moviesVisualData.ts`: original Figma strings, source IDs and measured slots, typed by existing `MovieCaseId`. It contains no duplicate video/poster catalogue.
- Existing `movieCases` from `model.ts` controls scene order and supplies each complete typed media identity. `model.ts` is unchanged. The current render uses its stable ID and does not mount media resources.
- `MoviesSection.module.css`: scoped layout and typography only. No new interaction, animation, query mode, player, active Play/Pause button, preload element, modal or responsive composition.

Reading order is section heading → banner → scene 01 metadata/quote/reply → 02 → 03 → 04 → 05. Arrow graphics remain noninteractive and hidden from assistive technology at this static stage. Existing source case transformations are CSS uppercase/lowercase; raw Figma strings, punctuation and explicit newlines are unchanged. No editorial explanation was added.

## Geometry and paints

| Element | Figma / final production |
|---|---|
| Section | 1920×1899, document y8667, ink `#0B0D0F`, clipped to the source frame |
| Mosaic | x0 y0, 1920×1899; original 397×322 asset, TILE factor 0.8942065238952637, paint opacity 0.3; tile 354.9999899864197×287.9345006942749px |
| Perforation | two rows x30, y30 / y1819, 1860×50; 21 white 50×50 squares each, x = 30 + 90.5×index |
| Heading `10:1918` | x30 y150, 642×80 |
| Banner `10:1919` / text `10:1920` | x30 y245, 679×120; text x50 y265, 639×80, yellow fill / ink text |
| Scenes container `10:1840` | x0 y425, 1920×1324; source 40px inter-item gaps |
| Dividers | six independent lines y425, 757, 1029, 1301, 1573, 1749; 1920px wide, centered 4px white stroke, opacity 0.3 |
| Scene bodies | x30, width 1860, 40px below each divider |
| Metadata / quote gap | metadata width 350, gap 125, quote x505; source content widths vary per scene |
| Tags | h44, 10px padding, 6px gaps; first tag yellow, others white opacity 0.1; no invented border/radius |
| Arrow frames | x1823, scene-body y; 67×67, source white fill opacity 0.1, inside black 1px border, clipped |

All 127 source bounds match with **maximum measured delta 0 CSS px**, including fractional square positions. The arrow-vector bounds are projected through their source vertical reflection, rather than treating transform origins as top-left bounds. Per-node checks are in [final browser data](../artifacts/movies-1920/qa-pass-3.json).

The 50px perforation squares use their exact fractional slots with clipped expanded paint, preserving half-pixel edge coverage instead of CSS fill-edge snapping. This reduced the top-strip region MAE from 0.9521 to 0.3475; its remaining maximum channel delta is 5, from the background texture rather than a snapped white edge. No image or animation replaces the squares.

### Five scenes

Coordinates below are within the Movies frame; row includes its leading divider. All quote x positions are 505; every metadata block starts at x30. Source geometry is not replaced with uniform row heights.

| Case / stable ID | Row y / height | Body y / height | Metadata height | Quote size | Tag widths |
|---|---:|---:|---:|---:|---|
| 01 Airplane! / `airplane` | 425 / 292 | 465 / 252 | 82 | 561×192 | 44, 55, 77 |
| 02 Back to the Future Part II / `backToTheFuture` | 757 / 232 | 797 / 192 | 82 | 636×192 | 44, 156, 111 |
| 03 Austin Powers / `austinPowers` | 1029 / 232 | 1069 / 192 | 104 | 743×192 | 44, 178 |
| 04 Sherlock / `sherlock` | 1301 / 232 | 1341 / 192 | 82 | 389×192 | 44, 189 |
| 05 The Shining / `theShining` | 1573 / 136 | 1613 / 96 | 82 | 478×96 | 44, 223 |

Airplane retains its two-line quote and original reply at x505 y687, 561×30, separated from the quote by 30px. Back to the Future, Austin Powers and Sherlock retain two-line quotes. The Shining remains a single-line quote. Austin Powers' film label keeps its two explicit lines in a 283×44 text box; other labels have their source 22px boxes. Exact texts and node IDs are in the source snapshot and visual data, and were asserted against browser `textContent` for all 25 text nodes in each pass.

### Typography and vector reuse

| Use | Approved local face | Size / line-height | Tracking |
|---|---|---|---|
| Heading and banner | TT Bluescreens Trial ExtraBold 800 | 100 / 80px | 0 |
| Quotes | TT Bluescreens Trial ExtraBold 800 | 120 / 96px | 0 |
| Tags | IBM Plex Mono Medium 500 | 20 / 24px | −0.8px |
| Film labels | IBM Plex Mono Medium 500 | 18 / 21.6px, centered within source boxes | −0.72px |
| Airplane reply | IBM Plex Mono Medium 500 | 25 / 30px | −1px |

Chrome DevTools `CSS.getPlatformFontsForNode` inspected actual rendered glyphs on all **25 text nodes per pass, 75 checks total**. Only custom TT Bluescreens Trial / IBM Plex Mono appeared, including the Russian heading and Latin labels/quotes. Final computed size, weight, line-height and tracking all match the source within 0.001px float tolerance. Six local WOFF2 files and their Latin/Cyrillic routing remain unchanged. No font CDN is used.

Pass 1 showed the small-copy baseline mismatch. Pass 2 shifted tag and film-label **inner glyph spans** down 1px while leaving all measured text boxes unchanged. The first tag sample MAE decreased from 6.7712 to 1.4261; film-label sample from 22.1701 to 5.9730. Final best sampled integer alignment is (0,0). Further fractional baseline probes did not improve the raster match. Large quotes and the original reply were not moved.

The five arrows reuse `hero-cta-arrow.svg` at its intrinsic **29×29** size. Stage 0.2 `VECTOR_ASSET_SOURCE.json` already confirms the shared contour and the Movies white stroke / Y reflection. Scoped CSS applies that white paint and static reflection at the measured logical 20×20 vector slot (relative transform origin 22,45); no asset paths were redrawn and no SVG file was edited. The black frame border and source translucent fill remain independent CSS geometry. Residual SVG-edge antialiasing is measured below.

## Three production passes

Chrome 156.0.8078.47, existing bundled Playwright/Sharp runtime, no dependency installation. Normal `npm run build` output was served locally. Each pass waited for decoded DOM images, texture and local fonts, then captured the full section and actual 1920×1080 top/bottom views. The lower viewport starts at section y819; it overlaps the upper viewport by 261px. Full section PNGs stay 1920×1899, without scaling the page to fit.

| Pass | Work / result | Full RGB MAE /255 | Pixels with any channel delta >12 |
|---|---|---:|---:|
| 1 | Initial composition; all bounds and rendered-font families verified; identified small-copy baseline and fractional-square paint issues | 1.026894 | 1.0215% |
| 2 | Corrected glyph baselines and fractional edge coverage; compared each scene again | 0.728746 | 0.7821% |
| 3 | Fresh final production build; repeated all scene, geometry, font, DOM, network and overflow checks | 0.728746 | 0.7821% |

Controls: [Figma 1920×1899](../artifacts/movies-1920/figma.png), [pass 1](../artifacts/movies-1920/production-pass-1.png), [pass 2](../artifacts/movies-1920/production-pass-2.png), [final](../artifacts/movies-1920/production-pass-3.png), [final difference ×4](../artifacts/movies-1920/difference-pass-3-x4.png), [top viewport](../artifacts/movies-1920/viewport-top-pass-3.png), [bottom viewport](../artifacts/movies-1920/viewport-bottom-pass-3.png). Numerical comparisons: [pass 1](../artifacts/movies-1920/comparison-pass-1.json), [pass 2](../artifacts/movies-1920/comparison-pass-2.json), [pass 3](../artifacts/movies-1920/comparison-pass-3.json).

Each scene was inspected as a separate reference/production comparison. The following samples include adjacent separator/gap pixels: Airplane y423–756; Back to the Future y757–1028; Austin Powers y1029–1300; Sherlock y1301–1572; The Shining y1573–1750. These sample windows are distinct from the exact row bounds above.

| Scene sample | MAE pass 1 → final /255 | Final pixels >12 | Result |
|---|---:|---:|---|
| Airplane! | 0.9462 → 0.7872 | 0.9029% | Source tags, quote, original reply, title and arrow retained |
| Back to the Future Part II | 1.2050 → 0.8117 | 1.0520% | Three source tags and exact quote lines retained |
| Austin Powers | 1.3923 → 0.9310 | 1.2879% | Two-line film label, source tags and quote retained |
| Sherlock | 0.9978 → 0.7240 | 0.5775% | Original em dash, two quote lines and visual-wordplay tag retained |
| The Shining | 1.3290 → 0.8492 | 0.9000% | One-line quote, original apostrophe and cultural-reference tag retained |

### Remaining measured differences

Geometry is matched; the Figma/browser raster outputs differ. Final full-frame MAE is **0.728746/255**, maximum channel delta **162**, and **0.7821%** of pixels have at least one channel delta >12. This is not a pixel-perfect claim or a hidden acceptance threshold.

Differences concentrate on glyph and SVG-edge antialiasing plus the repeated texture. Final measured sample MAEs: heading region 0.7231, clear Mosaic 0.4814 (max 5), first quote 1.2494, first tag group 1.4261, first 18px film label 5.9730, reply 3.0580, first arrow-frame sample 2.5606 (max 155, edge coverage). The best sampled integer offsets for quote, tags, film label, reply and arrow are all (0,0). No measured 1px displacement remains in their source boxes; no different font or image was substituted to reduce these differences.

Actual viewport captures and matching crops of the full section differ only by max 1/255: upper MAE 0.0002336, lower MAE 0.0003573. [Viewport consistency](../artifacts/movies-1920/viewport-consistency.json) records this minor screenshot-context rounding; original 1920×1080 viewport geometry was retained.

## Regression

Existing baselines were not edited. Six previous compositions, normal-page Explorer Idiom A and all eight isolated Explorer endpoints were captured from current production builds and compared: [measurements, rendered fonts and paint order](../artifacts/movies-1920/regression.json).

| Previous composition | Comparison with prior baseline |
|---|---|
| Hero | Pixel-identical |
| Experiment Instructions / Target / Result | Each pixel-identical |
| Emptiness | Pixel-identical |
| Elephant 1920×2187 | 27 RGB samples differ by 1/255; MAE 0.0000021433, max 1 |
| Explorer default on the normal page | Pixel-identical |
| Explorer Idiom A/B, Pun B, Double meaning A/B, Reference A/B | All seven pixel-identical |
| Explorer Pun A | 3691 RGB samples differ, max 2/255; MAE 0.0005934928, zero pixels >12 |

Elephant differences lie on unchanged text edges (x1161–1840, y807–1003). Pun A differences lie inside the bicycle art (x105–767, y290–1069). [Difference bounds](../artifacts/movies-1920/regression-difference-bounds.json) record these regions. Explorer's three shared JS/CSS content-hashed bundle names are **identical** to Stage 1B.4: [bundle evidence](../artifacts/movies-1920/explorer-bundle-preservation.json). Combined with unchanged source/assets, these small channel differences support raster/compositing rounding as the cause; no geometry or source change was made to force image equality. Baselines remain intact.

All 120 actual rendered-font checks and all eight strict Explorer paint-order assertions pass again. [SHA-256 preservation](../artifacts/movies-1920/preservation-check.json) confirms **145 protected files unchanged**: public assets, source archive, global styles, all other section sources, Movies `model.ts` and dependency lockfile. New Movies styles do not target those sections.

The normal DOM still has ten narrative sections in the original order. Movies appears once immediately after the single Explorer, contains five ordered `article` elements, and has zero nested narrative sections. Section bounds are 1920×1899, scroll bounds 1920×1899; document width is 1920. No incidental horizontal or internal vertical overflow exists at the reference viewport. Beyond the reference width, only the same technical fixed-canvas containment as previous sections is provided.

## Future inline media: pending layout approval

The existing media catalogue/types remain the sole source of the five MP4/poster paths. `MovieCase` receives that identity separately from editorial visual data, and stable article/heading IDs provide the integration boundary. **No media rectangle is reserved:** the source frame has none, and inserting one would change approved static geometry.

Question for Stage 3: where and at what size should the inline player expand within each scene, and how should the existing arrow relate to the explicit Play control? This must be approved during playback implementation; it does not block the current static frame. The already approved D07 behavior remains explicit Play, initial sound, no autoplay/loop/hover preview. D10 captions/transcripts, lifecycle coordination, keyboard/touch controls and media accessibility will be implemented and tested with playback. They are not claimed as complete here.

## Technical checks

- `npm run typecheck`: passed, with existing strict TypeScript settings.
- `npm run build`: passed in all three production passes; final 50 modules, CSS 24.60 kB / gzip 5.29 kB, JS 279.68 kB / gzip 82.99 kB.
- `npm run build:explorer-qa`: existing isolated regression build passed; no fixture configuration change or normal-production debug controls.
- `node scripts/check-assets.mjs`: 41 verified, 0 pending, 0 errors; 5 poster originals and 35 delivery files checked. Nothing was re-optimized.
- Three Chrome Movies passes: zero console/page errors, failed requests, HTTP errors, external requests, MP4 requests or poster requests; required Mosaic, existing SVG and local fonts load correctly. Per-pass network/DOM/font records are in `qa-pass-{1,2,3}.json`.
- Normal page: zero `<video>` elements and zero Movies interactive controls, zero animations; exactly one Movies narrative section and five ordered cases. No horizontal overflow at 1920px.
- No dependencies installed, no original assets modified, no GSAP/ScrollTrigger, no later-section implementation and no tablet/mobile layouts.

No blocker remains for static Stage 1B.5. Inline-media placement is a recorded Stage 3 approval item. Stop after this stage.
