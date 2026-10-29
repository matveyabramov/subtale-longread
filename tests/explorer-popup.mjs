// Existing Playwright installation; run against npm run dev, no new dependencies.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await (process.env.QA_BROWSER === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5188';
const output = process.env.QA_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
const copy = [
  ['ЛЁД ЗДЕСЬ НИ ПРИ ЧЁМ', null, [
    'Break the ice — буквально «разбить лёд». Но на самом деле это выражение означает начать разговор и снять неловкость между людьми.',
    'Поэтому среди осколков появляется телефонная трубка. Здесь лёд разбивают не руками, а словами.']],
  ['ПОЧЕМУ ВЕЛОСИПЕД УПАЛ?', 'Why did the bicycle fall over? Because it was two-tired.', [
    'Two-tired — «с двумя шинами», а too tired — «слишком устал». На слух они звучат одинаково.',
    'Велосипед буквально «устал» и завалился. Шутка существует именно благодаря звучанию английских слов.']],
  ['ВИДЕТЬ ИЛИ ВСТРЕЧАТЬСЯ?', "I'm seeing someone.", [
    'Буквально — «Я кого-то вижу». Но seeing someone также означает «с кем-то встречаться» в романтическом смысле.',
    'Поэтому сначала ты видишь глаз, а затем — силуэты пары. Одна фраза, два разных прочтения.']],
  ['ЗИМА, КОТОРАЯ НЕ ПРО ПОГОДУ', null, [
    'Winter is coming — буквально «Зима близко».',
    'Но для зрителей Game of Thrones это ещё и девиз дома Старков — предупреждение о грядущей опасности.',
    'Поэтому снежинки превращаются в Железный трон. Без знания сериала второй смысл фразы легко пропустить.']],
];
const errors = [];
const snapshot = (section) => section.evaluate((s) => {
  const canvas = s.querySelector('[data-section-canvas]').getBoundingClientRect();
  const rect = (n) => { const r = n.getBoundingClientRect(); return [r.x - canvas.x, r.y - canvas.y, r.width, r.height]; };
  return { category: s.dataset.category, meaning: s.dataset.meaning,
    layers: [...s.querySelectorAll('[data-art-layer]')].map((n) => ({ rect: rect(n), style: n.getAttribute('style'), src: n.querySelector('img').src,
      mask: getComputedStyle(n).maskImage, transform: getComputedStyle(n).transform })),
    question: rect(s.querySelector('[role="tabpanel"] > button')), height: s.getBoundingClientRect().height };
});
try {
  for (const [width, height] of [[1920, 1080], [1440, 900], [768, 1024], [390, 844], [390, 240]]) {
    const touch = width <= 768;
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: touch, isMobile: touch });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${origin}/#blind-zones`);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#blind-zones');
    const trigger = section.locator('[role="tabpanel"] > button');
    const reveal = section.locator('[data-explorer-reveal]');
    const modal = page.getByRole('dialog', { name: /ЛЁД|ВЕЛОСИПЕД|ВИДЕТЬ|ЗИМА/ });
    const close = modal.getByRole('button', { name: 'Закрыть объяснение' });
    const activate = async (locator) => touch ? locator.tap() : locator.click();
    const url = page.url();
    for (let category = 0; category < 4; category++) {
      await activate(section.getByRole('tab').nth(category));
      for (const meaning of ['A', 'B']) {
        // Pointer stays on the question; B is set independently via the keyboard.
        if (!touch) await trigger.hover();
        if (await section.getAttribute('data-meaning') !== meaning) {
          await reveal.focus(); await page.keyboard.press('Enter');
        }
        await trigger.scrollIntoViewIfNeeded();
        const before = await snapshot(section);
        const position = await page.evaluate(() => ({ x: scrollX, y: scrollY, body: document.body.style.cssText, root: document.documentElement.style.cssText }));
        for (const method of ['close', 'Escape', 'backdrop']) {
          await activate(trigger);
          await close.waitFor();
          assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
          assert.equal(await modal.locator('h2').textContent(), copy[category][0]);
          assert.deepEqual(await modal.locator('[data-explanation-paragraph]').allTextContents(), copy[category][2]);
          assert.equal(await modal.locator('blockquote').count(), copy[category][1] ? 1 : 0);
          if (copy[category][1]) assert.equal(await modal.locator('blockquote').textContent(), copy[category][1]);
          assert.equal(await modal.locator('button').count(), 1);
          assert.equal(await modal.locator('img, svg, a').count(), 0);
          assert.equal(await section.getAttribute('data-meaning'), meaning);
          assert.equal(await page.evaluate(() => document.body.style.position), 'fixed');
          assert.equal(await close.evaluate((n) => n === document.activeElement), true);
          await page.keyboard.press('Shift+Tab');
          assert.equal(await modal.getByRole('region').evaluate((n) => n === document.activeElement), true);
          await page.keyboard.press('Tab');
          assert.equal(await close.evaluate((n) => n === document.activeElement), true);
          await page.keyboard.press('Tab');
          assert.equal(await modal.getByRole('region').evaluate((n) => n === document.activeElement), true);
          const layout = await modal.evaluate((d) => {
            const r = d.getBoundingClientRect(), body = d.querySelector('[role="region"]'), b = body.getBoundingClientRect();
            return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, overflow: d.scrollWidth > d.clientWidth,
              bodyOverflow: body.scrollWidth > body.clientWidth, scrollable: body.scrollHeight > body.clientHeight,
              bodyHeight: b.height, background: getComputedStyle(d.firstElementChild).backgroundColor };
          });
          assert(layout.left >= 14 && layout.top >= 14 && layout.right <= width - 14 && layout.bottom <= height - 14);
          assert(!layout.overflow && !layout.bodyOverflow && layout.bodyHeight > 0);
          assert.equal(layout.background, 'rgb(11, 13, 15)');
          if (height <= 240) {
            assert(layout.scrollable, 'short dialogs must scroll their contents');
            await modal.getByRole('region').evaluate((n) => { n.scrollTop = n.scrollHeight; });
            assert(await modal.getByRole('region').evaluate((n) => n.scrollTop > 0));
          }
          if (method === 'close') {
            // Reading and pressing text inside must not dismiss the modal.
            await activate(modal.locator('h2'));
            assert.equal(await modal.count(), 1);
            if (output && meaning === 'B') await page.screenshot({ path: `${output}/${width}-${height}-${category}.png` });
            await activate(close);
          } else if (method === 'Escape') await page.keyboard.press('Escape');
          else {
            if (touch) await page.touchscreen.tap(3, 3); else await page.mouse.click(3, 3);
          }
          await modal.waitFor({ state: 'detached' });
          assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
          assert.equal(await trigger.evaluate((n) => n === document.activeElement), true);
          assert.deepEqual(await page.evaluate(() => ({ x: scrollX, y: scrollY, body: document.body.style.cssText, root: document.documentElement.style.cssText })), position);
          assert.deepEqual(await snapshot(section), before, `${width}/${category}/${meaning}: artwork and layout unchanged`);
          assert.equal(page.url(), url);
        }
      }
    }
    await context.close();
    console.log(`${width}×${height}: all four approved texts, A/B, modal/focus trap, close/Escape/backdrop, scroll/focus restore and layout passed`);
  }
  // A popup opened while the mouse still previews B must not synthesize a new reveal.
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${origin}/#blind-zones`);
  const reveal = page.locator('[data-explorer-reveal]'), trigger = page.locator('#blind-zones [role="tabpanel"] > button');
  await reveal.hover();
  assert.equal(await page.locator('#blind-zones').getAttribute('data-meaning'), 'B');
  await trigger.focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#blind-zones').getAttribute('data-meaning'), 'B');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#blind-zones').getAttribute('data-meaning'), 'B');
  await page.waitForTimeout(100);
  assert.equal(await page.locator('#blind-zones').getAttribute('data-meaning'), 'B');
  // Resize the visible mobile area while the same dialog remains open.
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const phone = await mobile.newPage();
  await phone.goto(`${origin}/#blind-zones`);
  await phone.locator('#explorer-tab-reference').tap();
  await phone.locator('[data-explorer-reveal]').tap();
  const question = phone.locator('#blind-zones [role="tabpanel"] > button');
  await question.tap();
  for (const height of [667, 320, 844]) {
    await phone.setViewportSize({ width: 390, height });
    await phone.waitForFunction((height) => {
      const r = document.querySelector('#explorer-explanation').getBoundingClientRect();
      return r.top >= 14 && r.bottom <= height - 14;
    }, height);
    assert.equal(await phone.locator('#blind-zones').getAttribute('data-meaning'), 'B');
    assert.equal(await phone.evaluate(() => document.body.style.position), 'fixed');
  }
  await phone.keyboard.press('Escape');
  assert.equal(await question.evaluate((n) => n === document.activeElement), true);
  assert.equal(await phone.evaluate(() => document.body.style.position), '');
  await mobile.close();
  assert.deepEqual(errors, []);
  console.log('Dynamic mobile viewport changes preserve the open dialog and B state.');
  console.log('Hover-preview survives modal show/close without a new reveal; no browser errors.');
} finally { await browser.close(); }
