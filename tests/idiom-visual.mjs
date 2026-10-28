// Existing Playwright installation, local npm run dev; no installs required.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5186';
const baseline = process.env.QA_BASELINE ? JSON.parse(await readFile(process.env.QA_BASELINE, 'utf8')) : null;
const captured = {};
const errors = [];
const output = process.env.QA_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
const snapshot = (section) => section.evaluate((s) => {
  const canvas = s.querySelector('[data-section-canvas]');
  const root = canvas.getBoundingClientRect();
  const rect = (n) => { const r = n.getBoundingClientRect(); return [r.x - root.x, r.y - root.y, r.width, r.height]; };
  return [...s.querySelectorAll('[data-art-layer]')].map((n) => {
    const css = getComputedStyle(n), image = n.querySelector('img'), imageCss = getComputedStyle(image);
    return { type: n.dataset.artLayer, rect: rect(n), source: image.getAttribute('src'), imageRect: rect(image),
      mask: [css.maskImage, css.maskSize, css.maskPosition, css.maskRepeat], transform: css.transform,
      crop: [imageCss.width, imageCss.height, imageCss.left, imageCss.top, imageCss.objectFit], z: css.zIndex };
  });
});
const geometry = (rows) => rows.map(({ z, ...rest }) => rest);
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route('**/qa/explorer.html?*', async (route) => {
    const response = await route.fetch(), fixture = new URL(route.request().url()).searchParams.get('fixture');
    await route.fulfill({ response, body: (await response.text()).replace('data-explorer-fixture="idiom-A"', `data-explorer-fixture="${fixture}"`) });
  });
  for (const width of [1920, 1440, 768, 390]) {
    for (const category of ['idiom', 'pun', 'doubleMeaning', 'reference']) for (const meaning of ['A', 'B']) {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto(`${origin}/qa/explorer.html?fixture=${category}-${meaning}`);
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator('#blind-zones');
      await section.evaluate(async (s) => Promise.all([...s.querySelectorAll('img')].map((i) => i.decode())));
      const key = `${width}-${category}-${meaning}`, current = await snapshot(section);
      captured[key] = current;
      if (process.env.QA_CAPTURE) continue;
      if (category !== 'idiom' && baseline) assert.deepEqual(current, baseline[key], `${key}: other category unchanged`);
      if (category === 'idiom' && meaning === 'A' && baseline) assert.deepEqual(current, baseline[key], `${key}: A unchanged`);
      if (category === 'idiom' && meaning === 'B') {
        const ice = current.filter((r) => r.type === 'ice'), phone = current.filter((r) => r.type === 'telephone');
        assert.equal(ice.length, 8);
        assert.equal(phone.length, 1);
        assert.deepEqual(geometry(ice), geometry(captured[`${width}-idiom-A`]), `${width}: identical ice geometry/crops/masks`);
        if (baseline) assert.deepEqual(geometry(phone), geometry(baseline[key].filter((r) => r.type === 'telephone')), `${width}: phone geometry unchanged`);
        const layers = await section.evaluate((s) => {
          const canvas = s.querySelector('[data-section-canvas]'), phone = s.querySelector('[data-art-layer="telephone"]');
          const banner = s.querySelector('[data-node-id="10:1626"]');
          const ice = [...s.querySelectorAll('[data-art-layer="ice"]')];
          // Ancestors must share the canvas stacking context at every breakpoint.
          const context = (n) => {
            for (let p = n.parentElement; p; p = p.parentElement) {
              const c = getComputedStyle(p), parent = p.parentElement && getComputedStyle(p.parentElement);
              if (c.isolation === 'isolate' || c.transform !== 'none' || c.filter !== 'none' || c.backdropFilter !== 'none' || Number(c.opacity) < 1 ||
                (c.zIndex !== 'auto' && (c.position !== 'static' || /flex|grid/.test(parent?.display || '')))) return p === canvas;
            }
            return false;
          };
          return { commonCanvas: [phone, banner, ...ice].every(context), phone: Number(getComputedStyle(phone).zIndex),
            banner: Number(getComputedStyle(banner).zIndex), ice: ice.map((n) => Number(getComputedStyle(n).zIndex)) };
        });
        assert(layers.commonCanvas, `${width}: no trapping ancestor stacking context`);
        assert(layers.ice[0] < layers.phone && layers.banner < layers.phone);
        assert(layers.ice.slice(1).every((z) => z > layers.phone));
        if (output) await section.screenshot({ path: `${output}/${width}-idiom-B.png` });
      }
    }
  }
  if (process.env.QA_CAPTURE) {
    await writeFile(process.env.QA_CAPTURE, JSON.stringify(captured));
    console.log('Captured all 32 pre-fix artwork endpoints.');
  } else {
    await page.close();
    for (const [width, height] of [[1920, 1080], [1440, 900], [768, 1024], [390, 844]]) {
      const touch = width <= 768;
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: touch, isMobile: touch });
      const p = await context.newPage();
      p.on('pageerror', (e) => errors.push(e.message));
      await p.goto(`${origin}/#blind-zones`);
      await p.evaluate(() => document.fonts.ready);
      const section = p.locator('#blind-zones'), reveal = section.locator('[data-explorer-reveal]');
      await reveal.scrollIntoViewIfNeeded();
      const a = await snapshot(section);
      if (touch) await reveal.tap(); else await reveal.hover();
      assert.equal(await section.getAttribute('data-meaning'), 'B');
      assert.deepEqual(geometry((await snapshot(section)).filter((r) => r.type === 'ice')), geometry(a));
      if (touch) await reveal.tap(); else await section.getByRole('tab').first().hover();
      assert.equal(await section.getAttribute('data-meaning'), 'A');
      assert.deepEqual(await snapshot(section), a, `${width}: A→B→A restores exact artwork`);
      await context.close();
      console.log(`${width}: A→B→A, stationary ice, original phone geometry and layer hierarchy passed.`);
    }
    assert.deepEqual(errors, []);
    console.log('Other categories unchanged; no browser errors.');
  }
} finally { await browser.close(); }
