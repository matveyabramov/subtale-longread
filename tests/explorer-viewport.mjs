// Run against npm run dev with an existing Playwright installation.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await (process.env.QA_BROWSER === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5187';
const output = process.env.QA_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
const errors = [];
const sizes = [[1920, 1080], [1440, 900], [768, 1024], [390, 844], [390, 667], [390, 450], [1440, 500]];
try {
  for (const [width, height] of sizes) {
    const touch = width <= 768;
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: touch, isMobile: touch });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${origin}/#blind-zones`);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#blind-zones');
    const reveal = section.locator('[data-explorer-reveal]');
    const tabs = section.getByRole('tab');
    const question = section.locator('[role="tabpanel"] > button');
    const url = page.url();
    let originalIce;
    for (let category = 0; category < 4; category++) {
      if (touch) await tabs.nth(category).tap(); else await tabs.nth(category).click();
      for (const meaning of ['A', 'B', 'A']) {
        if (meaning !== await section.getAttribute('data-meaning')) {
          // Keep the pointer on a tab while native keyboard input toggles.
          await reveal.focus();
          await page.keyboard.press('Enter');
        }
        assert.equal(await section.getAttribute('data-meaning'), meaning);
        await section.evaluate(async (s) => Promise.all([...s.querySelectorAll('img')].map((i) => i.decode())));
        const r = await section.evaluate((s) => {
          const canvas = s.querySelector('[data-section-canvas]'), question = s.querySelector('[role="tabpanel"] > button');
          const stage = s.querySelector('[data-explorer-reveal]').parentElement;
          const root = s.getBoundingClientRect();
          const rect = (n) => { const r = n.getBoundingClientRect(); return { x: r.x - root.x, y: r.y - root.y, w: r.width, h: r.height }; };
          const layers = [...s.querySelectorAll('[data-art-layer]')];
          const controls = [...s.querySelectorAll('[role="tab"], [data-explorer-reveal], [role="tabpanel"] > button')];
          return { h: root.height, question: rect(question), stage: rect(stage), canvas: rect(canvas),
            heading: rect(s.querySelector('h2').parentElement), categories: rect(s.querySelector('[role="tablist"]')),
            desc: rect(s.querySelector('[role="tabpanel"] > p')), layers: layers.map(rect),
            ice: layers.filter((n) => n.dataset.artLayer === 'ice').map(rect),
            controls: controls.map(rect), overflow: s.scrollWidth > s.clientWidth,
            fixedQuestion: getComputedStyle(question).position === 'fixed',
            scrollLock: document.body.style.position === 'fixed',
            typography: [...s.querySelectorAll('[role="tab"] + div h3')].map((n) => getComputedStyle(n).fontSize),
            clippedCards: [...s.querySelectorAll('[data-active]')].some((n) => {
              const r = n.getBoundingClientRect(), content = n.querySelector('h3').getBoundingClientRect();
              return content.right > r.right + 1 || content.bottom > r.bottom + 1;
            }),
            phoneZ: Number(getComputedStyle(s.querySelector('[data-art-layer="telephone"]') || canvas).zIndex),
            bannerZ: Number(getComputedStyle(s.querySelector('h2 + p')).zIndex),
            iceZ: layers.filter((n) => n.dataset.artLayer === 'ice').map((n) => Number(getComputedStyle(n).zIndex)),
          };
        });
        const label = `${width}×${height}, category ${category}, ${meaning}`;
        const standard = height >= 667;
        if (standard) assert(Math.abs(r.h - height) < 1, `${label}: one viewport (${r.h})`);
        else assert(r.h > height, `${label}: short viewport grows naturally`);
        assert(!r.overflow && !r.fixedQuestion && !r.scrollLock && !r.clippedCards, label);
        assert(r.question.y + r.question.h <= r.h - 14, `${label}: safe bottom inset`);
        assert(r.stage.y + r.stage.h <= r.question.y + 1, `${label}: artwork before question`);
        assert(r.heading.y + r.heading.h <= r.stage.y + 1, `${label}: artwork below heading`);
        if (touch) {
          assert(r.categories.y + r.categories.h <= r.desc.y + 1, `${label}: category grid before description`);
          assert(r.desc.y + r.desc.h <= r.stage.y + 1, `${label}: artwork below description`);
        }
        for (const box of r.controls) assert(box.w >= 44 && box.h >= 44, `${label}: minimum hit area`);
        for (const box of r.layers) {
          assert(box.x >= r.stage.x - 1 && box.x + box.w <= r.stage.x + r.stage.w + 1, `${label}: artwork fits width`);
          assert(box.y >= r.stage.y - 1 && box.y + box.h <= r.stage.y + r.stage.h + 1, `${label}: artwork fits height`);
        }
        if (category === 0) {
          if (meaning === 'A') originalIce = r.ice;
          else {
            assert.deepEqual(r.ice, originalIce, `${label}: stationary ice`);
            assert(r.bannerZ < r.phoneZ && r.iceZ[0] < r.phoneZ && r.iceZ.slice(1).every((z) => z > r.phoneZ), `${label}: phone order`);
          }
        }
        assert.equal(page.url(), url);
        if (output && meaning === 'B' && standard) {
          await section.screenshot({ path: `${output}/${width}-${height}-${category}-B.png` });
        }
      }
    }
    // Real pointer/touch activation after the fit, followed by keyboard focus.
    if (touch) { await reveal.tap(); assert.equal(await section.getAttribute('data-meaning'), 'B'); await reveal.tap(); }
    else { await reveal.hover(); assert.equal(await section.getAttribute('data-meaning'), 'B'); await tabs.first().hover(); }
    assert.equal(await section.getAttribute('data-meaning'), 'A');
    await question.scrollIntoViewIfNeeded();
    assert(await question.isVisible());
    console.log(`${width}×${height}: all categories A/B/A fit, controls and artwork do not intersect, touch/hover passed.`);
    await context.close();
  }
  // Same mounted state follows browser chrome/orientation height changes.
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(`${origin}/#blind-zones`);
  await page.locator('#explorer-tab-reference').tap();
  const reveal = page.locator('[data-explorer-reveal]');
  await reveal.tap();
  for (const height of [667, 740, 844, 450, 844]) {
    await page.setViewportSize({ width: 390, height });
    await page.waitForFunction((height) => {
      const r = document.getElementById('blind-zones').getBoundingClientRect();
      return height < 600 ? r.height > height : Math.abs(r.height - height) < 1;
    }, height);
    assert.equal(await page.locator('#blind-zones').getAttribute('data-category'), 'reference');
    assert.equal(await page.locator('#blind-zones').getAttribute('data-meaning'), 'B');
  }
  assert.deepEqual(errors, []);
  console.log('Dynamic height changes preserve category/B state; no browser errors.');
  await context.close();
} finally { await browser.close(); }
