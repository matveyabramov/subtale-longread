// Run against npm run dev; uses an existing Playwright installation.
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5184';
const categories = ['idiom', 'pun', 'doubleMeaning', 'reference'];
const baseline = process.env.QA_BASELINE ? JSON.parse(await readFile(process.env.QA_BASELINE, 'utf8')) : null;
const errors = [];
const output = process.env.QA_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
try {
  for (const [width, height] of [[1920, 1080], [1440, 900], [768, 1024], [390, 844]]) {
    const touch = width <= 768;
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: touch, isMobile: touch });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${origin}/#blind-zones`);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#blind-zones');
    const control = section.locator('[data-explorer-reveal]');
    const question = section.locator('button:not([role="tab"]):not([data-explorer-reveal])');
    const tabs = section.getByRole('tab');
    let url = page.url();
    const select = async (index) => touch ? tabs.nth(index).tap() : tabs.nth(index).click();
    const check = async (meaning) => {
      assert.equal(await section.getAttribute('data-meaning'), meaning);
      assert.equal(await control.getAttribute('aria-pressed'), String(meaning === 'B'));
      assert.equal(page.url(), url);
      await section.evaluate(async (s) => Promise.all([...s.querySelectorAll('img')].map((i) => i.decode())));
    };
    for (let index = 0; index < categories.length; index++) {
      await select(index);
      await check('A');
      const initialHeight = await section.evaluate((s) => s.getBoundingClientRect().height);
      await control.scrollIntoViewIfNeeded();
      const buttonBounds = await control.boundingBox();
      const selected = await tabs.nth(index).getAttribute('aria-selected');
      if (!touch) {
        await control.hover();
        await check('B');
        // A stable hit region must not shrink when endpoint B replaces A.
        assert.deepEqual(await control.boundingBox(), buttonBounds);
        await page.waitForTimeout(100);
        await check('B');
        await control.click();
        await check('B'); // Mouse click is not a second toggle.
        await tabs.nth(index).hover();
        await check('A');
        await tabs.nth((index + 1) % 4).hover();
        await check('A'); // Category hover never reveals artwork.
      } else {
        await control.scrollIntoViewIfNeeded();
        const scroll = await page.evaluate(() => scrollY);
        await control.tap();
        await check('B');
        assert.equal(await page.evaluate(() => scrollY), scroll);
        await control.tap();
        await check('A');
        await control.tap();
        await check('B');
        await question.tap();
        await page.keyboard.press('Escape');
        await page.locator('#explorer-explanation').waitFor({ state: 'detached' });
        await check('B'); // Lower question cannot reset/toggle the artwork.
        await select((index + 1) % 4);
        await select(index);
        await check('B');
        await page.locator('#movies').evaluate((s) => s.scrollIntoView());
        await section.evaluate((s) => s.scrollIntoView());
        await check('B');
      }
      await control.focus();
      const beforeKey = await section.getAttribute('data-meaning');
      const scroll = await page.evaluate(() => scrollY);
      await page.keyboard.press('Enter');
      await check(beforeKey === 'A' ? 'B' : 'A');
      assert.equal(await page.evaluate(() => scrollY), scroll);
      assert.equal(await control.evaluate((n) => document.activeElement === n && n.matches(':focus-visible') && getComputedStyle(n).outlineStyle !== 'none'), true);
      await page.keyboard.press('Space');
      await check(beforeKey);
      assert.equal(await page.evaluate(() => scrollY), scroll);
      assert.equal(await section.evaluate((s) => s.getBoundingClientRect().height), initialHeight);
      assert.equal(await tabs.nth(index).getAttribute('aria-selected'), selected);
      assert.equal(await section.getAttribute('data-category'), categories[index]);
      assert.equal(await section.evaluate((s) => s.scrollWidth > s.clientWidth), false);
      if (output) await section.screenshot({ path: `${output}/${width}-${categories[index]}.png` });
      // Leave each category at A so the next test starts independently.
      if (beforeKey === 'B') { await page.keyboard.press('Enter'); await check('A'); }
    }
    if (touch) {
      await control.scrollIntoViewIfNeeded();
      const box = await control.boundingBox();
      const x = Math.max(15, Math.min(width - 15, box.x + box.width / 2));
      const y = Math.max(120, Math.min(height - 60, box.y + box.height / 2));
      const cdp = await context.newCDPSession(page);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (const delta of [15, 35, 65, 100]) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - delta }] });
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await check('A');
      await cdp.detach();
    }
    // Keyboard sets independent memories, and ordinary Tab reaches the control.
    for (let index = 0; index < 4; index++) {
      await select(index);
      await control.focus();
      await page.keyboard.press('Enter');
      await check('B');
    }
    for (let index = 0; index < 4; index++) { await select(index); await check('B'); }
    await tabs.nth(3).focus();
    await page.keyboard.press('Tab');
    assert.equal(await question.evaluate((n) => n === document.activeElement), true);
    await page.keyboard.press('Tab');
    assert.equal(await control.evaluate((n) => n === document.activeElement), true);
    await page.reload();
    url = page.url();
    assert.equal(await section.getAttribute('data-category'), 'idiom');
    await check('A');
    for (let index = 0; index < 4; index++) { await select(index); await check('A'); }
    console.log(`${width}: all four hover/touch/keyboard pairs, independent memory/reload, categories, question, URL/scroll and layout passed`);
    await context.close();
  }
  // Verify all original A/B slots, image paths and transforms without hover.
  const page = await browser.newPage();
  await page.route('**/qa/explorer.html?*', async (route) => {
    const response = await route.fetch();
    const fixture = new URL(route.request().url()).searchParams.get('fixture');
    await route.fulfill({ response, body: (await response.text()).replace('data-explorer-fixture="idiom-A"', `data-explorer-fixture="${fixture}"`) });
  });
  for (const width of [1920, 1440, 768, 390]) for (const category of categories) for (const meaning of ['A', 'B']) {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto(`${origin}/qa/explorer.html?fixture=${category}-${meaning}`);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#blind-zones');
    await section.evaluate(async (s) => Promise.all([...s.querySelectorAll('img')].map((i) => i.decode())));
    assert.equal(await section.getAttribute('data-meaning'), meaning);
    if (baseline) {
      const rects = await section.evaluate((s) => {
        const root = s.getBoundingClientRect();
        return [...s.querySelectorAll('[data-section-canvas], [data-active], [data-art-layer], button')]
          .filter((n) => !n.hasAttribute('data-explorer-reveal'))
          .map((n) => { const r = n.getBoundingClientRect(); return { x: r.x - root.x, y: r.y - root.y, w: r.width, h: r.height }; });
      });
      const original = baseline[`${width}-${category}-${meaning}`];
      assert.deepEqual(rects, original, `${width}/${category}/${meaning} original geometry`);
    }
  }
  assert.deepEqual(errors, []);
  console.log(baseline ? 'All 32 A/B endpoint geometries match the supplied baseline; no browser errors.' : 'All 32 A/B endpoints render; no browser errors.');
} finally { await browser.close(); }
