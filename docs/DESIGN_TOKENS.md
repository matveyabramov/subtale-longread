# SUBTALE — design tokens (Stage 1A)

Status: **scoped values verified**, 2026-10-24. Runtime source: `src/styles/tokens.css`; local fonts: `src/styles/fonts.css`. Only TT Bluescreens Trial and IBM Plex Mono are approved. All Figma editorial content is final under D11; this document records rendering values, not editorial review.

Tokens are measured values with limited scope, not a newly invented global design scale. The Stage 1A technical scaffold uses a few of them to verify loading; it does not reproduce any screen or establish responsive layouts.

## Palette

| Token | Value | Evidence |
|---|---|---|
| `--color-blue` | `#012ED7` | FIGMA_AUDIT; repeated frame fills |
| `--color-yellow` | `#FED128` | FIGMA_AUDIT; display/art fills |
| `--color-ink` | `#0B0D0F` | FIGMA_AUDIT; dark frame/CTA fills |
| `--color-paper` | `#EEEEE7` | FIGMA_AUDIT |
| `--color-white` | `#FFFFFF` | VECTOR_ASSET_SOURCE: Experiment cross `10:733`/`10:734`; Blind-spot-scene line strokes |

White is an existing measured paint, not a new proposed colour. `--opacity-divider: 0.3` preserves the measured white divider opacity; it is not a universal opacity for text or textures.

## Typography

A read-only, **ten-node** Figma check filled the missing type metrics in Stage 1A, file `H4HI00uGY2UOxpcfHogUat`, session `aa9717d4-8ee6-43bb-a068-9cd3e5a41724`. No subtree/full-file audit or Figma edits. Float noise in percentage line-heights is normalized (80.000001% → 0.8; 110.000002% → 1.1; 120.000005% → 1.2).

| Node / use | Family / weight | Size token | Line-height | Tracking |
|---|---|---|---|---|
| `10:685`, `10:679` Hero headlines | TT Bluescreens Trial / 800 | `--font-size-display-120: 120px` | `--line-display-tight: 0.8` | `--tracking-display: 0` |
| `10:720` Experiment instruction | TT Bluescreens Trial / 800 | `--font-size-display-100: 100px` | 0.8 | 0 |
| `10:1438` explorer category | TT Bluescreens Trial / 800 | `--font-size-display-80: 80px` | 0.8 | 0 |
| `10:691` Hero hint title | TT Bluescreens Trial / 800 | `--font-size-display-50: 50px` | 0.8 | 0 |
| `10:1931` Hero CTA | TT Bluescreens Trial / 700 | `--font-size-display-35: 35px` | `--line-display-solid: 1` | 0 |
| `10:1929` Hero copy | IBM Plex Mono / 600 | `--font-size-copy-25: 25px` | `--line-copy: 1.2` | `--tracking-copy-tight: -0.04em` |
| `10:692` Hero hint, `10:729` skip | IBM Plex Mono / 500 | `--font-size-copy-25: 25px` | `--line-copy-tight: 1.1` | `--tracking-copy-hint: -0.03em` |
| `10:1439` explorer description | IBM Plex Mono / 500 | `--font-size-copy-20: 20px` | 1.2 | -0.04em |

These are available measured sizes, **not** h1/h2/body assignments for every section. Casing remains per-node Figma content. Per-section type values not sampled here are checked in that section's Stage 1B ticket. Do not scale all sizes uniformly for 1440/tablet/mobile.

| Family token | Local WOFF2 | Weight token |
|---|---|---|
| `--font-display` | `TT Bluescreens Trial Bold.woff2` | `--weight-display-bold: 700` |
| `--font-display` | `TT Bluescreens Trial ExtraBold.woff2` | `--weight-display-extrabold: 800` |
| `--font-copy` | `ibm-plex-mono-cyrillic-500-normal.woff2` | `--weight-copy-medium: 500` |
| `--font-copy` | `ibm-plex-mono-cyrillic-600-normal.woff2` | `--weight-copy-semibold: 600` |
| `--font-copy` | `ibm-plex-mono-latin-500-normal.woff2` | `--weight-copy-medium: 500` |
| `--font-copy` | `ibm-plex-mono-latin-600-normal.woff2` | `--weight-copy-semibold: 600` |

All URLs are under `/assets/fonts/`, no Google Fonts/CDN/import. `font-display: swap`; no synthetic weights. Generic `sans-serif`/`monospace` are browser failure fallbacks, not additional chosen font families. Stage 1B.1 adds matching local Latin 500/600 faces (same internal Version 2.3) with source unicode-range routing. Chrome actual-glyph inspection confirms both scripts use IBM Plex Mono; see FONT_ASSETS.md. Historical Inter/Manrope observations are superseded by D11; exact approved-family treatment of those source nodes is checked with the relevant section, without editing text.

## Containers, spacing and geometry

| Token | Value | Scope / source |
|---|---|---|
| `--design-width` | 1920px | Reference frame width, not an assertion of a universal content max-width |
| `--design-screen-height` | 1080px | Reference single-screen height, not mandatory 100vh |
| `--design-elephant-height` | 2187px | Elephant frame `10:917` |
| `--design-movies-height` | 1899px | Movies frame `10:1794` |
| `--design-footer-height` | 1334px | Footer frame `10:1016` |
| `--space-10` | 10px | Experiment help outer→inner frame inset `10:737`→`10:738`, VECTOR_ASSET_SOURCE |
| `--space-20` | 20px | Hero CTA text x=50 inside control x=30, nodes `10:1931` / `10:1930` |
| `--space-30` | 30px | Hero frame left inset; help inner content inset `10:739` |
| `--border-divider-width` | 4px | Elephant dividers and Blind-spot-scene lines, MOTION_SPEC / VECTOR_ASSET_SOURCE |
| `--border-art-frame-width` | 10px | Elephant `10:919`, inside border |
| `--radius-none` | 0 | Verified square/pixel primitive geometry; not a universal panel radius |
| `--z-base` | 0 | Neutral CSS base layer (technical convention); no global overlay scale asserted |

Spacing values are observed primitives, not permission to replace every source gap by the nearest scale step. Preserve exact fractional art positions and local clipping in section code. Figma child paint indices are **not** a CSS z-index scale; keep local stacking contexts. Positive overlay z-index values are deliberately unset until actual panels exist.

## Motion

Approved Stage 0.3 starting tokens, **not Figma prototype measurements**: `--duration-instant: 0ms`, `--duration-feedback: 150ms`, `--duration-ui: 200ms`, `--duration-state: 250ms`, `--duration-half-state: 125ms`; `--ease-out: cubic-bezier(0.23,1,0.32,1)` and `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`. CSS reduced-motion overrides durations to 0ms. Declaring tokens enables no motion in Stage 1A; artistic tuning belongs to Stage 4 visual tests. Full contracts: MOTION_SPEC M01–M15.

## Deliberately undefined / requires section verification

| Group | Deferred tokens / work |
|---|---|
| Containers | Reading-column max-width, section content width, responsive gutters and breakpoints; 1920px is only a reference canvas |
| Typography | Complete per-section scale, semantic h1/h2 mappings, remaining line-heights/tracking and source font-exception metrics |
| Spacing | Section vertical rhythm and all gaps beyond measured 10/20/30; no invented 4/8px universal scale |
| Borders/radii | UI panel, media controls, focus design and rounded corners outside verified primitives |
| Layers | Hint/contents/help positive z-index levels, resolved through actual local contexts, not copied from paint indices |

No dummy CSS values or speculative fallback numbers are supplied for these tokens. Detailed source artwork transforms, masks and crops remain in their Stage 0.2 JSON records, not in the global token file.
