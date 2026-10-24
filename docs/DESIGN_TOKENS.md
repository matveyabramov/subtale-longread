# SUBTALE — observed design tokens (preliminary)

Source: Figma file `H4HI00uGY2UOxpcfHogUat`, MCP code/layer samples. **Provisional** until a comprehensive per-frame font/variable audit.

## Palette

| Role | Observed value |
|---|---|
| Electric blue | `#012ED7` |
| Yellow | `#FED128` |
| Near-black | `#0B0D0F` |
| Off-white | `#EEEEE7` |

## Typography (observed)

- `TT Bluescreens Trial`: large condensed editorial headings and CTA/display labels; observed Bold and ExtraBold.
- `IBM Plex Mono`: smaller explanatory copy and editorial text; observed Medium and SemiBold.
- `Inter`: limited use observed in Footer; verify whether intentional.
- **Do not adopt legacy typography**. Map exact per-node font families, weights, tracking, line height and casing during each section's implementation.
- A file named `TT Bluescreens Trial` is a design layer family, **not** proof that a publishable font licence/file is available. Resolve before shipping.

## Geometry / layout

- Baseline desktop Figma width: `1920px`. Most single-stage frames `1080px` tall; Elephant `2187px`, Movies `1899px`, Footer `1334px`.
- Hero headline and many primary elements are inset `30px` from the frame left edge; not necessarily a universal site token.
- Do not copy Figma-generated raw absolute positioning as a global responsive strategy. Preserve editorial placements with grid, relative positioning and local art layers.
- Breakpoints are **content-driven**; `1440px` is a QA target, not automatically a breakpoint. No mobile/tablet Figma frames exist.

## Unverified

Official Figma variable collections could not be retrieved without selecting a layer. Precise radius, spacing, semantic type scale, shadows, responsive container sizing, and exported fonts should be audited per section; do not invent numbers here.
