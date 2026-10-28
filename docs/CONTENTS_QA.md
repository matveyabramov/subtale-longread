# Stage 3.1 — Оглавление

Status: **Awaiting Review** — 2026-10-28.

## Changes and scope

- New fullscreen nonmodal disclosure, opened by the existing Hero contents button. The only Hero CSS change raises that button above the transparent tablet headline area so it receives pointer input; its geometry is unchanged.
- Blue `#012ED7`, existing mosaic texture at 0.23 opacity, existing SUBTALE pixel mark, TT Bluescreens Trial headings without stroke, IBM Plex Mono numbering/service labels. Current section uses yellow and a small square; hover/focus changes color without moving content. No animated transitions.
- Read-only reference: `../sp-longread/index.html`, navigation structure (ten ordered chapters, 00–09). No legacy UI/CSS copied. Labels use current SUBTALE section content; this composition implements the user's Stage 3.1 brief and is not attributed to an existing Figma menu frame.
- Escape/close/backdrop return focus to the trigger. A chapter updates the hash/history, scrolls to its existing section and focuses its labelled heading. Modified link clicks retain browser behavior. Tab/Shift+Tab can leave the disclosure and close it; no focus trap, inert background, modal semantics or document scroll lock.
- Current chapter follows section positions at 30% of the viewport; scroll/resize listeners exist only while open and are cleaned up on close.
- Desktop/tablet retain the large vertical editorial list. Mobile uses smaller type and wraps long titles. Header and footer stay visible while the list scrolls when height is insufficient.

| Number | Anchor | Label |
|---|---|---|
| 00 | `#hero` | Начало |
| 01 | `#experiment` | Закрой левый глаз |
| 02 | `#emptiness` | Мозг не любит пустоту |
| 03 | `#elephant` | Смысл — не сумма слов |
| 04 | `#blind-zones` | Слепые зоны восприятия |
| 05 | `#movies` | Ты слышишь фразу |
| 06 | `#vocab` | Можно знать почти все слова |
| 07 | `#blind-spot-scene` | Сцена сама выдаёт |
| 08 | `#what-to-do` | Отмечай странные места |
| 09 | `#footer` | Кажется понятным |

## Checks performed

Production build tested in headless Google Chrome using the already available Playwright runtime; no dependencies installed.

- `npm run build`: passed (asset catalogue, TypeScript, Vite production build).
- 390×844, 768×1024, 1440×900, 1920×1080: all ten links present, no panel/text horizontal overflow; screenshots visually inspected.
- 390×480: internal list scroll works, final chapter reachable, no panel overflow.
- Open button, close button, Escape, outside-list click, initial close-button focus, Escape return focus, Shift+Tab exit: passed.
- All ten anchor selections close the menu, set the correct hash and focus the actual section heading: passed.
- Underlying page can scroll with the menu open; current marker updates to Movies: passed. Body overflow is not changed.
- Emulated 390px touch with reduced-motion preference: tap to open and select Experiment passed.
- Browser runtime errors: none. Legacy repository unchanged. No other section content/CSS or interactions changed; no Hero scroll gate implemented.

Evidence: [screenshots and measurements](../artifacts/contents-qa/). Real-device touch, VoiceOver/other screen readers and cross-browser QA were not performed.

Next: user review of Stage 3.1. Do not proceed to Hero automatically.
