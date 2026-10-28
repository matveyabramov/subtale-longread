# SUBTALE — execution roadmap (frozen outline)

## Current stage — 2026-10-28

**Stage 3.3 — Experiment: Awaiting Review.** Three sequential viewport-height screens, explicit transitions/skip and accessible Figma help dialog implemented. See [EXPERIMENT_INTERACTION.md](EXPERIMENT_INTERACTION.md). Hero gate and contents behavior are retained. This status supersedes historical “Next” markers below. Do not start Explorer interactions before a separate request.

Work atomically. Stage 0.2 completed (historical asset snapshot: 41 Figma raster masters, 16 SVGs, four WOFF2s, 5/5 films and posters). Stage 0.3 **Approved**: D01–D11 in INTERACTION_SPEC; editorial Figma content is final. Stage 1A **Completed**: see FOUNDATION.md. Stages 1B.1 and 1B.2 **Completed**: [Hero QA](HERO_DESKTOP_QA.md), [Experiment QA](EXPERIMENT_DESKTOP_QA.md). Stage 1B.3 **Completed — Emptiness + Elephant Desktop 1920**: three full production comparisons per section, 1920×1080 / 1920×2187; [EMPTINESS_ELEPHANT_DESKTOP_QA.md](EMPTINESS_ELEPHANT_DESKTOP_QA.md) records measured rendering differences and pixel-identical Hero/Experiment regression. Matching local IBM Latin subsets were added in separate commit `1ef5ddb` (six local WOFF2s now); see FONT_ASSETS.md. Stage 1B.4 **Completed — Blind Zones Explorer Desktop 1920**: one section, eight static A/B endpoints, separate production QA fixtures, three production comparisons per endpoint; [BLIND_ZONES_DESKTOP_QA.md](BLIND_ZONES_DESKTOP_QA.md) records geometry, masks, paint order, rendered fonts and explicit raster limits. Hero, all three Experiment screens and Emptiness regress pixel-identically; Elephant differs only by 63 RGB samples at 1/255 with unchanged source and geometry. Stage 1B.5 **Completed — Movies Desktop 1920×1899**: five original text scenes in one section, three production passes at 1920×1080/DPR1 with full-height captures; [MOVIES_DESKTOP_QA.md](MOVIES_DESKTOP_QA.md) records all 127 source bounds, rendered fonts, raster limits, prior-section/Explorer regression and the Stage 3 inline-media slot approval item. No poster/player was invented; no MP4 request occurs. Stage 1B.6 **Completed — Final Four Sections Desktop 1920**: Vocab, Blind-spot-scene, What-to-do and full 1334px Footer; three production passes per frame, 252 measured bounds, actual-font checks and regression of prior compositions including eight Explorer states. [FINAL_SECTIONS_DESKTOP_QA.md](FINAL_SECTIONS_DESKTOP_QA.md) records the approximate Footer image22 filter, the approved-family treatment of its source Inter label, and measured capture/raster limits. All ten section components now have static Desktop 1920 compositions. Stage 1C **Completed — Minimal Integration**: source inspection confirms the ten-section order without active Stage 1A scaffold wrappers or added spacing; no Desktop composition was changed. `npm run dev` uses Vite on `0.0.0.0:5173` with its existing HMR, for localhost and same-Wi-Fi LAN access; no public hosting or tunnel. No separate visual QA was performed in this stage. Next: **Stage 2.1 — Hero Responsive**, only on a separate request. New UI visual details, later sections, interactions and motion require their own stage requests.

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
| 1B.4 | Blind Zones Explorer: four categories × A/B, Desktop 1920 | Done: eight static compositions in one section, independent layers, exact crops/masks/matrices, isolated production fixtures; three DPR1 passes per endpoint, typecheck/build/assets and prior-section regression documented |
| 1B.5 | Movies, Desktop 1920×1899 | Done: five ordered static scenes, original text/tags/decoration, stable media identities without mounted players; three production passes, typecheck/build/assets and six prior compositions + eight Explorer endpoints regression documented |
| 1B.6 | Vocab, Blind-spot-scene, What-to-do, Footer Desktop 1920 | Done with documented Footer filter/font limits: original SVG/bitmaps, independent lines/pixels/clips, full Footer height; three production passes each, strict typecheck/build/assets, anchors/order and prior-section regression |
| 1C | Minimal integration and local-network Vite access | Done: ten sections already in correct order, no active scaffold wrappers; localhost/LAN port 5173, default HMR retained; Desktop unchanged, no separate QA |
| 2 | Section-by-section responsive implementation, **320–1920px** | Implement one section, user reviews and approves it, then begin the next; Desktop 1920 remains the approved visual reference |
| 2.1 | Hero Responsive, 320–1920px | Next; user approval required before Experiment |
| 2.2 | Experiment Responsive, 320–1920px | After Hero approval; retain three internal screens in natural flow |
| 2.3 | Emptiness Responsive, 320–1920px | After Experiment approval |
| 2.4 | Elephant Responsive, 320–1920px | After Emptiness approval |
| 2.5 | Blind Zones Explorer Responsive, 320–1920px | After Elephant approval; four categories × A/B remain one section |
| 2.6 | Movies Responsive, 320–1920px | After Explorer approval |
| 2.7 | Vocab Responsive, 320–1920px | After Movies approval |
| 2.8 | Blind-spot-scene Responsive, 320–1920px | After Vocab approval |
| 2.9 | What-to-do Responsive, 320–1920px | After Blind-spot-scene approval |
| 2.10 | Footer Responsive, 320–1920px | After What-to-do approval; user approval closes section-by-section Stage 2 |
| 3 | Functional interactions without elaborate motion | Keyboard, touch, skip, reset, modal and media states work |
| 4 | Motion pass A (function), B (polish) | Confirmed motion map, replay/interruptible, reduced-motion fallback |
| 5 | Desktop QA | Visual + functional + performance + 1920 regression |
| 6 | Tablet QA, 768–1024px | Verify the responsive sections already implemented and individually approved in Stage 2 |
| 7 | Mobile QA, 320–767px | Verify the responsive sections already implemented and individually approved in Stage 2, including 320/360/390/430px |
| 8 | Cross-browser QA, assets, deployment | Tested release |

No need to design new responsive frames in Figma unless a specific composition cannot be resolved in browser and needs user art direction. For reduced context usage: load relevant Figma node and skill only for the assigned ticket, not full file every turn.
