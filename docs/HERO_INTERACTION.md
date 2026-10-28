# Stage 3.2 — Hero Interaction

Status: **Awaiting Review**, 2026-10-28.

Figma source: file `H4HI00uGY2UOxpcfHogUat`, session `5e2fa6c2-048d-4417-9a30-64a4972889cc`. The old `10:688` panel no longer exists; the current popup frames are Desktop 1920 `85:1281` (panel `85:1514`), Desktop 1440 `85:1018` (`85:1238`), Tablet 768 `85:795` (`85:1007`), Mobile 390 `79:11644` (`79:12322`). These four panel subtrees were read with design context and screenshots. Text, black/white frame, yellow CTA, type and panel geometry follow them. Two smaller arrow SVGs are local Figma exports; Desktop reuses the existing matching CTA arrow.

- Initial Hero has no popup. First downward wheel, single-finger scroll or ArrowDown/PageDown/Space/End opens a native modal dialog. The document scroll lock exists only while it is open. Dialog overflow remains scrollable on short screens; backdrop stays visually transparent.
- Start → `#experiment-instructions`, Skip → `#emptiness`, primary Hero CTA → instructions. These actions unlock synchronously and focus the target heading. Escape/native dismissal unlocks and focuses the primary CTA. All exits resolve the introduction for the current page lifetime; no storage or opening animation.
- Modified inputs/zoom, editable controls, current contents menu, explicit same-page anchors, hash/history navigation and restored positions beyond Hero bypass the gate. Cleanup/pagehide releases the lock. Other compositions and Experiment behavior are unchanged.

Checks: production Chrome at 390×844, 768×1024, 1440×810, 1920×1080 and short 390×480/320; panel bounds, fonts/assets, focus, lock/release, no repeat, all four keyboard inputs, Start/Skip/CTA, direct hash, contents links and emulated touch passed. Real iPhone/Safari and assistive-technology testing were not performed. `npm run build` passed.

Additional `npm run assets:check` reports four pre-existing unregistered tracked rasters: `public/assets/images/hero/portrait-{1440,1920,390,768}.png`. The new SVG delivery catalogue verifies; the existing raster registry issue is outside this stage.

Next: user review; no Experiment interaction work.
