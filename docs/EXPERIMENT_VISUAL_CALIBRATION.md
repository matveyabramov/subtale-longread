# Experiment Target — Visual Calibration

Status: **Awaiting Review**, 2026-10-28.

Scope: Target geometry and the obsolete phone rotation instruction only. Existing fullscreen portal, navigation, `100dvh`, safe-area handling, controls, help dialog, Result illustration and other sections are retained. No dependencies installed. Pre-existing uncommitted fullscreen/navigation changes were used for QA but excluded from this commit.

## Geometry

All values below are CSS pixels. Size means both the cross's square and the dot's diameter. The cross retains its original SVG paths/proportions and its previous rendered stroke thickness via `vector-effect: non-scaling-stroke`.

| Viewport | Previous size | Previous center offset (right, down) | New size | Stroke | New center offset (right, down) | Center distance |
| --- | --- | --- | --- | --- | --- | --- |
| 1920×1080 | 100 | 600, 0 | 75 | 10 | 528, 50 | 530.4 |
| 1440×810 | 80 | 455, 0 | 60 | 8 | 528, 50 | 530.4 |
| 768×1024 | 60 | 294, 0 | 45 | 6 | 480, 45 | 482.1 |
| 390×844 | 40 | 0, 238 | 30 | 4 | 324, 30.6 | 325.4 |
| Phone 844×390 | 60 | 324.6, 0 | 30 | 4 | 324, 30.6 | 325.4 |

Desktop is above 1100px; tablet is 600–1100px; phone is at most 600px wide, plus landscape up to 1000px wide / 600px high. Landscape preserves the **phone's** 25% reduction, rather than switching to tablet marker size. Desktop size preserves the original fluid sizing ×0.75 (45–75px); separation is fixed within each class. Below 390px width, phone separation is capped by available width (`100vw - 66px`) to prevent clipping. No uniform gap scaling is used.

## Calculation and limits

For an eye aligned with the cross, horizontal screen separation `s = viewing distance × tan(15.5°)`. The desired physical horizontal separations are approximately:

- Desktop 40–60cm: **111–166mm**.
- Tablet 30–45cm: **83–125mm**.
- Mobile 20–30cm: **55–83mm**.

The chosen CSS separations use explicit illustrative density assumptions, not a claimed conversion of CSS px to mm: desktop 528px at 96 CSS px/in ≈140mm → 50cm; tablet 480px at 5 CSS px/mm ≈96mm → 35cm; phone 324px at 5.7 CSS px/mm ≈57mm → 21cm. A narrow phone cannot always provide the upper part of the 20–30cm range. Actual panel size, OS scaling, browser zoom and individual anatomy affect the result; no physical calibration or successful disappearance is claimed. Existing help already instructs adjusting viewing distance.

The slight downward offset uses `dy / dx ≈ tan(1.5°) / tan(15.5°) ≈ 0.0944`, rounded on desktop/tablet. [Stanford Neuro-Ophthalmology](https://neuro-ophthalmology.stanford.edu/2018/12/neuro-ophthalmology-illustrated-chapter-3-visual-fields/) places the physiological blind spot about 15° temporally; [Clinical Methods, Visual Fields](https://www.ncbi.nlm.nih.gov/books/NBK220/) describes 12–17° temporally and 1.5° below horizontal. These support a starting geometry, not a medical measurement.

The dot is always to the viewer's right of the cross in portrait and either landscape rotation. The old mobile instruction “Переверни экран” was removed because rotating is optional. The pair is positioned independently of footer layout. Help, outcome changes and returning from Result cannot reflow it. Resize statically recenters the pair within the viewport and applies the appropriate breakpoint; it does not animate it. Size and separation remain constant across phone rotation and changes of phone viewport height. There are no A/B states, timers, dot-opacity changes, success detection or programmed disappearance.

## Verification

`npm run build` passed (asset generation, TypeScript, Vite). Chrome/Playwright on the production preview passed nine viewport cases: 390×844, 768×1024, 1440×810, 1920×1080, 844×390 at 90° and 270°, return to 390×844, and 390×724 / 390×664 browser-control heights. Checked measured rectangles, marker sizes, right/down offsets, viewport containment, CTA/Back/help-trigger clearance, fullscreen layer height, horizontal overflow and absence of animation/transition/transform/visibility changes. Rectangles remained identical after waiting, opening/closing help, reduced-motion preference changes and Target→Result→Target. No runtime errors. Portrait and landscape screenshots were visually inspected.

Evidence: [measurements](../artifacts/experiment-calibration/qa.json), [QA runner](../artifacts/experiment-calibration/qa.mjs). Runner uses an existing Playwright installation (`PLAYWRIGHT_PACKAGE_JSON` can point to its package.json) and installed Chrome; preview defaults to port 4173 (`QA_URL` overrides it). PNG captures are local review artifacts. Safari/WebKit and physical devices were unavailable; physical viewing comfort and physiological effect remain for review on real screens.
