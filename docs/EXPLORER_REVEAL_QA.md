# Stage 3.4B — Explorer Hover / Touch Reveal

2026-10-28. **Awaiting Review.**

## Changes

- Mouse hover over the artwork control shows B; leaving shows A. Mouse clicks do not add another toggle.
- Touch/pen taps and native Enter/Space toggle A/B in the existing per-category `stateByCategory`. Switching categories or scrolling away/back retains those values; reload clears them. Mouse previews are separate and do not overwrite stored touch/keyboard choices.
- One transparent native button per active illustration, with a stable name, `aria-pressed`, visual description, keyboard instructions and `focus-visible`. No visible toggle, animation or new dependency. Focus alone does not reveal B.
- Its stable hit rectangle combines both existing endpoint bounds, using the original artwork data and responsive interpolation. It sits below headings/cards/questions in the hit order. On stacked layouts it is clipped to the artwork region. Artwork remains decorative for pointer input, so replacement layers cannot cause hover flicker.
- Category selection, card colors/hover, lower questions, original artwork components/assets/crops/transforms/paint order and editorial copy are preserved. Existing Hero, Experiment and contents changes are excluded from this stage.
- INTERACTION_SPEC and MOTION_SPEC record the newly approved triggers and the current 0ms transitions. Stage 4 motion remains unimplemented.

## Checks

- `npm run build`: passed (asset generation, TypeScript, Vite).
- `tests/explorer-reveal.mjs`: passed in Chrome on 1920×1080, 1440×900, 768×1024 and 390×844. All four categories: hover/leave on desktop, mouse click without a second toggle, touch toggling, keyboard Enter/Space, visible focus, Tab access, correct `aria-pressed`, separate category memory, scroll-away/return, reload reset, unaffected category controls/questions, unchanged URL/scroll/section height and no overflow. Touch scroll cancellation checked with browser touch input at 768/390. All images decode; no runtime errors.
- All 32 A/B endpoint canvas/card/question/artwork rectangles exactly match the pre-change capture. Endpoint image components, sources, crop data and layer order were not edited. Representative desktop/mobile screenshots visually inspected.
- `tests/explorer-interaction.mjs`: Stage 3.4A category regression passed at all four widths, including manual tab activation and lower questions.
- `git diff --check`: passed.
- Physical touch devices, Safari/WebKit and screen readers: **Not reviewed**. Mobile checks use Chrome touch emulation; no browser installs.

Run against a local dev server (set `QA_ORIGIN` to its address):

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs QA_ORIGIN=http://127.0.0.1:5184 node tests/explorer-reveal.mjs
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs QA_ORIGIN=http://127.0.0.1:5184 node tests/explorer-interaction.mjs
```

`QA_SCREENSHOTS` optionally saves screenshots. `QA_BASELINE` in the reveal suite optionally compares the pre-change capture of all 32 endpoint geometries.

No stage blocker. Next: review Stage 3.4B. Pop-ups and Stage 4 animations remain separate work.
