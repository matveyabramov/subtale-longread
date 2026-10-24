# SUBTALE — Figma audit (Stage 0.1)

Current override (Stage 0.3 Approved, 2026-10-24): this document retains historical audit observations. D01–D11 in INTERACTION_SPEC.md supersede its open decisions: Experiment has three in-flow screens; explorer is one four-category A/B section; all editorial text, headings, numbers (including «98%») and meanings are approved and must not be fact-checked or edited. Only TT Bluescreens Trial and IBM Plex Mono are used.

Status: **structural inventory complete, visual deep QA and asset extraction pending**. Audited 2026-10-24 using Figma MCP on file key `H4HI00uGY2UOxpcfHogUat`, page `0:1`. Figma is read-only throughout. Current design supplies **1920px-wide frames only**. No implementation has started.

## Top-level frame inventory

19 top-level frames, representing ~10 narrative sections: three experiment screens and four pairs of interactive states are **alternatives / states**, not additional stacked longread sections.

| Order / state | Figma frame | node-id | Size | Notes |
|---|---|---|---|---|
| 01 | [Hero](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-472) | `10:472` | 1920 × 1080 | First screen: title, collage, logo, table of contents, experiment CTA, hint/skip layers |
| 02a | [Experiment-1](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-718) | `10:718` | 1920 × 1080 | Instructions, continue, skip |
| 02b | [Experiment-2](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-730) | `10:730` | 1920 × 1080 | Cross/dot, troubleshooting overlay, done CTA |
| 02c | [Experiment-3](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-760) | `10:760` | 1920 × 1080 | Result and explanation CTA |
| 03 | [Emptiness](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-838) | `10:838` | 1920 × 1080 | Blind-spot explanation, two cutout people, pixel masking |
| 04 | [Elephant](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-917) | `10:917` | 1920 × 2187 | Idiom artwork and four interpretation levels |
| 05a | [Blind-zones_idiom-1](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1431) | `10:1431` | 1920 × 1080 | Idiom first state |
| 05b | [Blind-zones_idiom-2](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1596) | `10:1596` | 1920 × 1080 | Idiom second state |
| 05c | [Blind-zones_pun-1](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1495) | `10:1495` | 1920 × 1080 | Pun first state |
| 05d | [Blind-zones_pun-2](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1981) | `10:1981` | 1920 × 1080 | Pun second state |
| 05e | [Blind-zones_dmeaning-1](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1528) | `10:1528` | 1920 × 1080 | Double meaning first state |
| 05f | [Blind-zones_dmeaning-2](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-2017) | `10:2017` | 1920 × 1080 | Double meaning second state |
| 05g | [Blind-zones_ref-1](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1560) | `10:1560` | 1920 × 1080 | Cultural reference first state |
| 05h | [Blind-zones_ref-2](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-2049) | `10:2049` | 1920 × 1080 | Cultural reference second state |
| 06 | [Movies](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1794) | `10:1794` | 1920 × 1899 | Five film/series cases |
| 07 | [Vocab](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-966) | `10:966` | 1920 × 1080 | Vocabulary does not guarantee comprehension |
| 08 | [Blind-spot-scene](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-997) | `10:997` | 1920 × 1080 | Blind-spot graphic connects familiar dialogue with unexpected reactions |
| 09 | [What-to-do](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1272) | `10:1272` | 1920 × 1080 | Watch-now and revisit-later guidance |
| 10 | [Footer](https://www.figma.com/design/H4HI00uGY2UOxpcfHogUat/Subtale?node-id=10-1016) | `10:1016` | 1920 × 1334 | Editorial conclusion, credits and collage |

## Section contract (initial)

1. Hero `10:472`: logo/nav, headline, hero collage, CTA. Hint layer contains Start and Skip actions.
2. Experiment `10:718`/`10:730`/`10:760`: three visual stages with cross/dot, troubleshooting, progression/skip. Determine whether final implementation is modal, fullscreen stepper or a hybrid before code.
3. Emptiness `10:838`: explanation of blind spot + layered character/pixel collage.
4. Elephant `10:917`: `the elephant in the room`; four levels Words / Construction / Context / Cultural knowledge. Tall 2187px frame (background fill extends beyond frame in metadata — check clipping during implementation).
5. Blind zones `10:1431` etc: a **single explorer** with four categories and two Figma states each. Idiom, pun, double meaning and cultural reference; do **not** render eight separate full-height sections by default.
6. Movies `10:1794`: five cases — Airplane! (1980); Back to the Future Part II (1989); Austin Powers: International Man of Mystery (1997); Sherlock S02E01; The Shining (1980). Text/scene/source checks pending. 1899px height.
7. Vocab `10:966`: language comprehension statement. Contains vector artwork; do not infer an exact numeric statistic from vector outlines without inspection.
8. Blind-spot-scene `10:997`: three statement/reaction pairs, large central circular graphic.
9. What-to-do `10:1272`: two instructional groups (during viewing / afterward).
10. Footer `10:1016`: concluding sentence and credits. 1334px tall; editorial copy still subject to user approval.

## High-confidence design observations

- Colours repeatedly exposed in design context: `#012ED7` blue, `#FED128` yellow, `#0B0D0F` near-black, `#EEEEE7` off-white.
- Font families found in retrieved layer styles: `TT Bluescreens Trial` (Bold / ExtraBold), `IBM Plex Mono` (Medium / SemiBold), plus `Inter` in Footer. These are layer observations, not an audited font inventory or licence verification.
- Images/texture are substantial, with many raster compositions and individual vector layers. Do not substitute screenshots for HTML.
- The four paired explorer states reside in two canvas columns (second states at x≈6298); spatial Figma placement is **not** the website reading order.
- A viewport height of exactly 1080px is the design baseline, **not** a requirement to force all sections into 100vh.

## Scope and limits

Inspected document-wide node metadata and high-fidelity design context for Hero, Idiom, Movies, Blind-spot-scene and Footer. Full node-by-node code/asset extraction for all 19 frames has **not** been done deliberately, to conserve MCP output and Codex tokens. Figma variable-definition retrieval was unavailable without a selected layer; token values above are inferred from actual layer styles, **not** verified published variables.

## Decisions required before implementation

- Verify experiment presentation model and exit/skip logic against interaction intent.
- Confirm four paired frame states are initial/active and specify their trigger (hover/tap, scroll or click) in `MOTION_SPEC.md`.
- Audit actual MP4/video previews separately; Figma structure alone does not establish the underlying movie source or licensing.
- Confirm fonts/files and right to publish them. Do not copy legacy fonts automatically.
- Confirm concluding text and any statistics appearing as flattened/vector objects.
- Keep 1440, tablet and mobile design proposals subject to review; none has a reference frame.

## Next task

Stage 0.2 — targeted asset manifest and resource provenance, then Stage 0.3 — detailed motion and component contracts. Only after approval, initialize the app and implement the static 1920px desktop one frame at a time.
