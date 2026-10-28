# Stage 3.3 — Experiment

Status: **Awaiting Review**, 2026-10-28. Explorer work has not started.

- Instructions, Target and Result remain consecutive document sections. Each has a `100dvh` minimum with `100vh` fallback and safe-area spacing. Content determines height when a viewport is too short; there is no clipping, internal screen scroll, snapping or automatic progression. Vertical spacing compresses before readable type sizes. The 1920px stimulus/title slots are retained where height permits.
- Existing links navigate immediately and focus the destination heading (Target focuses its named section). Skip/attempt state persists in component memory across ordinary scroll and Back. No replay control or additional editorial copy was added.
- Help uses the existing blue/white Figma panel and a service close control. Native dialog supplies modal semantics/focus containment; Escape/close restores trigger focus, skip focuses Emptiness. Hash/Back/pagehide/unmount clean up the dialog and its temporary document scroll lock. Classic-scrollbar width is compensated when locking, preserving stimulus positions.
- Cross/dot DOM, paths and opacity are static; there are no animations, timers, success detection or programmed disappearance. CSS adapts the composition to a resized viewport without changing experiment state.

Figma file `H4HI00uGY2UOxpcfHogUat`, session `df3265e0-e0f2-472e-b6f1-c5113be0b1fb`; help design-context/screenshots read only at `85:1272` (1920), `85:1260` (1440), `85:790` (768), `79:12811` (390). Existing local texture/arrow assets, fonts and editorial content are reused. The tablet panel wraps its source text within the frame instead of reproducing source overflow.

Checks: production Chrome at 390×844/724/664/600/568/480, 375×667/553, 768×1024/800, 1440×900/810 and 1920×1080/900. All three sections equal the viewport height with no content overflow on these sizes. At 390×320, instructions/result expand naturally and Target reserves space before its controls. Help can scroll internally at 240px viewport height.

Verified all transition/skip links, keyboard Escape and explicit close, focus restoration/target focus, modal stimulus geometry, reduced-motion invariance, Back/hash cleanup, touch help, Hero gate and contents regression. Live height sequence 844→724→664→600→568→724→844 passed without reload. Scoped safe-area values equivalent to 47px top/34px bottom also retained one-screen height at 390×568–844. No browser runtime errors. `npm run build` passed.

Limit: real iPhone/Safari, dynamic Safari browser chrome and assistive technology were not available. Height/safe-area checks are Chrome emulation; the local Playwright WebKit runtime is absent. No dependencies were installed.
