# SUBTALE — execution roadmap (frozen outline)

Work atomically. Stage 0.2 completed: 41 Figma raster masters, optimized delivery, 16 SVGs, 4 WOFF2 fonts, 5/5 films and posters. **Stage 0.3 Approved (2026-10-24)**: D01–D11 closed in [INTERACTION_SPEC.md](INTERACTION_SPEC.md); [MOTION_SPEC.md](MOTION_SPEC.md) records approved baseline motion. Figma editorial content, including «98%», is final; only TT Bluescreens Trial / IBM Plex Mono. New UI visual details are reviewed per section. Stage 1A is now explicitly requested; Stage 1B does not start automatically. Captions/transcripts and video playback/audio QA belong to video implementation.

| Stage | Work | Gate |
|---|---|---|
| −1 | Clean GitHub repository and Codex skills | Done: independent history, repository rules, pinned skill set |
| 0.1 | Figma page/frame inventory and preliminary tokens | 19 frames mapped to 10 narrative sections, source IDs recorded |
| 0.2 | Export/verify necessary graphic, video, font assets | All necessary sources exported/deduplicated and alpha/dimensions verified |
| 0.3 | Section contracts, state transitions, and motion spec | Approved: D01–D11; UI visual details reviewed during section implementation |
| 1A | Bootstrap Vite + React + TypeScript + style tokens (requested) | Static shell builds |
| 1B | Build 1920px frames individually: Hero → experiment → content → explorer → movies → ending | Each screen screenshot compared with Figma; no complex motion |
| 1C | Integrate all desktop sections in story order | Full 1920 longread; explorer variants never become extra sections; experiment flow follows approved D02 |
| 2 | Responsive desktop 1440 (plus 1600 and 1280 checks) | Layout reflows appropriately without 1440 Figma mockup |
| 3 | Functional interactions without elaborate motion | Keyboard, touch, skip, reset, modal and media states work |
| 4 | Motion pass A (function), B (polish) | Confirmed motion map, replay/interruptible, reduced-motion fallback |
| 5 | Desktop QA | Visual + functional + performance + 1920 regression |
| 6 | Tablet 1024→768 | Reviewed content-driven rearrangements and touch conversions |
| 7 | Mobile 390 baseline, then 320/360/430 | Story remains readable; only nonessential motion simplified |
| 8 | Cross-browser QA, assets, deployment | Tested release |

No need to design new responsive frames in Figma unless a specific composition cannot be resolved in browser and needs user art direction. For reduced context usage: load relevant Figma node and skill only for the assigned ticket, not full file every turn.
