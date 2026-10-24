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
| Movies `10:1794` | Visual cards, text, movie scene previews | Figma does **not** establish final movie video files. Check five scene sources, captions, audio and desired hover/play behavior. Legacy MP4 files remain REVIEW only. |
| Vocab `10:966` | Large vector graphic, blue texture | Verify if graphic contains flattened text/number. |
| Blind-spot-scene `10:997` | Large central yellow/black circle `image 51`, line vectors, texture | Inspect PNG resolution and line layering for scroll reveal. |
| What-to-do `10:1272` | Blue textured background and graphical dividers | Prefer CSS for simple lines. |
| Footer `10:1016` | Torn-paper/photo collages, several raster images, texture, logos | Export original fragments and inspect visual quality. |

## Migration guardrails

No unchecked transfer from legacy `public/` or `context/`. Record each accepted file as `source path → content/role → exact destination → SHA256 → tested dimensions/transparency`. Avoid using large combined screenshots as implementation assets. No placeholders unless explicitly approved.

## Stage 0.2 — asset inventory findings

Read-only Figma export metadata obtained for all **19** top-level frames. Totals before deduplication: **128 raw-image entries + 25 SVG entries**. These are references, not 153 unique files: the same image/texture may appear in many layers or states.

| Frame | Raw | SVG |
|---|---:|---:|
| Hero `10:472` | 11 | 7 |
| Experiment 1/2/3 `10:718` / `10:730` / `10:760` | 3 | 6 |
| Emptiness `10:838` | 11 | 1 |
| Elephant `10:917` | 5 | 1 |
| Idiom 1/2 `10:1431` / `10:1596` | 34 | 0 |
| Pun 1/2 `10:1495` / `10:1981` | 18 | 0 |
| Double meaning 1/2 `10:1528` / `10:2017` | 10 | 0 |
| Cultural reference 1/2 `10:1560` / `10:2049` | 10 | 0 |
| Movies `10:1794` | 1 | 2 |
| Vocab `10:966` | 1 | 1 |
| Blind-spot-scene `10:997` | 5 | 5 |
| What-to-do `10:1272` | 2 | 2 |
| Footer `10:1016` | 18 | 0 |

**Shared images found by internal Figma hash** (not cryptographic checksums): Mosaic texture `6be621144e7ecf462b8e2789f21ec8f7499d659e` appears throughout early sections; `AU-FG-Texture4-8K` `364855320f08ade1d04f13556e9f3defb0d52bcb` appears in the later ones. Deduplicate each to a single optimized local source.

**Animation-related findings:** ice shards often reuse the same underlying image under different crops; the two Pun states reuse the same bicycle image fills; the two Double meaning states reuse the same eye image fills; five snowflake elements use two repeated underlying fills at different sizes. Implement independent layers/transforms rather than storing duplicate bitmaps for each state, unless a visual comparison shows distinct imagery.

**Font audit:** Figma file has 229 text nodes; 133 report `hasMissingFont`. Families/styles: TT Bluescreens Trial ExtraBold (128), Bold (5); IBM Plex Mono Medium (92), SemiBold (1); Inter Semi Bold (2); Manrope SemiBold (1). No local Figma variable collections or Figma text styles were returned. Prioritize collecting **font files with correct styles** so rendered geometry can match; no legal/licensing audit is in scope for this educational project.

**Outstanding:** original asset bytes, deduplicated count, intrinsic pixel dimensions, transparency, optimization, reliable font files, and candidate film video verification. Figma MCP provided short-lived export URLs but no original files have been saved in this repository. All images are still pending local download and pixel QA. **Do not mark asset migration complete based on the metadata inventory alone.**
