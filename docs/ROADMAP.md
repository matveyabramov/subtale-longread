# SUBTALE — execution roadmap (frozen outline)

Work atomically. Current status: Stage 0.1 **structural Figma inventory complete**, Stage 0.2 onward not started.

| Stage | Work | Gate |
|---|---|---|
| −1 | Clean GitHub repository and Codex skills | Done: independent history, repository rules, pinned skill set |
| 0.1 | Figma page/frame inventory and preliminary tokens | 19 frames mapped to 10 narrative sections, source IDs recorded |
| 0.2 | Export/verify necessary graphic, video, font assets | Asset manifest finalized, source/rights/alpha/dimensions reviewed |
| 0.3 | Section contracts, state transitions, and motion spec | Every interaction has approved states/triggers and escape/replay behavior |
| 1A | Bootstrap Vite + React + TypeScript + style tokens (upon approval) | Static shell builds |
| 1B | Build 1920px frames individually: Hero → experiment → content → explorer → movies → ending | Each screen screenshot compared with Figma; no complex motion |
| 1C | Integrate all desktop sections in story order | Full 1920 longread; no accidental rendering of state variants as extra sections |
| 2 | Responsive desktop 1440 (plus 1600 and 1280 checks) | Layout reflows appropriately without 1440 Figma mockup |
| 3 | Functional interactions without elaborate motion | Keyboard, touch, skip, reset, modal and media states work |
| 4 | Motion pass A (function), B (polish) | Confirmed motion map, replay/interruptible, reduced-motion fallback |
| 5 | Desktop QA | Visual + functional + performance + 1920 regression |
| 6 | Tablet 1024→768 | Reviewed content-driven rearrangements and touch conversions |
| 7 | Mobile 390 baseline, then 320/360/430 | Story remains readable; only nonessential motion simplified |
| 8 | Cross-browser QA, assets, deployment | Tested release |

No need to design new responsive frames in Figma unless a specific composition cannot be resolved in browser and needs user art direction. For reduced context usage: load relevant Figma node and skill only for the assigned ticket, not full file every turn.
