# Blind Zones Explorer — Desktop 1920 QA

Stage 1B.4 **Completed**. Eight static Figma endpoints are implemented as one section. Target: 1920×1080 CSS px, DPR 1. This is a measured visual match with the raster differences below; it is not a claim of identical pixels.

## Scope and source

Only Explorer was implemented. `App.tsx` moves its existing component out of the technical-placeholder wrapper, directly after Elephant. Hero, Experiment, Emptiness, Elephant, Movies and the other section sources are unchanged. The ten-section reading order and existing anchors remain intact. The five later sections remain placeholders.

The eight named frames in file `H4HI00uGY2UOxpcfHogUat` were read through Figma MCP, including their text descendants, screenshots and paint order. No other frames were audited and Figma was not modified. [BLIND_ZONES_LAYOUT_SOURCE.json](BLIND_ZONES_LAYOUT_SOURCE.json) records 283 relevant source nodes; Boolean-mask operands use the existing vector exports instead of duplicate geometry. The four Stage 0.2 import registers, `FIGMA_ASSET_MAP.json` and `ASSET_DELIVERY.json` remain unchanged.

## Implementation boundaries

- `BlindZonesExplorer.tsx`: one semantic section, shared heading/banner, four category cards, lower question and exactly one mounted category artwork. Optional typed `category`/`meaning` props select visual endpoints; the normal application supplies neither and always starts at Idiom A.
- `ExplorerArtwork.tsx`: four category components, independent image/mask wrappers, no handlers, timers, state machine or animation.
- `explorerArtworkData.ts`: measured slots, normalized crops, matrices, source IDs and layer order from the import registers.
- `explorerVisualData.ts`: unchanged Figma copy and endpoint/source-node mapping for the shared UI.
- `BlindZonesExplorer.module.css`: scoped fixed desktop composition; no global CSS, font-face, token or asset changes. The 1920px canvas clips to its own 1080px height. Below the reference width it has technical horizontal containment, not an adaptive composition.
- Existing `model.ts` retains the future per-category A/B state contract. Category selection, question switching, keyboard/touch operation, focus management and session memory remain Stage 3 work. No new expanded state, explanation or visible QA control was added.

All runtime images and masks use the existing generated public-asset catalogue and optimized paths. No original archive is imported into runtime, no assets were re-exported or optimized, and no dependencies were installed.

## Measured composition

| Element | Figma and implementation |
|---|---|
| Canvas | 1920×1080, clipped; blue `#012ed7` |
| Heading | x30 y30, 227×80; TT Bluescreens Trial ExtraBold 800, 100px/80px, tracking 0 |
| Banner | x30 y125, 596×120; text x50 y145, 556×80, same 100px display face |
| Category panel | x1210 y30, 680×1020; four 232.5px cards, 30px gaps |
| Card content | x1241 and y61 + 262.5×index; 618×179; source content overhang is preserved |
| Card number / label | TT 800, 40px/32px and 80px/64px, tracking 0; 15px heading gap |
| Description | IBM Plex Mono 500, 20px/24px, tracking −0.8px, 618×48, original two-line wraps |
| Inactive card | white fill 0.2, inside 1px white stroke 0.6, CSS backdrop blur 17px from the Figma context |
| Active card | yellow fill, ink text; number ink opacity 0.5 |
| Lower question | x30 y1022, h28; IBM 500, 25px/27.5px, tracking −0.75px; original underlining |
| Mosaic | tile 354.9999899864197×287.9345006942749px, opacity 0.4 |

No measured coordinates were rounded to a spacing grid. After the first comparison, description glyphs were shifted down 1px **inside the unchanged source text boxes** to match Figma's baseline. Titles, numbers and labels were not moved. Editorial text remains byte-for-byte equal to the Figma text values; source lowercase display transforms remain CSS transforms.

### Artwork, masks and stacking

**Idiom A/B:** eight separate ice wrappers keep the source positions in both endpoints. Six existing Boolean SVG masks retain their intrinsic dimensions and alpha mode. The two lower fragments use the same WebP with independent wrappers and crops. Each crop is projected from the normalized matrix: image width `slotWidth / sx`, height `slotHeight / sy`, offset `−tx × imageWidth`, `−ty × imageHeight`. The actual optimized WebP is 2304×1286; original PNG pixel coordinates are not applied directly. No hidden JPEG/base image is mounted.

In B, the telephone occupies x227 y228, 635×851. Paint order is upper-left ice → telephone → Mosaic → shared UI → remaining seven ice fragments → lower question, exactly as the frame child order. A retains its separate source order with Mosaic below all artwork. The DOM paint-order assertions passed for all eight endpoints.

**Pun A/B:** whole bicycle 735×985 and wheels 735×984 share one wrapper at x50 y200. The children have no transforms. Only the wrapper applies the full measured matrix; source nested group matrices are normalized once, not multiplied into repeated rotations. Local pivot is (367.5, 492.5), corresponding to frame point (417.5, 692.5). B uses CSS +34.36714137526945°. Full B matrix:

```text
[[ 0.8254373669624329, -0.564493715763092, 392.1650390625 ],
 [ 0.564493715763092,   0.8254373669624329, 78.5205078125 ]]
```

The pivot projected through the export matrix is (417.50011640787125, 692.4998515844345); sub-0.001px export precision is retained. Frame clipping is at 1920×1080; wheels are not independently rotated.

**Double meaning A/B:** exactly one complete bitmap is mounted at x115 y383, 845×563. A uses eye; B uses the original eye + couple bitmap. There is no invented separate couple layer.

**Cultural reference A/B:** A contains five independent snowflake wrappers at the source slots (328,321,522,699), (762,83,232,311), (870,198,232,311), (902,655,168,224), (126,732,110,147), with source stacking and cover fill. B mounts only the throne at x301 y263, 610×817. No morph, transition or added motion.

## Production QA method

Normal production and the explicit QA build use the same Explorer component, assets, fonts and scoped styles. The test entry is separate:

```sh
npm run build:explorer-qa
npm run preview -- --outDir dist-explorer-qa --port 4174
```

The eight deterministic pages are `/qa/idiom-A.html`, `/qa/idiom-B.html`, `/qa/pun-A.html`, `/qa/pun-B.html`, `/qa/doubleMeaning-A.html`, `/qa/doubleMeaning-B.html`, `/qa/reference-A.html`, `/qa/reference-B.html`. The build emits fixed HTML dataset values, without query selection or visible fixture controls. `dist-explorer-qa/` is ignored. Normal `npm run build` emits only `index.html` and contains neither the fixture entry nor marker: [build isolation](../artifacts/blind-zones-1920/build-isolation.json).

Chrome headless via the existing bundled Playwright runtime captured three complete production passes for **each** endpoint, at 1920×1080/DPR 1. Screenshots wait for local fonts, decoded DOM images, CSS masks/backgrounds and two rendering frames. Each reference/production pair was visually compared, including cropped art, card typography and the special Idiom B stacking. Sharp measured raw RGB differences without rescaling. Difference PNGs amplify absolute channel differences ×4. QA utilities used the existing external runtime; no test dependency or temporary diagnostic script was committed.

Pass 1 identified the 20px description baseline discrepancy. Its correction reduced first-card description-region MAE from 12.227 to 2.862 (active) and 9.047 to 2.517 (inactive). Pass 2 rechecked all eight compositions; a QA-entry-only favicon 404 was corrected with the same empty favicon approach as the normal entry. Pass 3 repeated all eight captures and technical checks successfully. Earlier captures remain as evidence, not as a claim that their intermediate technical checks were green.

MAE below is mean absolute RGB channel difference on a 0–255 scale. “>12” is the percentage of pixels with **any** channel difference greater than 12; it is not a geometry error or an acceptance threshold.

| Endpoint | Figma frame | Full MAE pass 1 → final | Final pixels >12 | Control images |
|---|---|---:|---:|---|
| idiom-A | [10:1431](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-1431) | 1.2749 → 1.1756 | 2.702% | [Figma](../artifacts/blind-zones-1920/idiom-A-figma.png) · [production](../artifacts/blind-zones-1920/idiom-A-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/idiom-A-difference-pass-3-x4.png) |
| idiom-B | [10:1596](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-1596) | 1.4614 → 1.2556 | 2.865% | [Figma](../artifacts/blind-zones-1920/idiom-B-figma.png) · [production](../artifacts/blind-zones-1920/idiom-B-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/idiom-B-difference-pass-3-x4.png) |
| pun-A | [10:1495](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-1495) | 1.2486 → 1.0841 | 2.050% | [Figma](../artifacts/blind-zones-1920/pun-A-figma.png) · [production](../artifacts/blind-zones-1920/pun-A-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/pun-A-difference-pass-3-x4.png) |
| pun-B | [10:1981](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-1981) | 1.2570 → 1.0925 | 2.077% | [Figma](../artifacts/blind-zones-1920/pun-B-figma.png) · [production](../artifacts/blind-zones-1920/pun-B-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/pun-B-difference-pass-3-x4.png) |
| doubleMeaning-A | [10:1528](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-1528) | 1.2380 → 1.0397 | 1.938% | [Figma](../artifacts/blind-zones-1920/doubleMeaning-A-figma.png) · [production](../artifacts/blind-zones-1920/doubleMeaning-A-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/doubleMeaning-A-difference-pass-3-x4.png) |
| doubleMeaning-B | [10:2017](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-2017) | 1.1481 → 0.9499 | 1.718% | [Figma](../artifacts/blind-zones-1920/doubleMeaning-B-figma.png) · [production](../artifacts/blind-zones-1920/doubleMeaning-B-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/doubleMeaning-B-difference-pass-3-x4.png) |
| reference-A | [10:1560](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-1560) | 1.5742 → 1.4099 | 2.922% | [Figma](../artifacts/blind-zones-1920/reference-A-figma.png) · [production](../artifacts/blind-zones-1920/reference-A-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/reference-A-difference-pass-3-x4.png) |
| reference-B | [10:2049](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/?node-id=10-2049) | 1.5173 → 1.3533 | 3.052% | [Figma](../artifacts/blind-zones-1920/reference-B-figma.png) · [production](../artifacts/blind-zones-1920/reference-B-production-pass-3.png) · [difference ×4](../artifacts/blind-zones-1920/reference-B-difference-pass-3-x4.png) |

Full numerical results: [pass 1](../artifacts/blind-zones-1920/comparison-pass-1.json), [pass 2](../artifacts/blind-zones-1920/comparison-pass-2.json), [pass 3](../artifacts/blind-zones-1920/comparison-pass-3.json). Every endpoint also has `*-qa-pass-3.json` with actual fonts, wraps, image dimensions, geometry, mask styles and effective paint order.

### Geometry and rendered fonts

[Geometry comparison](../artifacts/blind-zones-1920/geometry-comparison.json): all 283 source-node bounds pass a 1/64 CSS px tolerance. Seven endpoints have maximum bound delta 0; Pun B maximum is 0.000052691px, using the full matrix's projected bounds. Source wrapper dimensions, section clipping and panel spacing match.

[Artwork checks](../artifacts/blind-zones-1920/artwork-checks.json): all 16 ice crop projections match within 0.015589 CSS px (browser fractional-layout quantization); all six mask files retain source dimensions and unchanged SHA-256. Phone/ice/Mosaic paint order passes the strict source child-order assertion, as do the other seven endpoints. Image counts A/B are 8/9, 2/2, 1/1 and 5/1 respectively.

Chrome DevTools `CSS.getPlatformFontsForNode` was checked for all 15 source text nodes per endpoint, **120 text-node checks**. Actual glyph fonts are custom TT Bluescreens Trial or IBM Plex Mono only, including mixed Russian/Latin copy; no fallback family was returned. Computed size, weight, line-height and tracking were compared to the source for all 120 nodes. Original line wraps are recorded and visually checked. Existing six local WOFF2 files and `unicode-range` rules were not changed; no CDN request occurs.

### Remaining raster differences

The eight endpoints are geometrically matched; their PNGs are not pixel-identical to Figma. Final full-frame MAE is 0.9499–1.4099/255. The artwork sample (x0 y250, 1200×770) has MAE 0.6232–1.6231; the card panel 1.6218–1.6753. Heading MAE is 0.8234, banner 0.7311. Description samples remain 2.5169–2.8618 after calibration, with their best sampled alignment at (0,0); lower-question samples are 1.079–2.230. Differences concentrate on glyph antialiasing, image edges and textured/backdrop-filter sampling. A clear Mosaic-only sample has MAE 0.4795 and max channel delta 6. These figures quantify remaining raster limits rather than hiding them as “pixel perfect”.

A separate capture verifies the **normal longread**, not only the isolated fixture: [standard production](../artifacts/blind-zones-1920/standard-production-pass-3.png), [checks](../artifacts/blind-zones-1920/standard-qa.json). It shows Idiom A at document y7587, all 39 source bounds identical to the fixture, one Explorer and ten narrative sections, no fixture marker, unchanged state when supplied category/meaning query parameters, and no question-button state change. Screenshots are explicitly aligned to the section top after React mounts; no application scroll behavior was added.

Normal production vs Figma Idiom A has MAE **1.0693**, pixels >12 **2.178%**, art-region MAE **0.9052**: [measurement](../artifacts/blind-zones-1920/standard-figma-comparison.json). Normal vs isolated fixture has MAE **0.1683**, max channel delta **43**: [comparison](../artifacts/blind-zones-1920/standard-fixture-comparison.json). The visible differences are confined to ice edge sampling (x65–1073, y414–985); common UI differs by at most 1/255. Geometry, source URLs, crop matrices and fonts are the same. Different raster sampling in the full-page rendering context is the inferred cause; pixel-equivalence between fixture and longread is not claimed.

## Regression and preservation

All six prior production baselines were compared at their original dimensions (Elephant: 1920×2187; the others: 1920×1080). Existing baseline files were not edited.

| Previous composition | Final result |
|---|---|
| Hero | Pixel-identical: MAE 0, max 0 |
| Experiment Instructions | Pixel-identical: MAE 0, max 0 |
| Experiment Target | Pixel-identical: MAE 0, max 0 |
| Experiment Result | Pixel-identical: MAE 0, max 0 |
| Emptiness | Pixel-identical: MAE 0, max 0 |
| Elephant | 63 RGB channel samples differ by 1/255; MAE 0.0000050011, max 1, zero pixels >12 |

[Regression measurements](../artifacts/blind-zones-1920/regression-pass-3.json) and `*-regression-pass-3.png` preserve the final evidence. Elephant's tiny differences occur on text glyph edges and vary between repeated captures (27/25/63 channel samples across the three passes). Its source, assets, styles and geometry are unchanged; this supports render rounding as the cause. No approved section was changed to force screenshot equality.

[SHA-256 preservation check](../artifacts/blind-zones-1920/preservation-check.json): 140 files covering public assets, source assets, global styles, all other section sources and `package-lock.json` are unchanged. The section order remains Hero → Experiment → Emptiness → Elephant → Explorer → Movies → Vocab → Blind Spot Scene → What to Do → Footer.

## Technical results and limits

- `npm run typecheck`: passed, including the separate QA entry/config, with existing strict options retained.
- `npm run build`: passed; 47 modules, JS 273.79 kB / gzip 81.35 kB, CSS 21.14 kB / gzip 4.73 kB. Normal output has no QA fixture pages or entry.
- `npm run build:explorer-qa`: passed; eight deterministic production fixtures generated separately.
- `node scripts/check-assets.mjs`: 41 verified, 0 pending, 0 errors; 5 poster originals and 35 delivery files checked.
- Final Chrome QA: zero console/page errors, failed requests, HTTP errors or external requests; needed images, masks, texture and local fonts load. [Overall final checks and network evidence](../artifacts/blind-zones-1920/overall-pass-3.json).
- Every fixture contains one section/narrative section, 1920×1080 bounds and scroll bounds, document width 1920, DPR 1, zero animations. Normal longread contains ten narrative sections and exactly one Explorer. There is no horizontal overflow at the reference viewport.
- No GSAP, ScrollTrigger, future dependency, user motion, scroll switching, alternate responsive composition, editorial change or Movies implementation was added.

No blocker remains for the static Stage 1B.4 scope. Functional accessibility and interaction testing belong to Stage 3; animation, adaptive layouts and cross-browser visual equivalence are not claimed by this report. The remaining raster differences above are explicit limits of this Chrome/Figma comparison. Stop here; later sections require a separate stage request.
