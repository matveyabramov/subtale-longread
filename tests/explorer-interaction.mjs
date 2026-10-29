// Run against npm run dev. PLAYWRIGHT_MODULE may point to an existing Playwright installation.
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await (process.env.QA_BROWSER === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5173';
const categories = ['idiom', 'pun', 'doubleMeaning', 'reference'];
const questions = ['Что за идиома?', 'Что за pun?', 'Что за double meaning?', 'Что за отсылка?'];
const artwork = ['ice', 'bicycle', 'eye', 'snowflake'];
const errors = [];
const baseline = process.env.QA_BASELINE ? JSON.parse(await readFile(process.env.QA_BASELINE, 'utf8')) : null;
const output = process.env.QA_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
try {
  for (const [width, height] of [[1920, 1080], [1440, 900], [768, 1024], [390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: width <= 768, isMobile: width <= 768 });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    // A fresh direct anchor bypasses the out-of-scope Hero introduction.
    await page.goto(`${origin}/#blind-zones`);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#blind-zones');
    const tabs = section.getByRole('tab');
    const panel = section.getByRole('tabpanel');
    const question = panel.locator('button:not([data-explorer-reveal])');
    const select = async (index) => width <= 768 ? tabs.nth(index).tap() : tabs.nth(index).click();
    const settle = () => section.evaluate(async (s) => Promise.all([...s.querySelectorAll('img')].map((i) => i.decode())));
    const heightBefore = await section.evaluate((s) => s.getBoundingClientRect().height);
    const url = page.url();
    assert.equal(await tabs.count(), 4);
    assert.equal(await section.getAttribute('data-category'), 'idiom');
    for (let index = 0; index < categories.length; index++) {
      // Ensure the click itself, rather than Playwright's auto-scroll, is measured.
      await tabs.nth(index).scrollIntoViewIfNeeded();
      const scrollBefore = await page.evaluate(() => scrollY);
      await select(index);
      await settle();
      assert.equal(await section.getAttribute('data-category'), categories[index]);
      assert.equal(await section.getAttribute('data-meaning'), 'A');
      assert.equal(await question.textContent(), questions[index]);
      const description = await section.locator('[data-active="true"] p').last().textContent();
      assert.equal(await panel.locator('p').first().textContent(), description);
      assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true');
      assert.equal(await section.locator('[role="tab"][aria-selected="true"]').count(), 1);
      assert.equal(await panel.getAttribute('aria-labelledby'), await tabs.nth(index).getAttribute('id'));
      assert.equal(await panel.getByRole('img').count(), 1);
      assert(await section.locator(`[data-art-layer="${artwork[index]}"]`).count() > 0);
      assert.equal(page.url(), url);
      assert.equal(await page.evaluate(() => scrollY), scrollBefore);
      assert.equal(await section.evaluate((s) => s.getBoundingClientRect().height), heightBefore);
      assert.equal(await section.evaluate((s) => s.scrollWidth > s.clientWidth), false);
      assert.equal(await tabs.nth(index).evaluate((t) => getComputedStyle(t.parentElement).backgroundColor), 'rgb(254, 209, 40)');
      assert.equal(await tabs.nth(index).evaluate((t) => getComputedStyle(t.parentElement).borderTopColor), 'rgba(0, 0, 0, 0)');
      if (baseline) {
        const actual = await section.evaluate((s) => {
          const root = s.getBoundingClientRect();
          const nodes = [...s.querySelectorAll('[data-section-canvas], [data-active], [data-art-layer], button')].filter((n) => n.role !== 'tab' && !n.hasAttribute('data-explorer-reveal'));
          return nodes.map((n) => { const r = n.getBoundingClientRect(); return { x: r.x - root.x, y: r.y - root.y, w: r.width, h: r.height }; });
        });
        const expected = baseline[`${width}-${categories[index]}`];
        assert.equal(actual.length, expected.length);
        for (let i = 0; i < actual.length; i++) {
          for (const axis of ['x', 'y', 'w', 'h']) {
            const a = actual[i][axis] - (axis === 'x' || axis === 'y' ? actual[0][axis] : 0);
            const e = expected[i][axis] - (axis === 'x' || axis === 'y' ? expected[0][axis] : 0);
            assert(Math.abs(a - e) < 0.03, `${width}/${categories[index]} slot ${i} ${axis}: ${a} != ${e}`);
          }
        }
      }
      await question.scrollIntoViewIfNeeded();
      const questionScroll = await page.evaluate(() => scrollY);
      if (width <= 768) await question.tap(); else await question.click();
      await page.keyboard.press('Escape');
      await page.locator('#explorer-explanation').waitFor({ state: 'detached' });
      assert.equal(await section.getAttribute('data-meaning'), 'A');
      assert.equal(page.url(), url);
      assert.equal(await page.evaluate(() => scrollY), questionScroll);
      if (output) await section.screenshot({ path: `${output}/${width}-${categories[index]}.png` });
    }
    await page.locator('#movies').evaluate((s) => s.scrollIntoView());
    await section.evaluate((s) => s.scrollIntoView());
    assert.equal(await section.getAttribute('data-category'), 'reference');
    await tabs.nth(0).focus();
    await page.keyboard.press('ArrowUp');
    assert.equal(await tabs.nth(3).evaluate((t) => document.activeElement === t), true);
    await page.keyboard.press('Home');
    assert.equal(await tabs.nth(0).evaluate((t) => document.activeElement === t), true);
    const keyboardScroll = await page.evaluate(() => scrollY);
    await page.keyboard.press('ArrowDown');
    assert.equal(await tabs.nth(1).evaluate((t) => document.activeElement === t), true);
    assert.equal(await section.getAttribute('data-category'), 'reference');
    assert.equal(await tabs.nth(1).evaluate((t) => t.matches(':focus-visible') && getComputedStyle(t).outlineStyle !== 'none'), true);
    await page.keyboard.press('Enter');
    assert.equal(await section.getAttribute('data-category'), 'pun');
    assert.equal(await page.evaluate(() => scrollY), keyboardScroll);
    assert.equal(page.url(), url);
    await page.keyboard.press('End');
    await page.keyboard.press('Space');
    assert.equal(await section.getAttribute('data-category'), 'reference');
    await page.keyboard.press('Home');
    await page.keyboard.press('Tab');
    assert.equal(await question.evaluate((t) => document.activeElement === t), true);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await tabs.nth(3).evaluate((t) => document.activeElement === t), true);
    if (width > 768) {
      await tabs.nth(0).hover();
      assert.equal(await tabs.nth(0).evaluate((t) => getComputedStyle(t.parentElement).backgroundColor), 'rgb(254, 209, 40)');
      assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'false');
      assert.equal(await section.getAttribute('data-category'), 'reference');
    }
    await page.reload();
    assert.equal(await section.getAttribute('data-category'), 'idiom');
    assert.equal(await section.getAttribute('data-meaning'), 'A');
    await context.close();
    console.log(`${width}: categories, images, copy, geometry, URL/scroll, touch/click, keyboard/focus, persistence/reload passed`);
  }
  // Seed B through the isolated fixture to verify per-category memory independently of input.
  const page = await browser.newPage();
  await page.route('**/qa/explorer.html?*', async (route) => {
    const response = await route.fetch();
    const fixture = new URL(route.request().url()).searchParams.get('fixture');
    await route.fulfill({ response, body: (await response.text()).replace('data-explorer-fixture="idiom-A"', `data-explorer-fixture="${fixture}"`) });
  });
  for (const category of categories) {
    await page.goto(`${origin}/qa/explorer.html?fixture=${category}-B`);
    const section = page.locator('#blind-zones');
    assert.equal(await section.getAttribute('data-meaning'), 'B');
    const other = categories.find((id) => id !== category);
    await page.locator(`#explorer-tab-${other}`).click();
    assert.equal(await section.getAttribute('data-meaning'), 'A');
    await page.locator(`#explorer-tab-${category}`).click();
    assert.equal(await section.getAttribute('data-meaning'), 'B');
  }
  assert.deepEqual(errors, []);
  console.log('Independent per-category A/B memory passed; no browser errors.');
} finally {
  await browser.close();
}
