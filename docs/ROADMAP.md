# SUBTALE — execution roadmap (frozen outline)

Work atomically. Current status: Stage 0.2 completed — 41 Figma raster masters, optimized delivery, 16 SVGs, 4 WOFF2 fonts, 5/5 films and posters in GitHub. Stage 0.3 documentation prepared (2026-10-24): [INTERACTION_SPEC.md](INTERACTION_SPEC.md), [MOTION_SPEC.md](MOTION_SPEC.md). Recommendations and decisions D01–D11 await user approval; the approval gate is not complete. Browser video playback, captions/transcripts and scene/audio checks remain integration QA items. Next requested stage after agreement: **Stage 1A only**, not automatic implementation.

| Stage | Work | Gate |
|---|---|---|
| −1 | Clean GitHub repository and Codex skills | Done: independent history, repository rules, pinned skill set |
| 0.1 | Figma page/frame inventory and preliminary tokens | 19 frames mapped to 10 narrative sections, source IDs recorded |
| 0.2 | Export/verify necessary graphic, video, font assets | All necessary sources exported/deduplicated and alpha/dimensions verified |
| 0.3 | Section contracts, state transitions, and motion spec | Draft complete; user approval of UX/motion and open D-decisions pending |
| 1A | Bootstrap Vite + React + TypeScript + style tokens (upon approval) | Static shell builds |
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
