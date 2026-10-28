# Stage 3.4B — Idiom Visual Fix

2026-10-28. **Awaiting Review.**

- Both Idiom states now render all eight ice fragments through `idiomA-*` responsive slots. Their position, size, image crop and masks are identical in A/B. Archived `idiomB-*` measurements remain unchanged; they no longer drive rendered ice. The stable reveal hit area and all input handlers are unchanged.
- B layer order within the common canvas: upper-left ice `0` → banner `5` → phone `6` → seven foreground ice fragments `7–13`. Phone and heading wrappers share the canvas stacking context on all four layouts; no wrapper traps the phone beneath the banner. State A is unchanged.
- Phone position, dimensions and source image are unchanged. Other category components, states, artwork geometry, image sources, crop/masks and layer order match the pre-fix capture.
- No animation, text change, dependency install or edit to Hero/Experiment/contents.

## Checks

- `npm run build`: passed, including TypeScript and asset generation.
- `tests/idiom-visual.mjs`, Chrome: A→B→A at 1920×1080, 1440×900, 768×1024 and 390×844. Mouse hover/leave on desktop; touch taps at 768/390. All eight ice rectangles, image rectangles, crop values and masks match exactly across A/B; returning to A restores the original state.
- Captured all 32 artwork endpoints before editing. Compared the other three categories against that capture at both states and all widths: unchanged. Idiom A and the B phone retain their original geometry. Verified shared ancestor stacking context and the required z-order at every width. No runtime errors.
- All four B screenshots visually inspected. `git diff --check`: passed.
- Physical devices, Safari/WebKit and screen readers: Not reviewed.

## Geometric limitation

The phone visibly overlaps the yellow banner at 1440px. At 1920px its image box intersects the banner, but its transparent top margin leaves the visible handset below it. At 768/390px the original phone position is below the heading. Raising z-index establishes the required hierarchy on all widths, but cannot create visible overlap where the opaque image and banner do not intersect. Phone position, size and asset were preserved as requested; creating that overlap at the other widths requires a separate geometry/asset decision.

Run against `npm run dev -- --host 127.0.0.1 --port 5186`:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node tests/idiom-visual.mjs
```

`QA_ORIGIN` selects another server. `QA_CAPTURE` saves a pre-change snapshot; `QA_BASELINE` compares against it. `QA_SCREENSHOTS` optionally saves B screenshots.
