# SUBTALE — Figma asset import procedure

Source of truth: current Figma file `H4HI00uGY2UOxpcfHogUat`.
Source registry: `docs/FIGMA_ASSET_MAP.json` (41 unique raster hashes, owners, dimensions and usage counts).

## Per-section workflow for local Codex

1. Pick **one** frame ID from `docs/FIGMA_AUDIT.md`. Do not re-read the whole Figma.
2. Use Figma MCP `get_design_context` (with screenshot) for that frame; use `download_assets` only for unprovided individual asset URLs. Use image hash map to avoid duplicate images.
3. Download original image assets and vector assets to local `public/assets/` immediately (Figma MCP URLs expire). Do **not** download a combined 1920px screenshot as an implementation image.
4. Where two source fills overlap, preserve both layers until visually proven redundant. Figma overlays sometimes consist of JPEG base + transparent PNG mask.
5. Name files semantically; write the correct `localPath` for each imported hash in `docs/FIGMA_ASSET_MAP.json`.
6. Run `node scripts/check-assets.mjs`; inspect visually, check transparency of pixels (an alpha channel alone does not guarantee transparent edges), cropping, resolution and approximate source size.
7. Optimize **copies**, retaining a reproducible original if an optimizer causes artifacts. Avoid duplicate bitmaps between alternate states; use transforms and masking in code.
8. Commit only the relevant section assets and manifest updates. Brief report: file count, byte total, outstanding assets.

## Explicit priorities

Hero background and composite sources first; Emptiness cutouts; Elephant illustration; four paired meaning-trap state assets (ice fragments, bicycle wheels/frame, eye, snowflake/throne); film-scene media; Footer collage; fonts.

No app dependency install, animation implementation or Figma edits as part of importing assets. The project is educational; legal-licence research is out of scope. Technical font fidelity remains required.
