# SUBTALE — Stage 1A foundation

Completed 2026-10-24. Stage 0.3 is Approved; approval commit `a836493` precedes the separate technical commit. No screen composition, animation, editorial text change, Figma write or asset optimization belongs to this stage.

## Stack and execution

| Package | Installed version | Role |
|---|---|---|
| react / react-dom | 19.3.1 | Runtime rendering |
| vite | 8.3.5 | Local development / production bundle |
| @vitejs/plugin-react | 6.1.2 | React integration / development refresh |
| typescript | 7.0.2 | Strict compile-time checks |
| @types/react / @types/react-dom | 19.3.0 | React types |
| @types/node | 26.6.5 | Vite configuration types |

Exact direct versions and transitive resolution are committed in package.json/package-lock.json. Tested Node 26.10.0 / npm 11.19.1; declared Node range `^22.12.0 || >=24.0.0`. Stack compatibility was checked against the installed package metadata and official [Vite setup](https://vite.dev/guide/) / [React build-tool guidance](https://react.dev/learn/build-a-react-app-from-scratch). No router, store, animation library, UI kit, Tailwind, GSAP, ScrollTrigger or browser-test dependency is installed in the project.

TypeScript: strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, unused local/parameter checks, no fallthrough; bundler module resolution, ES2022, react-jsx, no emit. CSS Modules are provided by Vite without an extra package. Native CSS supplies local font faces, tokens, reset and base styles.

## Component boundaries

`src/main.tsx` mounts `App` in StrictMode. `src/app/App.tsx` is the only composition owner; its CSS Module renders temporary technical labels. A visible technical heading distinguishes this shell from the designed site.

| Reading order | Component / directory | Boundary prepared |
|---|---|---|
| 1 | HeroSection / hero | Section anchor + focusable heading; no CTA/hint design yet |
| 2 | ExperimentSection / experiment | Three in-flow nested sections; outcome/help types, no state machine |
| 3 | EmptinessSection / emptiness | Section anchor + heading |
| 4 | ElephantSection / elephant | Section anchor + heading |
| 5 | BlindZonesExplorer / blind-zones | One section, four category IDs with A/B frame mappings and per-category state type |
| 6 | MoviesSection / movies | One section, five ordered case/media mappings; playback and coordinator types |
| 7 | VocabSection / vocab | Section anchor + heading; approved number/copy untouched |
| 8 | BlindSpotSceneSection / blind-spot-scene | Section anchor + heading |
| 9 | WhatToDoSection / what-to-do | Section anchor + heading |
| 10 | FooterSection / footer | Semantic footer, anchor + heading outside main |

Experiment anchors: `#experiment-instructions`, `#experiment-target`, `#experiment-result`; `#experiment` addresses the whole narrative section. All three screens stay in natural document order. Explorer variants do not create extra sections. English labels in the shell are technical component names, not invented editorial content.

`src/shared/navigation.ts` defines reading-anchor/href types. Headings have tabindex=-1 for later explicit-navigation focus handling; the native skip link targets focusable main. No custom hash/scroll manager, focus trap, modal or contents interaction is implemented prematurely.

`useReducedMotion` uses matchMedia/useSyncExternalStore with subscription cleanup; App exposes the result as a diagnostic data attribute. CSS overrides motion durations to zero when requested. No animation/transition consumes these tokens yet. Experiment/explorer/video models define future local responsibilities; no reducers, autoplay, media elements or global store are created.

## Tokens and fonts

Evidence and deferred values are listed in [DESIGN_TOKENS.md](DESIGN_TOKENS.md). A targeted ten-text-node Figma read supplied measured sizes, line-heights and tracking. Global tokens contain only observed visual values, the neutral base layer and approved motion baseline. Container references do not impose full-height screens; unverified global gaps, reading widths, UI radii and positive z-index levels are deliberately undefined.

Four existing WOFF2s are connected through local @font-face rules at weights 700/800 and 500/600. They are not re-encoded or replaced. No external CDN, Google Fonts or @import is used. An empty data favicon avoids a browser request for a nonexistent favicon; it introduces no artwork.

**Historical Stage 1A issue — IBM Latin coverage (resolved in Stage 1B.1; see FONT_ASSETS.md):** Chrome's actual rendered-font inspection (CDP CSS.getPlatformFontsForNode) shows that the control string `SUBTALE` uses the browser's generic monospace fallback for the existing Cyrillic IBM Plex Mono subsets; `Пример` uses the local custom IBM face. This is a glyph-coverage issue, not a path/loading failure or a choice of a new font family. Before English IBM-copy fidelity is accepted in Stage 1B, supply/approve the matching local Latin coverage for the same approved family and weights in a separately scoped asset task. Existing font files and editorial texts remain unchanged; no CDN workaround or automatic download was introduced.

## Delivery assets

`npm run assets:generate` reads FIGMA_ASSET_MAP.json and ASSET_DELIVERY.json at generation time, validates their overlapping optimizedPath entries and local file existence, and writes `src/assets/generated.ts`. That module contains strings only:

- imageAssets: 30 named image delivery paths;
- imageAssetsByHash: the same paths indexed by Figma imageHash;
- posterAssets: five poster paths from ASSET_DELIVERY optimizedPath;
- vectorAssets: 16 existing public SVGs;
- videoAssets: five existing public MP4s (these unchanged resources do not have optimizedPath entries).

No localPath/sourcePath fallback. No original registry or source archive is imported into browser code. URLs respect Vite BASE_URL; fonts are processed as local public CSS URLs. Exporting a URL does not render/preload the media or activate a hidden Figma fill. Movie mappings refer to five URLs/posters but mount no video elements in this shell.

`npm run assets:check` checks catalogue freshness and runs the pre-existing checker; `npm run build` regenerates the catalogue, typechecks, then builds. Neither command optimizes assets. Vite copies public delivery files; source-assets is outside public and absent from dist.

## Verification performed

| Check | Result |
|---|---|
| Initial Git check / fetch | main clean and 0 ahead / 0 behind origin/main before changes; no destructive Git commands |
| Dependency installation | Passed, exact package versions locked |
| npm run typecheck | Passed |
| npm run build | Passed; 35 modules, JS 227.82 kB / 70.47 kB gzip, CSS 3.31 kB / 1.07 kB gzip (code bundle, not total media weight) |
| Vite development launch | Passed at 127.0.0.1:5173 |
| Production preview launch | Passed at 127.0.0.1:4173 |
| npm run assets:check | Catalogue verified; existing checker: 41 verified, 0 pending, 0 errors; five poster originals / 35 raster deliveries |
| Local WOFF2 paths | Four paths exist and have wOF2 headers; all four faces load successfully in dev and production Chrome |
| Browser structure, 1920×1080 | Exactly ten narrative boundaries, correct order, one explorer, five mapped movies; three experiment anchors in increasing document order |
| Basic navigation | Native skip link focuses main; direct experiment hash survives load |
| Reduced motion | Live preference toggle updates React diagnostic attribute and zero-duration CSS tokens in dev and production |
| Browser errors/network | No page errors, console errors, failed requests or external requests in final dev/production runs; no MP4 loading |
| Glyph coverage | Cyrillic IBM rendering and Latin fallback identified as the open issue above |
| Source/delivery preservation | SHA256 comparison: all 111 files under public/assets and source-assets unchanged; Stage 0.2 measured appendix/registries unchanged |
| Visual inspection | Technical scaffold screenshot inspected at 1920px; no Figma visual-match claim |

Browser checks used the existing bundled Playwright with local Chrome, not an installed project dependency. Temporary scripts/screenshots stayed outside the repository. This is foundation smoke QA, not full keyboard, screen-reader, responsive, video-playback or motion QA.

## Remaining work / stage boundary

No remaining build/startup blocker. Latin font coverage was resolved in the separately scoped Stage 1B.1 font commit (FONT_ASSETS.md); the preceding QA table preserves Stage 1A results. Section-specific typography/container/radius/layer values and new UI-state visuals are checked during Stage 1B implementation. Captions/transcripts and media behavior remain Stage 3 work under D10. Baseline motion is reserved for Stage 4.

Next stage, only upon request: Stage 1B static Desktop 1920 sections, starting with Hero. No pixel layout, responsive composition, interaction state machine or animation has started here. Locate the separate Stage 1A commit with `git log -1 --format=%h -- docs/FOUNDATION.md`.
