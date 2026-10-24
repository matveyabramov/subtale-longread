# SUBTALE

Interactive editorial longread about hidden meanings in English-language film and series dialogue. This is the new implementation; the approved Figma Desktop 1920 is the visual source of truth.

## Status

Stage 0.3 **Approved**. Stage 1A provides a technical React shell, local fonts, scoped design tokens and delivery-asset URLs. The visible screen is a labelled technical structure, not a designed longread. Stage 1B screen implementation has not started. Existing Cyrillic IBM Plex Mono files load; matching Latin coverage remains a documented technical issue before English-copy visual QA.

## Run locally

Node.js `^22.12.0 || >=24.0.0`, npm; development was checked with Node 26.10.0 / npm 11.19.1. Versions are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

Vite listens on localhost. To verify or preview a production build:

```sh
npm run typecheck
npm run build
npm run preview
npm run assets:check
```

`npm run build` refreshes the small runtime URL catalogue, typechecks and builds. `npm run assets:check` verifies the catalogue and runs the existing asset checker. No image optimization runs as part of these commands.

## Structure

- `src/app/`: ordered longread shell and temporary CSS Module for technical labels.
- `src/sections/`: ten section components; Experiment contains three independently anchored screens in normal flow. Explorer stays one section.
- `src/sections/{experiment,blind-zones,movies}/model.ts`: identifiers, frame/media mappings and future state types; no reducers or playback logic yet.
- `src/shared/`: reading-anchor types and a reduced-motion subscription.
- `src/styles/`: local font faces, verified tokens, reset and base styles.
- `src/assets/generated.ts`: public delivery URLs, generated from the asset registries. No runtime source-archive imports.
- `scripts/generate-runtime-assets.mjs`: validates current optimized paths and public SVG/video paths, then generates the catalogue.

Use named assets, for example `imageAssets['hero-film-cutout']`, `imageAssetsByHash[hash]`, `posterAssets['airplane-surely']`, `videoAssets['airplane-surely']` or `vectorAssets['hero-cta-arrow']`. Import from `src/assets/generated.ts`; URLs respect Vite's base path. Catalogue entries do not preload media or activate hidden fills.

Scope, evidence and verification: [FOUNDATION.md](docs/FOUNDATION.md), [DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md), [ROADMAP.md](docs/ROADMAP.md). Approved behavior: [INTERACTION_SPEC.md](docs/INTERACTION_SPEC.md), [MOTION_SPEC.md](docs/MOTION_SPEC.md).
