# SUBTALE — execution roadmap (frozen outline)

Work atomically. Stage 0.2 completed (historical asset snapshot: 41 Figma raster masters, 16 SVGs, four WOFF2s, 5/5 films and posters). Stage 0.3 **Approved**: D01–D11 in INTERACTION_SPEC; editorial Figma content is final. Stage 1A **Completed**: see FOUNDATION.md. Stages 1B.1 and 1B.2 **Completed**: [Hero QA](HERO_DESKTOP_QA.md), [Experiment QA](EXPERIMENT_DESKTOP_QA.md). Stage 1B.3 **Completed — Emptiness + Elephant Desktop 1920**: three full production comparisons per section, 1920×1080 / 1920×2187; [EMPTINESS_ELEPHANT_DESKTOP_QA.md](EMPTINESS_ELEPHANT_DESKTOP_QA.md) records measured rendering differences and pixel-identical Hero/Experiment regression. Matching local IBM Latin subsets were added in separate commit `1ef5ddb` (six local WOFF2s now); see FONT_ASSETS.md. The other six section components remain placeholders and unchanged. Next scoped section: Blind Zones Explorer, only on a separate stage request. New UI visual details, later sections, interactions and motion require their own stage requests.

| Stage | Work | Gate |
|---|---|---|
| −1 | Clean GitHub repository and Codex skills | Done: independent history, repository rules, pinned skill set |
| 0.1 | Figma page/frame inventory and preliminary tokens | 19 frames mapped to 10 narrative sections, source IDs recorded |
| 0.2 | Export/verify necessary graphic, video, font assets | All necessary sources exported/deduplicated and alpha/dimensions verified |
| 0.3 | Section contracts, state transitions, and motion spec | Approved: D01–D11; UI visual details reviewed during section implementation |
| 1A | Bootstrap Vite + React + TypeScript + style tokens | Done: strict typecheck, production build, dev/preview smoke QA; Latin glyph coverage tracked in FOUNDATION.md |
| 1B | Build 1920px frames individually: Hero → experiment → content → explorer → movies → ending | Each screen screenshot compared with Figma; no complex motion |
| 1B.1 | Hero Desktop 1920 + matching IBM Latin coverage | Done: typecheck/build/assets + dev/production DPR1 visual QA; explicit font-family exceptions documented |
| 1B.2 | Experiment Instructions → Target → Result, Desktop 1920 | Done: native flow/anchors, static cross/dot, visible source help panel; two production DPR1 comparisons per frame, typecheck/build/assets, Hero regression passed |
| 1B.3 | Emptiness + Elephant, Desktop 1920 | Done: separate collaged layers, exact crops/matrices, four static levels, full 2187px height; three production DPR1 comparisons, typecheck/build/assets, Hero + Experiment regression passed |
| 1C | Integrate all desktop sections in story order | Full 1920 longread; explorer variants never become extra sections; experiment flow follows approved D02 |
| 2 | Responsive desktop 1440 (plus 1600 and 1280 checks) | Layout reflows appropriately without 1440 Figma mockup |
| 3 | Functional interactions without elaborate motion | Keyboard, touch, skip, reset, modal and media states work |
| 4 | Motion pass A (function), B (polish) | Confirmed motion map, replay/interruptible, reduced-motion fallback |
| 5 | Desktop QA | Visual + functional + performance + 1920 regression |
| 6 | Tablet 1024→768 | Reviewed content-driven rearrangements and touch conversions |
| 7 | Mobile 390 baseline, then 320/360/430 | Story remains readable; only nonessential motion simplified |
| 8 | Cross-browser QA, assets, deployment | Tested release |

No need to design new responsive frames in Figma unless a specific composition cannot be resolved in browser and needs user art direction. For reduced context usage: load relevant Figma node and skill only for the assigned ticket, not full file every turn.
