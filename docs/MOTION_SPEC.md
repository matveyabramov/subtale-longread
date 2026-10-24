# SUBTALE — preliminary motion / interaction map

**Proposed behaviors**, not verified Figma prototypes. Stage 0.3 must reconcile these with approved editorial intent and available layered assets before implementation.

| Area | Figma nodes | Proposed trigger/state | First code pass |
|---|---|---|---|
| Hero | `10:472` | CTA to start experiment; optional hint and skip. Ensure user cannot get stuck. | Static CTA + working state controls |
| Experiment | `10:718`, `10:730`, `10:760` | Three-stage instructions → dot/cross → result; help overlay and skip. | Semantic state machine, keyboard/focus, no scroll trapping without an exit |
| Emptiness | `10:838` | Reconstructed/blocked perception through tiles, possible scroll reveal | Keep layers separate |
| Elephant | `10:917` | Four conceptual layers revealed in reading order | Static four levels, then motion |
| Idiom | `10:1431`, `10:1596` | Ice/telephone before ↔ after | Click/hover/touch, replay, reduced motion |
| Pun | `10:1495`, `10:1981` | Bicycle before ↔ fallen/wordplay | Click/hover/touch, replay, reduced motion |
| Double meaning | `10:1528`, `10:2017` | Eye image / two readings | Click/hover/touch with visible alternative |
| Cultural reference | `10:1560`, `10:2049` | Snowflake → throne | Click/hover/touch, replay, reduced motion |
| Movies | `10:1794` | Five scene cards with contextual reveal and/or video preview | Video state ownership; pause offscreen, hidden tab, reduced-motion handling |
| Vocab | `10:966` | Scroll-triggered statement emphasis if approved | Static first |
| Blind-spot-scene | `10:997` | Three lines pass through central blind area with information losses | Preserve line and circle layers |
| What-to-do | `10:1272` | Two-part viewing guidance; likely minimal motion | Static first |
| Footer | `10:1016` | Final emphasis/credits reveal only if approved | Static first |

## For every animation ticket

Document: trigger; default state; active state; exact Figma state IDs; assets; duration/easing; replay/reset; interruption; keyboard/touch equivalents; preferred reduced-motion alternative; and scope of Playwright testing. Never treat an animation skill as authority to replace approved narrative or design.
