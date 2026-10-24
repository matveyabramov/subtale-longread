# SUBTALE — initial Figma asset manifest

Status: **candidates located; no assets extracted into project yet**. Source: document-wide Figma layer metadata + selected node design contexts. Assets must be exported as originals / SVG where available and verified locally; do not commit ephemeral Figma MCP asset URLs.

| Section / Figma node | Candidate media or vector layers | Verification / action |
|---|---|---|
| Hero `10:472` | Mosaic texture, main collage, person image, star shapes, logo/CTA icon | Export layers individually. Some collage imagery may be rasterized. Confirm transparency and cropping. |
| Experiment `10:718`, `10:730`, `10:760` | Background texture, cross and dot geometry, arrow graphics | Prefer CSS/SVG for simple geometry if exact Figma vector data supports it; verify contrast. |
| Emptiness `10:838` | Male and female isolated cutouts + many 77px pixel masking squares | Preserve editable mask/tiles separately for planned reveal; confirm exported alpha. |
| Elephant `10:917` | Custom elephant illustration, decorative pixel blocks, background texture | Export approved artwork, do not reuse legacy `elephant-temp.png`. |
| Blind zones — Idiom `10:1431`, `10:1596` | Ice block/shards, telephone receiver, separate before/after art | Pair first/second state asset coordinates. |
| Blind zones — Pun `10:1495`, `10:1981` | Bicycle frame, wheel components | Export independently for falling/rotating animation. |
| Blind zones — Double Meaning `10:1528`, `10:2017` | Eye illustration, hidden romantic figures | Compare states and masking method. |
| Blind zones — Reference `10:1560`, `10:2049` | Snowflake pieces, Iron Throne illustration | Validate two-state silhouette and relative scale. |
| Movies `10:1794` | Visual cards, text, movie scene previews | Figma does **not** establish final movie video files. Check five scene sources, captions, audio, licensing and desired hover/play behavior. Legacy MP4 files remain REVIEW only. |
| Vocab `10:966` | Large vector graphic, blue texture | Verify if graphic contains flattened text/number. |
| Blind-spot-scene `10:997` | Large central yellow/black circle `image 51`, line vectors, texture | Inspect PNG resolution and line layering for scroll reveal. |
| What-to-do `10:1272` | Blue textured background and graphical dividers | Prefer CSS for simple lines. |
| Footer `10:1016` | Torn-paper/photo collages, several raster images, texture, logos | Export original fragments and inspect copyright. |

## Migration guardrails

No unchecked transfer from legacy `public/` or `context/`. Record each accepted file as `source path → content/role → exact destination → SHA256 → license/provenance → tested dimensions/transparency`. Avoid using large combined screenshots as implementation assets. No placeholders unless explicitly approved.
