# Final four sections — Desktop 1920 QA

Stage 1B.6 **Completed with explicit visual limits below**, 2026-10-25. Vocab, Blind-spot-scene and What-to-do retain 1920×1080 compositions; Footer retains **1920×1334**, including its lower 254px information area. All are static. This is a measured Figma match, not a claim of identical pixels. Footer's approximate image filter and the approved-family treatment of its source Inter label are identified separately from raster antialiasing.

## Scope, source and architecture

Started on clean `main` at `1eb3f2e`, tracking `origin/main` without an ahead/behind difference. Figma file `H4HI00uGY2UOxpcfHogUat` was read only for `10:966`, `10:997`, `10:1272`, `10:1016` and their relevant descendants. Session: `4d2158e7-d77e-41b8-87c1-802d8640daa4`. No full-project audit or Figma write occurred. Existing artwork matrices, source classifications, normalized crops and clipping were reused from Stage 0.2 records.

Measured node snapshots: [Vocab](VOCAB_LAYOUT_SOURCE.json), [Blind-spot-scene](BLIND_SPOT_SCENE_LAYOUT_SOURCE.json), [What-to-do](WHAT_TO_DO_LAYOUT_SOURCE.json), [Footer](FOOTER_LAYOUT_SOURCE.json). They contain **9 + 19 + 103 + 121 = 252 control nodes**, with native text strings, styles, geometry and relative matrices. Existing SVG internals and the fully clipped portrait operands were not re-audited or redrawn.

Each existing section owns its CSS Module and composition. Local `copy.ts` files retain exact editorial strings, including case, punctuation and explicit newlines. What-to-do's local `AdvicePanel` renders two measured panels and two ordered three-item lists; `panelData.ts` retains their unequal geometry. Footer's `FooterCollage`, `FooterImage` and `FooterPixels` keep independent image/primitive wrappers, full matrices and nested clipping. `artworkData.ts` holds only measured runtime geometry and named catalogue keys. There is no generic Figma-tree renderer or whole-screen screenshot in the implementation.

`App.tsx` places the final components directly after Movies and keeps Footer outside `main`, as the page footer. Only the obsolete technical wrapper/import around these placeholders was removed. Previous section sources and global styles were not changed. No new narrative sections were introduced for advice, artwork, credits or image layers. The former scaffold CSS file was left intact; Stage 1C was not started.

## Vocab — frame 10:966

[Source frame](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-966), **1920×1080**. [Figma reference](../artifacts/vocab-1920/figma.png), [final production](../artifacts/vocab-1920/production-pass-3.png), [difference ×4](../artifacts/vocab-1920/difference-pass-3-x4.png).

| Element | Source / final geometry |
|---|---|
| Mosaic | x0 y0, 1920×1080, opacity 0.4; TILE 354.9999899864197×287.9345006942749px |
| Statistic group `10:968` | x30 y30, 679×525 |
| SVG frame `10:969` | x30 y30, 679×395 |
| Statistic explanation `10:971` | x30 y465, 608×90; IBM Plex Mono 500, 25/30px, tracking −1px |
| Heading `10:973` | x739 y615, 931×80; TT Bluescreens Trial 800, 100/80px |
| Banner `10:974` | x739 y710, 932×120; text x759 y730, 892×80, same display face |
| Lower explanation `10:972` | x975 y872, 676×120; IBM 500, 25/30px, tracking −1px |

The existing `vocab-illustration.svg` is used at intrinsic **679×395**, without width/height overrides. Its outlined compound artwork `10:970` was not rebuilt with text, CSS digits or separate animated parts. Accessible image text is the source value “98%”. Original explanations and their three-/four-line wrapping remain unchanged. There is no count-up or motion.

All nine measured bounds match with maximum delta **0 CSS px** in each pass. All four source text nodes use actual custom fonts in Chrome. No implementation correction was needed after the initial capture; passes 2 and 3 independently rechecked it. Final full-frame MAE **0.672013/255**, pixels with any channel delta >12 **1.0438%**, max channel delta 143. Remaining sample MAEs: SVG region **0.5317**, upper explanation **3.1409**, lower explanation **2.5183**, heading/banner region **0.7548**. Best sampled integer offsets for all four text regions are (0,0); differences are primarily SVG/text edge coverage and Mosaic sampling.

## Blind-spot-scene — frame 10:997

[Source frame](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-997), **1920×1080**. [Figma reference](../artifacts/blind-spot-scene-1920/figma.png), [final production](../artifacts/blind-spot-scene-1920/production-pass-3.png), [difference ×4](../artifacts/blind-spot-scene-1920/difference-pass-3-x4.png).

The original three statement/reaction pairs remain visible in row order, with independent text nodes. Header x30 y30, 614×80; yellow banner x30 y125, 734×120; text x50 y145, 694×80. Both use TT 800, 100/80px. Intro x1435 y30, 455×90 uses IBM 500, 25/30px, tracking −1px. Pair text uses IBM 500, **35/42px**, tracking −1.4px; rows have source text-box y488, 605, 722. Left text x30; first two right texts x1457, third x1340. Source widths and all line breaks are retained.

| Independent source line | x | y | Width | Gap from image slot |
|---|---:|---:|---:|---:|
| `10:1000` | 356 | 509 | 284 | 30 |
| `10:1001` | 1281 | 509 | 146 | 30 |
| `10:1002` | 1281 | 626 | 146 | 30 |
| `10:1003` | 1281 | 743 | 29 | 30 |
| `10:1006` | 317 | 626 | 323 | 30 |
| `10:1009` | 297 | 743 | 343 | 30 |

Each is a separate source-positioned segment with centered **4px white stroke, opacity 0.3**. No line crosses under the image. The actual line matrices in `BLIND_SPOT_SCENE_ASSET_IMPORT.json` are identity linear transforms at these exact translations; CSS preserves them without a shared arbitrary grid.

The central **original WebP**, `blind-spot-circle-cutout.webp`, occupies x670 y336, **581×581**, with cover fill and alpha. It is not a CSS circle or mask. The original center sample is RGBA **[1,1,1,255]**: fully opaque near-black. The rendered wrapper's mask is `none`. [Artwork checks](../artifacts/footer-1920/artwork-checks.json) and [structure/asset checks](../artifacts/footer-1920/structure-and-assets.json) record the six exact gaps and opacity evidence.

The original AU-FG texture uses normalized identity CROP over the 1920×1080 slot, paint opacity 0.4, and source LIGHTEN blending. Pass 1 exposed a blending error: the isolated canvas had no own blue backdrop. Giving this section's isolated canvas its measured blue fill restored the source blend without changing global CSS. Full MAE fell from **19.713415** to **0.903878/255**; passes 2 and 3 match. All 19 control bounds match with delta **0 CSS px**. Final art-region MAE **0.6249**, max 36; intro **2.6371**; clear texture **0.7750**, max 8. Final full-frame pixels >12: **0.8283%**, max channel delta 119. No remaining sampled text displacement was found.

## What-to-do — frame 10:1272

[Source frame](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1272), **1920×1080**. [Figma reference](../artifacts/what-to-do-1920/figma.png), [final production](../artifacts/what-to-do-1920/production-pass-3.png), [difference ×4](../artifacts/what-to-do-1920/difference-pass-3-x4.png).

The two source content blocks remain **“Во время просмотра”** and **“После”**, each with three ordered, unchanged recommendations. No advice item is a button, form, note tool, media command or external link.

| Element | Source / final geometry |
|---|---|
| Heading `10:1276` | x20 y20, 942×96; TT 800, 120/96px |
| Yellow banner `10:1274` | x20 y126, 986×136; text x40 y146, 946×96 |
| Intro `10:1277` | x1399 y30, 491×120; IBM 500, 25/30px, tracking −1px |
| Left / right panels | x30 / x975, y342, both 915×545, clipped independently |
| Panel headings | x123 / x1068, y392; TT 800, 80/64px |
| Left / right step groups | x123 y505, 730×276 / x1068 y496, 730×318 |
| Step copy | IBM 500, 35/42px, tracking −1.4px; final right item is 663×84 |
| Source number markers | TT 800, 30/24px; original widths 33/36/37 and unequal local offsets |

The **68 source shapes** are represented as 60 independently positioned 30×30 perforation pixels and eight independent 730px line segments. All three styled frames (banner, left panel, right panel) retain source paint/border values. Each source perforation column has height **698px**, extending beyond the **545px** panel and clipped exactly; the oversize source columns were not shortened or redistributed. Source gray `#3E3E3E`, left inside border `#7F7F7F`, right black pixel opacity 0.5 and right black line opacity 0.3 remain scoped measured values, not new global tokens.

The first two rows retain center-aligned number markers. The third right marker retains its separate 37×37 wrapper and 13px top offset. The last right text keeps its two-line wrap. In pass 2 the 30px marker **inner glyph spans** moved down 1px to match the source baseline, with unchanged logical text boxes. Example white #01 sample MAE: **24.1267 → 2.3178**; right #01: **15.4099 → 1.4731**. All six marker samples now have best sampled integer offset (0,0).

The AU-FG backdrop has source LIGHTEN blend, opacity 0.2, and its own ink canvas backdrop, matching the source within texture sampling limits. All **103 control bounds** match within **0.013672 CSS px**, below 1/64px; the fractional-column values are preserved rather than rounded to a design grid. Final full-frame MAE **0.804271/255**, pixels >12 **1.4428%**, max 140. Left/right panel sample MAEs are **0.4376 / 0.5820**, intro **3.3024**, clear texture **0.7329**, max 5. Remaining differences are glyph/edge antialiasing and texture sampling.

## Footer — frame 10:1016

[Source frame](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1016), **1920×1334**. [Figma reference](../artifacts/footer-1920/figma.png), [final production](../artifacts/footer-1920/production-pass-3.png), [difference ×4](../artifacts/footer-1920/difference-pass-3-x4.png).

| Element | Source / final geometry |
|---|---|
| First thesis `10:1018` | x30 y30, 1002×288; three original lines, TT 800, 120/96px |
| Outer collage `10:1019` | x1106 y193, 771×694, overflow clipped |
| Nested middle band `10:1020` | local x0 y309, 771×154, separately clipped |
| Nested upper band `10:1103` | local x0 y0, 771×309, separately clipped |
| Second thesis banner `10:1147` | x30 y818, 832×232; text x50 y838, 792×192 |
| Lower information `10:1149` | **x0 y1080, 1920×254**, ink fill, clipped; part of the 1334px Footer |
| Brand `10:2092` | x40 y1120, 160×66.66667175292969 |
| Credits `10:1152` | x40 y1225, 790×69; source 100px gaps and exact name widths |
| Visible school logo `10:1162` | x1679 y1120, 201×80; original visible RGBA source and normalized CROP |

The artwork retains **90 independent yellow primitive wrappers** outside the hidden portrait/SVG internals, and the actual source order: middle clipped band → outer pixels → clipped portrait bounds → upper clipped band/pixels → eye paper → unsaid strip → between-lines strip → reflected eye-accent. The independent mouth layer is the next root image, above that subtree. Full 2×3 matrices come from `FOOTER_ASSET_IMPORT.json`; eye paper and between-lines strip retain their separate approximately −15° CSS rotations, without replacing those matrices with rounded angles. All original raster-integrated lettering remains in its image.

`footer-eye.webp`, `footer-unsaid-strip.webp`, `footer-between-lines-strip.webp`, `footer-mouth.webp` and `hero-eye-accent.webp` are unchanged optimized originals. No lettering or paper/eye was separated or rebuilt in HTML. No collage screenshot was used as an implementation asset.

Portrait Union `10:1073` starts at local y694.287109375 in the 694px-high outer clip. Its visible intersection has height **0**. The runtime retains an empty measured bounds wrapper but does not mount the fully hidden portrait bitmap or its 29 operands. No extra yellow Union is drawn over the existing pixels.

The Footer-specific **`footer-pixel-mark.svg`**, intrinsic **46×68**, is used with its source logical bounds and offset; the Hero variant is not substituted. The visible school-logo source is `footer-school-logo-cutout.webp`, not the hidden JPEG. Its CROP matrix is retained:

```text
[[0.8072287440299988, 0, 0.09638551622629166],
 [0, 0.3212851583957672, 0.3413654565811157]]
```

The normalized inverse crop positions the complete optimized image within the 201×80 clipped slot. Maximum measured image-projection delta is 0.015624 CSS px from fractional browser layout; the normalized source matrix is retained without rounding. The six Footer bitmap bindings, full matrices, crop projection deltas and exact 30px scene-line gaps are in [artwork checks](../artifacts/footer-1920/artwork-checks.json). SVG roots/checksums and separate clip containers are in [structure/asset checks](../artifacts/footer-1920/structure-and-assets.json). No new credit or logo URL was invented.

### Footer corrections and remaining differences

Pass 1 exposed the same blue-backdrop/LIGHTEN error as Blind-spot-scene. It was corrected only inside this section's isolated canvas. In pass 2 credits' 20px/50px inner glyph spans moved down 1px, preserving their boxes. In pass 3 the nested brand's full fractional translation replaced accumulated layout snapping; the maximum remaining bound delta dropped from 0.025391 to **0.013672 CSS px**. All **121** measured bounds now remain below 1/64px. Lower content is captured through y1334, without internal scrolling.

Two substantive limits remain, and are not described as mere antialiasing:

1. **image22 filters:** the original Hero eye-accent source, 337×337 slot and horizontal-reflection matrix `[[-1,0,438],[0,1,62]]` are exact. Source filter parameters are exposure 1, contrast 1, saturation 0, shadows −1. A complete runtime equivalent of Figma's filter algorithm was not recovered. Seven CSS candidates were compared on the unchanged source; the selected measured approximation is **`grayscale(0.8) brightness(5)`**. It is not a direct parameter conversion or a replacement image. Final image22-region MAE is **4.3338/255**, max 159, with **10.0362%** of that region's pixels >12. The whole collage sample MAE is **1.9928**. [Calibration evidence](../artifacts/footer-1920/filter-calibration.json) preserves the tested alternatives. Source bytes and alpha are unchanged; the circle texture/ray tonal response still differs from Figma.
2. **Small Latin brand label `10:2157`:** Figma uses Inter Semi Bold, while D11/user constraints allow only TT Bluescreens Trial and IBM Plex Mono. Following the already-used Hero treatment, this label uses **local IBM Plex Mono 600**, retaining source copy, 13.922446250915527px size, line-height, 63×11 box and position. Its letterforms cannot match source Inter. The 64×14 region MAE is **50.0655/255**; the exact source text-box sample MAE is **60.1332**. No Inter or third family was loaded, and no editorial text was changed.

Other final samples: thesis text MAE **1.1421 / 0.5489**, credit region **1.4726**, school-logo crop **2.9583** (max 37), clear texture **0.7558** (max 10). The small 41.6328px Cyrillic brand sample has MAE **7.6319** from font rasterization. The Footer full-frame MAE is **1.000505/255**, pixels >12 **1.4557%**, max 243 (the source-family exception). Pixel-identical visual output is not claimed.

## Three production passes and browser checks

All four sections were captured from the normal production build in Chrome **156.0.8078.47**, using the existing bundled Playwright/Sharp runtime. No dependencies were added. Browser viewport remained **1920×1080, DPR 1** for all four new-section passes. Footer was captured as a full-height element at **1920×1334**, preserving scale; the other images are 1920×1080. Captures wait for decoded images/backgrounds and local fonts, with explicit alignment to the section after React mounts.

Pass 1 established geometry and identified blend/baseline/filter issues. Pass 2 rechecked all four after blend and baseline corrections. Pass 3 used a fresh build, finalized the calibrated image22 approximation, corrected fractional brand placement and repeated the complete comparison. Per-folder `production-pass-{1,2,3}.png`, `difference-pass-{1,2,3}-x4.png`, `comparison-pass-{1,2,3}.json` and `qa-pass-{1,2,3}.json` preserve the evidence.

MAE is mean absolute RGB channel difference on a 0–255 scale, without image rescaling. “>12” counts pixels with any channel difference greater than 12, not a geometry tolerance or a hidden acceptance threshold.

| Section | Full MAE pass 1 | Pass 2 | Final pass 3 | Final pixels >12 |
|---|---:|---:|---:|---:|
| vocab | 0.672013 | 0.672013 | 0.672013 | 1.0438% |
| blind-spot-scene | 19.713415 | 0.903878 | 0.903878 | 0.8283% |
| what-to-do | 0.889793 | 0.838808 | 0.804271 | 1.4428% |
| footer | 15.097815 | 1.208302 | 1.000505 | 1.4557% |

All **252 control nodes** pass the final geometric comparison below 1/64 CSS px; Vocab and Blind-spot-scene have delta 0, What-to-do and Footer max 0.013671875px from fractional browser layout. Source values themselves are not rounded to a spacing grid.

Chrome DevTools `CSS.getPlatformFontsForNode` checked actual glyph fonts for **40 text nodes in each pass, 120 checks total**. Every glyph uses a custom approved TT Bluescreens Trial or IBM Plex Mono face, including Latin and Cyrillic. Final computed size, line-height and tracking are within 0.001px of source values; the source Inter family exception is explicitly documented above. Original string values were asserted against browser `textContent`, and wrapping was compared visually. The six local WOFF2 faces, font routing and global CSS remain unchanged.

## Prior-section regression

[Regression captures and measurements](../artifacts/footer-1920/regression/results.json) compare the existing production baselines with current output; none of those baselines were edited. The existing separate Explorer QA build was regenerated without changing its fixture configuration. All eight source paint-order assertions and 120 actual-font checks passed again.

| Previous composition | Result |
|---|---|
| Hero | Pixel-identical |
| Experiment Instructions / Target / Result | All three pixel-identical |
| Emptiness | Pixel-identical |
| Elephant 1920×2187 | 14 RGB channel samples differ by 1/255 on text edges; MAE 0.0000011114 |
| Normal-page Explorer default | Pixel-identical |
| All eight Explorer endpoints | All eight pixel-identical |
| Movies actual 1920×1080 lower viewport | Pixel-identical to its existing lower-viewport baseline |
| Movies full-height capture | 30 RGB samples / ten pixels differ at y1869 on half-pixel perforation corners, max 18/255; MAE 0.0000463511, pixels >12 0.0002743% |

Movies' small full-height difference was investigated separately: [capture check](../artifacts/footer-1920/regression/movies-capture-check.json). The corresponding ordinary 1920×1080 viewport is exactly identical, while a full-height capture retains the ten changed corner pixels. This supports a capture/compositing-context difference rather than a source/layout change. Both full capture and native-height diagnostic are retained. Previous Movies CSS, geometry, art and text were not modified to hide it. Elephant's differences are in the same unchanged large-text edge region recorded by earlier QA.

[Preservation check](../artifacts/footer-1920/preservation-check.json): SHA-256 comparison of **145 protected files** against commit `1eb3f2e` found **zero changes** across all public/source assets, global styles, previous section sources and the dependency lockfile. No previous implementation was overwritten.

## Structure, anchors and technical results

[Structure and assets](../artifacts/footer-1920/structure-and-assets.json) verifies ten narrative sections, no duplicate IDs, no broken existing hash links, three independent Experiment anchors, and two three-item advice lists. The page is **1920×15140**, with no horizontal overflow at the reference viewport. Section top positions:

```text
Hero 0; Experiment 1080; Emptiness 4320; Elephant 5400;
Explorer 7587; Movies 8667; Vocab 10566; Blind-spot-scene 11646;
What-to-do 12726; Footer 13806 → page end 15140.
```

- `npm run typecheck`: passed with strict settings unchanged.
- `npm run build`: passed for all three passes; final 60 modules, JS 306.82 kB / gzip 87.76 kB, CSS 38.15 kB / gzip 6.75 kB.
- `npm run build:explorer-qa`: passed for regression; its eight pages remain isolated from normal production.
- `node scripts/check-assets.mjs`: 41 verified, 0 pending, 0 errors; five poster originals and 35 delivery files checked. No optimization ran.
- All final new-section captures: zero console/page errors, failed/HTTP-error requests, external/font-CDN requests or MP4 requests. Necessary optimized images, original SVGs and local fonts decoded correctly; per-pass JSON records include actual URLs.
- No `<video>` elements, animations, added interactive controls, external credit/logo links or additional narrative sections. No new package, GSAP/ScrollTrigger, tablet/mobile composition or Stage 1C work.

Static Stage 1B.6 is complete with the Footer filter/font limits and screenshot-context limits explicitly measured. Stage 1C — Full Desktop Longread Integration & QA remains the next separately requested stage.
