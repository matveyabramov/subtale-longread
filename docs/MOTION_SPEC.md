# SUBTALE — preliminary motion / interaction map

**Proposed behaviors**, not verified Figma prototypes. Stage 0.3 must reconcile these with approved editorial intent and available layered assets before implementation.

| Area | Figma nodes | Proposed trigger/state | First code pass |
|---|---|---|---|
| Hero | `10:472` | CTA to start experiment; optional hint and skip. Ensure user cannot get stuck. | Static CTA + working state controls |
| Experiment | `10:718`, `10:730`, `10:760` | Three-stage instructions → dot/cross → result; help overlay and skip. | Semantic state machine, keyboard/focus, no scroll trapping without an exit |
| Emptiness | `10:838` | Reconstructed/blocked perception through tiles, possible scroll reveal | Keep layers separate |
| Elephant | `10:917` | Four conceptual layers revealed in reading order | Static four levels, then motion |
| Idiom | `10:1431`, `10:1596` | Ice/telephone before ↔ after | Click/hover/touch, replay, reduced motion |
| Pun | `10:1495`, `10:1981` | Whole bicycle composite rotates ≈34.37°; verified endpoints below | Click/hover/touch, replay, reduced motion |
| Double meaning | `10:1528`, `10:2017` | Mutually exclusive full-eye PNG fills; verified endpoints below | Click/hover/touch with visible alternative |
| Cultural reference | `10:1560`, `10:2049` | Five snowflake instances replaced by one throne; verified compositions below | Click/hover/touch, replay, reduced motion |
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

## Stage 0.2D.2 — verified Pun endpoints (2026-10-24)

Scope: illustration layers in **A `10:1495`** and **B `10:1981`**, both 1920 × 1080 with frame clipping enabled. Exact raw coordinates, frame-projected transforms, fills, bounds and source checksums are in `docs/PUN_ASSET_IMPORT.json`. This is endpoint documentation; no transition has been implemented.

**Observed change:** B rotates the entire bicycle composite approximately **34.367141° clockwise** about the initial composite center **(417.5, 692.5)**. Both PNG layers share this transformation; their source hashes, dimensions, FILL settings, opacity, visibility and paint order are unchanged. No wheel detachment, independent wheel rotation, changed drawing or new layer is shown. The upper-left anchor shifts because the composite rotates about its center, not because the two layers move apart. There is no measurable scale change: B/A is 1 × 1, within floating-point tolerance (matrix column lengths ≈1.00000000096).

### Object correspondence and layering

Positions below use the translation of each measured **frame-local transform**, before the axis-aligned rotated bounding box is calculated. All values are in design pixels. Raw node x/y in B are (392.1649169922, 78.5206527710); subtracting absolute frame coordinates yields the translation below, differing by less than 0.00015 px. Both forms are retained in the JSON. Paint paths are zero-based child indices, back to front, from the frame through groups; they remain unchanged in B.

| Object | A node → B node | Frame-local origin A → B | Local dimensions A = B | Figma rotation A → B | Paint path A = B |
|---|---|---|---|---|---|
| Composite group | `10:1975` → `10:2012` | (50, 200) → (392.1650390625, 78.5205078125) | 735 × 985 | 0° → -34.3671413753° | 5 |
| Bicycle subgroup | `10:1976` → `10:2013` | same as composite | 735 × 985 | 0° → -34.3671413753° | 5 / 0 |
| Whole bicycle bitmap | `10:1977` → `10:2014` | same as composite | 735 × 985 | 0° → -34.3671413753° | 5 / 0 / 0 |
| Wheel-pair subgroup | `10:1978` → `10:2015` | same as composite | 735 × 984 | 0° → -34.3671413753° | 5 / 1 |
| Wheel-pair bitmap | `10:1979` → `10:2016` | same as composite | 735 × 984 | 0° → -34.3671413753° | 5 / 1 / 0 |
| Mosaic | `10:1496` → `10:1982` | (0, 0) → (0, 0) | 1920 × 1080 | 0° → 0° | 0 |

The mosaic remains **below** both image layers. The complete bicycle image is painted first; the extracted wheel pair overlays it. Interface layers occupy frame indices 1–4; the illustration group remains index 5 in both states. The wheel layer's **984px** height differs from the bicycle layer's **985px** height by design; do not normalize these heights when aligning the images.

For either bitmap, using local bitmap-slot coordinates `(u, v)`, the frame projection is:

- A: `x = u + 50`, `y = v + 200`.
- B: `x = 0.8254373669624329u - 0.564493715763092v + 392.1650390625`, `y = 0.564493715763092u + 0.8254373669624329v + 78.5205078125`.

Figma reports -34.367141°; the positive sine in the y-down frame matrix corresponds to **+34.367141° clockwise in CSS**. Use the measured frame projection once. The API returns repeated group/descendant coordinate transforms here; do not add the translation or apply the rotation once per nested group. For later DOM nesting, derive child-local transforms from the frame matrices, or use a single transformed wrapper containing the two aligned bitmap slots.

B's rotated canvas bounds are approximately:

| Object | Bounding x | Bounding y | Bounding width | Bounding height |
|---|---:|---:|---:|---:|
| Composite / bicycle canvas | -163.861271 | 78.520508 | 1162.722775 | 1227.958688 |
| Wheel-pair canvas | -163.296777 | 78.520508 | 1162.158281 | 1227.133250 |

These are full **transparent-canvas** bounds, not visible silhouette bounds. A's bicycle canvas extends to y=1185 and the wheel canvas to y=1184; both states are clipped by their 1080px frame. Preserve this clipping rather than trimming sources or treating the rotated bounds as slot dimensions. The slightly different wheel canvas center follows the common group pivot; do not rotate the 984px wheel layer around an independently chosen center if reproducing B.

### Sources, fills, transparency and masks

All four originals are **1792 × 2400** and are reused between A and B, one local file per imageHash:

| Object / fill | imageHash | File under `public/assets/images/` | Visibility in A and B |
|---|---|---|---|
| Bicycle JPEG | `f896e935d71fd96ad289d93b7e8ce7d177767633` | `pun-bicycle-base.jpg` | Hidden |
| Bicycle PNG | `062b06beeb916ea58e9db0134f2d6a1ba921958a` | `pun-bicycle-cutout.png` | Visible |
| Wheel-pair JPEG | `abafb5e224150ff4820d1e37233090f06e1e9689` | `pun-wheels-base.jpg` | Hidden |
| Wheel-pair PNG | `173aa0acd8edfb44bd3dee924ff505e613162e4f` | `pun-wheels-cutout.png` | Visible |

Each node has hidden JPEG followed by visible PNG; keep the JPEG originals without enabling them behind the transparent artwork. Both visible PNG fills use NORMAL blend, opacity 1, FILL mode, identity imageTransform and stored `scalingFactor: 0.5`. There is no custom CROP transform. Retain the full original canvas and exact slot aspect ratios, including the slight cover crop implicit in FILL. The fill scalingFactor is source metadata, not the endpoint scale change.

There are **no explicit Figma masks, Boolean subtractions or external clipping shapes** in the inspected illustration subtree. PNG alpha provides the silhouette; rectangular slot cover and frame clipping provide the remaining clipping. No additional mask file is needed. Both PNGs have real fully transparent and partially transparent pixels. The bicycle PNG contains 10 faint source-edge samples at alpha 1–3, so its nonzero-alpha bounds technically span the canvas; these original pixels were retained without cleanup. Its alpha>8 bounds are (89, 487)–(1702, 1864). Wheel-pair nonzero-alpha bounds are (89, 914)–(1702, 1864). Do not reposition either layer by visible-content bounds or discard its transparent margins.

### Independent animation feasibility

The existing art supports **two independently transformable bitmap wrappers**, and the complete composite can rotate together as shown by A/B. However:

- The lower PNG already contains the whole bicycle: frame, saddle, handlebar, crank, pedals **and both original wheels** are fused in one image.
- The upper PNG contains **both extracted wheels together**. There are no independent left/right wheel nodes, masks or files.
- Moving the wheel-pair overlay away exposes the original wheels underneath. A clean wheel-free frame and independently detached wheels are therefore **not available as supplied**. Such motion requires separately agreed source preparation/masking; it must not be claimed complete from these assets or improvised in this import stage.

The observed endpoints are achievable with existing files. Trigger, duration/easing, path, replay/reset, interruption handling and keyboard/touch controls remain decisions for the motion stage. A prefers-reduced-motion option should expose both states/meaning without requiring rotation. No scroll hijacking is authorized. No layout, animation, new wheel isolation or dependency installation was performed.

## Stage 0.2D.3 — verified Double Meaning endpoints (2026-10-24)

Scope: **A `10:1528`**, **B `10:2017`**, both 1920 × 1080. Source checksums, exact fills/transforms and A/B node correspondence are in `docs/DOUBLE_MEANING_ASSET_IMPORT.json`. The earlier interaction row remains a proposal; this section records the actual endpoint mechanism and introduces no animation.

**Observed visual difference:** A shows an eye with an empty yellow center; B shows a dark couple silhouette within that center. Both are **complete eye PNGs**, not a common eye plus a separate couple overlay. In Figma there is one illustration rectangle with two IMAGE fills; their `visible` flags are exchanged. Position, scale, rotation, crop settings, node opacity, paint opacity, mask structure and layer order do not change. No geometric reveal or opacity tween is encoded by these endpoints.

### Object structure and fixed geometry

| Object | A node → B node | Position A = B (x, y) | Dimensions A = B | Rotation A = B | Scale B/A | Node opacity A = B | Frame paint order A = B |
|---|---|---|---|---|---|---|---|
| Eye rectangle, two fills | `10:1558` → `10:2047` | (115, 383) | 845 × 563 | 0° | (1, 1) | 1 | 4 |
| Existing mosaic | `10:1529` → `10:2018` | (0, 0) | 1920 × 1080 | 0° | (1, 1) | 1 | 0 |

Frame paint order is zero-based, back to front. Within either frame: mosaic 0 → sidebar group 1 → title 2 → yellow heading container 3 → eye rectangle 4 → bottom text link 5. The image remains above the mosaic in both states. Frame-local eye transform is exactly `[[1, 0, 115], [0, 1, 383]]` for A and B; its slot center is (537.5, 664.5). Both frames clip at 1920 × 1080. The page-level sibling indices of the two reference frames (13 and 14) are document placement, not a transition in the internal stacking.

### The actual state change: fill visibility

Fill-array order stays fixed. Each paint uses NORMAL blend, opacity 1, FILL mode, identity imageTransform `[[1, 0, 0], [0, 1, 0]]`, zero filters and stored `scalingFactor: 0.5`.

| Fill index | Original imageHash | File under `public/assets/images/` | Original resolution | A visible | B visible |
|---|---|---|---|---|---|
| 0 | `a9f463489c07be031417200565743725d6a366ac` | `double-meaning-eye.png` | 3072 × 2048 | true | false |
| 1 | `3a4dbff1bde5d50b9dc399bc758f670e1fbee740` | `double-meaning-eye-couple.png` | 1536 × 1024 | false | true |

Exactly one fill is enabled per endpoint. The two fills are alternative full artwork, not two simultaneously visible compositing layers. To reproduce the endpoints, switch the enabled image in the same logical slot. A crossfade, pupil opening, animated clipping mask or independent couple movement would be an additional design decision, not a behavior established by these frames.

The apparent size stays the same despite B's source having half the width and height of A's source: both use the identical 845 × 563 slot. Both canvases have a 3:2 aspect ratio, slightly different from the slot, so retain the small centered cover crop implicit in FILL. There is no custom CROP transform, and the paint `scalingFactor` is not an endpoint scale change. Do not resize originals to a common resolution, trim transparent margins, or align the art by nonzero-alpha bounds.

### Alpha and masks

Both originals are RGBA PNGs with fully transparent edges and real partially transparent pixels. A's alpha range is **0–255**; B's is **0–254**, with no fully opaque pixel. This is source-pixel data, not a change to Figma node/paint opacity, which stays 1. Preserve these bytes without forcing alpha to 255 or flattening against the blue background.

| PNG | Nonzero-alpha bounds in original pixels | Fully transparent pixels | Partially transparent pixels |
|---|---|---:|---:|
| Eye A, 3072 × 2048 | (104, 2)–(2998, 2022) | 2,621,824 | 3,425,234 |
| Eye with couple B, 1536 × 1024 | (52, 1)–(1499, 1011) | 655,456 | 917,408 |

No `isMask=true` nodes or Boolean operations were found in either inspected frame. PNG alpha contains the silhouette and internal illustration; slot cover and frame clipping provide the remaining clipping. There is no separate pupil mask to export. No additional SVG/mask file is needed. The mosaic is reused at 0.4 paint opacity, TILE scalingFactor 0.8942065238952637, unchanged below the eye.

### Comparison evidence and animation limits

The recorded structure has 32 nodes per frame. Pairwise comparison of their in-frame geometry, transforms, visibility, opacity, fills, effects, strokes, mask/clipping flags and text content found a single changed property: the eye rectangle's fill array, differing **only in the two `visible` flags**. Source hashes and paint-array order remain the same. Original-byte fingerprints, decoded dimensions and actual alpha pixels were checked; both original images were visually inspected in the same logical slot against the Figma references.

**Supported by the assets:** exact switching between two complete images in the fixed slot. The couple, iris, pupil, highlight and eye outline are fused into those images; they are not separate independently transformable objects. Independently moving the figures or morphing the pupil would require additional agreed source preparation and a design decision. These reference states specify no duration, easing, path or interpolation, so this import does not invent one.

Trigger, replay/reset, interruption and keyboard/touch access remain decisions for the interaction/motion stage. Both readings must remain accessible without requiring motion, including for prefers-reduced-motion. No layout, transition or animation has been implemented.

## Stage 0.2D.4 — verified Cultural Reference compositions (2026-10-24)

Scope: **A `10:1560`** and **B `10:2049`**, both 1920 × 1080. Exact fills, transforms, source checksums, alpha QA and common-node correspondence are in `docs/CULTURAL_REFERENCE_ASSET_IMPORT.json`. These are measured compositions, not an approved animation sequence.

**Observed difference:** A contains **five complete snowflake image instances** at different positions and sizes. B contains **one complete Iron Throne image** and no snowflake nodes, including hidden counterparts. The five instances are not five separately drawn fragments of one snowflake. Their identical imageHash pairs reference one shared JPEG/PNG source pair. The throne uses a different source pair. The 30 common texture/interface nodes retain all recorded in-frame geometry, transforms, paint order, visibility, opacity, fills, effects, strokes, mask/clipping flags and text content.

There is no direct A/B node correspondence between a particular snowflake and the throne, and no correspondence between snowflake arms and swords. Do not describe the central snowflake as moving/scaling into the throne or infer a morph from these two reference frames.

### Geometry of every illustration object

Coordinates are frame-local slot origins; dimensions are the full image-slot canvas, including transparent margins. Paint order is the zero-based frame child index, back to front. All listed nodes are visible, at opacity 1, rotation 0°, with no skew/reflection. Each snowflake is an independently placed instance of the same full PNG.

| State / object | Figma node | x | y | Width | Height | Center (x, y) | Rotation | Paint order | Other-state counterpart |
|---|---|---:|---:|---:|---:|---|---|---:|---|
| A / main snowflake | `10:1591` | 328 | 321 | 522 | 699 | (589, 670.5) | 0° | 5 | Absent in B |
| A / upper-left snowflake | `10:1592` | 76 | 283 | 232 | 311 | (192, 438.5) | 0° | 6 | Absent in B |
| A / upper-right snowflake | `10:1593` | 870 | 198 | 232 | 311 | (986, 353.5) | 0° | 7 | Absent in B |
| A / lower-right snowflake | `10:1594` | 902 | 655 | 168 | 224 | (986, 767) | 0° | 8 | Absent in B |
| A / lower-left snowflake | `10:1595` | 126 | 732 | 110 | 147 | (181, 805.5) | 0° | 9 | Absent in B |
| B / Iron Throne | `10:2087` | 301 | 263 | 610 | 817 | (606, 671.5) | 0° | 5 | Absent in A |

For each object, the frame-local projection is `[[1, 0, x], [0, 1, y]]` using its table origin. Differently sized snowflake slots represent instance sizes, not a sequence of scale changes. Since no snowflake has a counterpart in B, an A→B transform/scale ratio is **undefined** for each one; the same applies to the throne's starting pose in A. Full-precision per-instance geometry is recorded in the JSON.

**Stacking:** both frames have mosaic 0 → sidebar group 1 → title 2 → yellow heading container 3 → bottom text link 4. A then paints the five snowflake nodes in table order, 5–9. B instead paints the throne at 5. The existing mosaic is below all artwork, with unchanged TILE scalingFactor 0.8942065238952637 and paint opacity 0.4. No mask or foreground texture overlays the illustrations. Both frames clip at 1920 × 1080; the throne's full slot reaches y=1080 exactly. Preserve frame clipping and original transparent margins.

### Original sources, fill visibility and cropping

All four originals are **1792 × 2400**. There is one file per imageHash; the five snowflakes share their two originals without per-instance copies.

| Source / fill | imageHash | File under `public/assets/images/` | Used by | Fill visibility |
|---|---|---|---|---|
| Snowflake JPEG | `a3b7ac7e799505da584c86b7c42f8da6723eedbc` | `cultural-snowflake-base.jpg` | All five A instances | Hidden |
| Snowflake PNG | `479c47cbc92ef29bc039dc843d2f7103b80d1391` | `cultural-snowflake-cutout.png` | All five A instances | Visible |
| Throne JPEG | `429921b86495a728937851d97677ae3dcf8c9122` | `cultural-iron-throne-base.jpg` | B throne | Hidden |
| Throne PNG | `76a447de6eae4a64eca6b2865f63ff9cdb9e566c` | `cultural-iron-throne-cutout.png` | B throne | Visible |

Every illustration node has hidden JPEG fill 0 followed by visible PNG fill 1. Preserve both originals without enabling the opaque JPEG behind the PNG. Both fills use NORMAL blend, paint opacity 1, FILL mode, identity imageTransform `[[1, 0, 0], [0, 1, 0]]`, zero filters and stored `scalingFactor: 0.5`. This scalingFactor is fill metadata, not an animation scale.

There is no custom CROP matrix. Preserve the small centered cover crop implicit in FILL for each exact slot aspect ratio; notably the 168 × 224 slot differs slightly in aspect from the original canvas and the other instances. Do not normalize dimensions, trim alpha margins, or save five cropped copies of the snowflake to reproduce these slots.

### Transparency, masks and independence

Both PNG originals have alpha 0–255, fully transparent edges and genuine partial-alpha pixels. Their alpha provides the silhouette and internal cutouts; no explicit `isMask=true` nodes or Boolean operations were found in either frame. No extra mask file is required.

| PNG | Nonzero-alpha bounds in source pixels | Fully transparent pixels | Partially transparent pixels |
|---|---|---:|---:|
| Snowflake | (31, 167)–(1761, 2233) | 2,623,754 | 90,206 |
| Iron Throne | (93, 87)–(1714, 2302) | 1,892,480 | 67,898 |

**Independent objects available:** five complete snowflake wrappers in A can each be transformed independently, while all five reuse one visible PNG. The complete throne is one separately transformable bitmap in B. Each snowflake's arms are fused into its raster; the throne's swords, seat and other details are fused into its raster. There are no separate arm/sword nodes supporting independent component animation.

**Not established by the design:** how the five A objects disappear, how the B object enters, any motion path, transform origin, morph, fade, duration/easing or intermediate state. These endpoints show a replacement of compositions, not a specified snowflake-to-throne transformation. Decide transition behavior, trigger, replay/reset, interruption, keyboard/touch access and a prefers-reduced-motion alternative in the later interaction/motion stage. No transition, animation or new component separation has been implemented.
