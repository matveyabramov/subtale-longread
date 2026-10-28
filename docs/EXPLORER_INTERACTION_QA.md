# Stage 3.4A — Blind Zones Explorer

2026-10-28. **Awaiting Review.**

## Changes

- Four categories now select their existing artwork, description and lower question instantly. Default: Idiom A.
- Section-local React state retains the category and a separate A/B value for each category until reload. No storage, URL changes, scroll commands or A/B trigger. Initial endpoint props remain available to isolated QA fixtures.
- Manual vertical tabs: Up/Down wrap focus; Home/End move to the first/last tab; Enter/Space select. Click/touch selects. Tab exits into the panel's question; returning restores the selected tab as the tab stop. Tabs expose names, `aria-selected`, `aria-controls`, and visible keyboard focus. The active panel has a category label and one accessible artwork description; decorative layers remain hidden from assistive technology.
- Selected/hovered cards use yellow with dark text. Inactive cards retain their existing blue fill. Transparent borders preserve the original box sizes; no permanent white outline. Hover only applies to a fine pointer.
- Decorative artwork cannot intercept pointer events over the lower question. Questions remain placeholders for the separate pop-up stage and never change A/B.
- Existing artwork, crops, responsive slots and editorial text are unchanged. No animations, dependencies, or changes to Hero, Experiment or contents.

## Figma review

Read-only session `64d6e5ef-f3f2-4ea2-b8d9-2066a8ae3560`, file `H4HI00uGY2UOxpcfHogUat`, page `0:1`. Scoped inspection of all 32 Explorer frames (text and image bounds), with design context/screenshots for 1920 Idiom A, 1440 Pun A, 768 Double Meaning A and 390 Reference A. No Figma edits.

| Width | Idiom A/B | Pun A/B | Double Meaning A/B | Reference A/B |
| --- | --- | --- | --- | --- |
| 1920 | 10:1431 / 10:1596 | 10:1495 / 10:1981 | 10:1528 / 10:2017 | 10:1560 / 10:2049 |
| 1440 | 72:3250 / 72:3507 | 72:3662 / 72:3719 | 72:3811 / 72:3844 | 72:4118 / 72:4151 |
| 768 | 76:8509 / 76:8657 | 76:8767 / 76:8816 | 76:8878 / 76:8903 | 76:8934 / 76:8955 |
| 390 | 80:13930 / 80:14073 | 80:14351 / 80:14405 | 80:14430 / 80:14455 | 81:14508 / 81:14541 |

The user's Stage 3.4A instruction to remove permanent white outlines takes precedence over the strokes in Figma. Existing page-level reading insets and typography differences were preserved.

## Validation

- `npm run build`: passed, including asset generation and TypeScript.
- Chrome/Playwright: all four categories at 1920×1080, 1440×900, 768×1024 and 390×844; touch emulation at 768/390. Images decode, correct category copy/question/artwork, exactly one selected tab and accessible artwork, panel linkage, keyboard focus/manual activation, hover without selection, no horizontal overflow, unchanged URL/scroll/section height, scroll-away/return and reload reset. No runtime errors.
- All 16 A endpoints match the pre-change card/artwork/canvas/question geometry within 0.03 CSS px, measured relative to the canvas to exclude existing page-level insets. Representative screenshots at each width visually inspected.
- Isolated fixtures: seed B independently in each category, select another category (A), then return to the seeded category (B). All four pass without exposing an A/B control in the application.
- `git diff --check`: passed.
- Safari/WebKit: **Not reviewed**; browser executable unavailable. No browser/dependency installs. Physical mobile and screen-reader testing: **Not reviewed**.

Repeat browser checks against `npm run dev`:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node tests/explorer-interaction.mjs
```

`QA_ORIGIN` overrides localhost:5173. `QA_SCREENSHOTS` optionally saves screenshots. `QA_BASELINE` optionally compares a pre-change geometry capture; `QA_BROWSER=webkit` requires an existing WebKit installation.

No stage blocker. Next: review Stage 3.4A; pop-ups and A/B controls remain separate stages.
