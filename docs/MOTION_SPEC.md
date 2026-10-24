# SUBTALE — preliminary motion / interaction map

**Proposed behaviors**, not verified Figma prototypes. Stage 0.3 must reconcile these with approved editorial intent and available layered assets before implementation.

| Area | Figma nodes | Proposed trigger/state | First code pass |
|---|---|---|---|
| Hero | `10:472` | CTA to start experiment; optional hint and skip. Ensure user cannot get stuck. | Static CTA + working state controls |
| Experiment | `10:718`, `10:730`, `10:760` | Three-stage instructions → dot/cross → result; help overlay and skip. | Semantic state machine, keyboard/focus, no scroll trapping without an exit |
| Emptiness | `10:838` | Reconstructed/blocked perception through tiles, possible scroll reveal | Keep layers separate |
| Elephant | `10:917` | Four conceptual layers revealed in reading order | Static four levels, then motion |
| Idiom | `10:1431`, `10:1596` | Ice/telephone before ↔ after | Click/hover/touch, replay, reduced motion |
| Pun | `10:1495`, `10:1981` | Bicycle before ↔ fallen/wordplay | Click/hover/touch, replay, reduced motion |
| Double meaning | `10:1528`, `10:2017` | Eye image / two readings | Click/hover/touch with visible alternative |
| Cultural reference | `10:1560`, `10:2049` | Snowflake → throne | Click/hover/touch, replay, reduced motion |
| Movies | `10:1794` | Five scene cards with contextual reveal and/or video preview | Video state ownership; pause offscreen, hidden tab, reduced-motion handling |
| Vocab | `10:966` | Scroll-triggered statement emphasis if approved | Static first |
| Blind-spot-scene | `10:997` | Three lines pass through central blind area with information losses | Preserve line and circle layers |
| What-to-do | `10:1272` | Two-part viewing guidance; likely minimal motion | Static first |
| Footer | `10:1016` | Final emphasis/credits reveal only if approved | Static first |

## For every animation ticket

Document: trigger; default state; active state; exact Figma state IDs; assets; duration/easing; replay/reset; interruption; keyboard/touch equivalents; preferred reduced-motion alternative; and scope of Playwright testing. Never treat an animation skill as authority to replace approved narrative or design.

## Stage 0.2D.1 — verified Idiom endpoints (2026-10-24)

Scope: illustration layers in approved frames **A `10:1431`** and **B `10:1596`**, both 1920 × 1080. This section records measured endpoints, not an approved transition. Sources and exact crop matrices, Boolean operands, per-node transforms and SHA256 checksums: `docs/IDIOM_ASSET_IMPORT.json`.

**Observed change:** all eight ice objects retain identical position, dimensions, rotation, opacity, imageHash, crop and Boolean geometry. B adds telephone node `10:1598`. The upper-left ice object moves earlier in the paint order, below the telephone and below the mosaic. No ice explosion, translation, rotation or scaling is established by these two frames.

Coordinates below are frame-local top-left positions before any hypothetical motion. Paint order is the zero-based Figma child index, back to front; omitted indices belong to the unchanged interface. Dimensions are the object/crop viewport, not source-file dimensions. Rotation is Figma's recorded angle. Scale is **B relative to A**; all ice transforms have identity linear parts, so there is no rotation, skew or reflection in either endpoint.

| Object | A node → B node | Position A → B (x, y) | Dimensions A = B | Rotation A → B | Scale B/A (x, y) | Paint order A → B | Source under `public/assets/images/` |
|---|---|---|---|---|---|---|---|
| Upper-left ice | `10:1935` → `10:1597` | (30, 397) → (30, 397) | 501 × 337 | 0° → 0° | (1, 1) | 5 → 0 | `idiom-ice-upper-left.png` |
| Lower-middle ice | `10:1936` → `10:1628` | (415, 853) → (415, 853) | 232 × 147 | 0° → 0° | (1, 1) | 6 → 6 | `idiom-ice-lower-middle.png` |
| Upper-right ice | `10:1937` → `10:1629` | (657, 397) → (657, 397) | 424 × 299 | 0° → 0° | (1, 1) | 7 → 7 | `idiom-ice-upper-right.png` |
| Center ice | `10:1940` → `10:1632` | (504, 499) → (504, 499) | 203 × 379 | 0° → 0° | (1, 1) | 8 → 8 | `idiom-ice-center.png` |
| Right small ice | `10:1945` → `10:1637` | (900, 646) → (900, 646) | 210 × 145 | 0° → 0° | (1, 1) | 9 → 9 | `idiom-ice-right-small.png` |
| Left small ice | `10:1950` → `10:1642` | (354, 685) → (354, 685) | 133 × 116 | 0° → 0° | (1, 1) | 10 → 10 | `idiom-ice-left-small.png` |
| Lower-left ice | `10:1953` → `10:1645` | (30, 727) → (30, 727) | 393 × 273 | 0° → 0° | (1, 1) | 11 → 11 | `idiom-ice-lower-shared.png` |
| Lower-right ice | `10:1958` → `10:1650` | (653, 735) → (653, 735) | 457 × 265 | 0° → 0° | (1, 1) | 12 → 12 | `idiom-ice-lower-shared.png` |
| Telephone | absent → `10:1598` | undefined → (227, 228) | undefined → 635 × 851 | undefined → 0° | undefined | absent → 1 | `idiom-telephone-cutout.png` |
| Mosaic | `10:1432` → `10:1599` | (0, 0) → (0, 0) | 1920 × 1080 | 0° → 0° | (1, 1) | 0 → 2 | existing `mosaic-texture.png` |

**Paint order:** A has mosaic below all eight ice objects. B has upper-left ice → telephone → mosaic → remaining seven ice objects. Preserve the mosaic's 0.4 paint opacity and TILE scale (`scalingFactor` 0.8942065238952637), including its overlay on the telephone and upper-left fragment. Moving that texture behind all imagery changes B's appearance. The telephone is behind every ice object except the upper-left one. Both frames clip content at their 1920 × 1080 bounds.

### Original fills, crops and masks

Seven distinct ice PNGs are each **4096 × 2286**. They contain broadly similar full artwork with actual pixel differences: do not merge them by appearance or substitute one for another. The two lower corner objects share **the same** `b0d17f5142962d3ddc19f08fa9cae9df92eac834` source with different crop transforms; they must remain separate object wrappers. All ice IMAGE fills are visible, NORMAL, opacity 1, CROP. The Figma fill `scalingFactor: 0.5` is stored source metadata, not a B/A animation scale.

The following normalized source-crop values are unchanged in B. For matrix `[[sx, 0, tx], [0, sy, ty]]`, the source crop is `(tx × sourceWidth, ty × sourceHeight, sx × sourceWidth, sy × sourceHeight)`, displayed within the object viewport above. Values below are abbreviated for reading; use the full precision JSON values for implementation.

| A node | sx | sy | tx | ty | Additional clipping |
|---|---:|---:|---:|---:|---|
| `10:1935` | 0.4636995494 | 0.5588722825 | 0.0002040578 | 0 | Rectangular viewport |
| `10:1936` | 0.2147271484 | 0.2437810898 | 0.3565400541 | 0.7562189102 | Rectangular viewport |
| `10:1937` | 0.3924323618 | 0.4958540499 | 0.5805226564 | ≈0 | `idiom-ice-upper-right-mask.svg` |
| `10:1940` | 0.1878862381 | 0.6285240650 | 0.4379882813 | 0.1674958616 | `idiom-ice-center-mask.svg` |
| `10:1945` | 0.1943650693 | 0.2404643297 | 0.8054308891 | 0.4129352868 | `idiom-ice-right-small-mask.svg` |
| `10:1950` | 0.1230978817 | 0.1923714876 | 0.3000816107 | 0.4776119590 | `idiom-ice-left-small-mask.svg` |
| `10:1953` | 0.3637403548 | 0.4527363181 | 0.0002040578 | 0.5472636819 | `idiom-ice-lower-left-mask.svg` |
| `10:1958` | 0.4229754508 | 0.4394693077 | 0.5768204331 | 0.5605306625 | `idiom-ice-lower-right-mask.svg` |

The six mask SVGs in `public/assets/illustrations/` preserve Boolean SUBTRACT geometry, derived directly from the measured rectangular operands rather than exported with embedded images. They are white opaque remaining areas with transparent cutouts, usable as alpha masks at the recorded object dimensions. No `isMask=true` image-subtree nodes were found; source alpha, crop viewports and Boolean subtraction together define each fragment. Do not render the gray cutter rectangles as visible art, or animate the Boolean operands as separate shards.

| A Boolean → B Boolean | Subtract rectangles (x, y, width, height), local to the outer object |
|---|---|
| `10:1937` → `10:1629` | (-41, 276, 84, 48) |
| `10:1940` → `10:1632` | (-30, 359, 91, 39); (158, 350, 94, 58) |
| `10:1945` → `10:1637` | (-21, -20, 38, 32); (-11, 134, 22, 17) |
| `10:1950` → `10:1642` | (-19, -17, 36, 31) |
| `10:1953` → `10:1645` | (377, 197, 30, 25); (320, -26, 95, 79); (218, -31, 65, 45) |
| `10:1958` → `10:1650` | (261, -30, 183, 81); (-42, -19, 75, 103) |

The telephone has two original **1792 × 2400** fills: hidden JPEG `bfdc63b7bc0f0d5abbdf1a00f3ec8121daffde5a` and visible transparent PNG `be5817d93162046d2b9f3af61b7489db7df1278c`. Only the PNG is rendered in B, at opacity 1, NORMAL blend, FILL mode; retain the JPEG without enabling it. The cable reaches the original bottom edge; keep that source clipping and transparent margins. The telephone has no counterpart in A, so A does not establish its starting position, rotation, scale or pivot. Its angled silhouette is already drawn into the source bitmap; the node rotation is 0°.

### Independent animation feasibility and unresolved decisions

**Feasible:** eight ice wrappers plus one telephone can be transformed independently. Each wrapper must carry its image crop and Boolean mask as one object. Reuse the seven original ice textures and six clipping masks across states; no duplicate state bitmaps are needed. Independent transforms of the two lower objects remain possible despite their shared imageHash.

**Not specified by these frames:** trigger, duration/easing, telephone entry pose/path, transform origins, replay/reset, interruption behavior and when/how the upper-left shard changes stacking relative to the mosaic. Do not infer ice displacement or an explosion from these static endpoints. Decide these in the motion stage before implementation, along with keyboard/touch access and a prefers-reduced-motion alternative that exposes the meaning/state without requiring movement. No scroll hijacking is authorized. No animation, CSS layout or interaction has been implemented in this import stage.
