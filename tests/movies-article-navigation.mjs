import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await (process.env.QA_BROWSER === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5176';
const films = ['airplane', 'backToTheFuture', 'austinPowers', 'sherlock', 'theShining'];
const output = process.env.QA_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
const errors = [];
try {
  for (const [width, height] of [[1920,1080],[1440,900],[768,1024],[390,844],[1440,500],[390,480]]) {
    const compact = width <= 1100 || height <= 550;
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: width <= 768, isMobile: width <= 768, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${origin}/#movies`);
    await page.evaluate(() => document.fonts.ready);
    for (const film of films) {
      const trigger = page.locator(`#movie-${film} [aria-haspopup="dialog"]`);
      await trigger.scrollIntoViewIfNeeded();
      const position = await page.evaluate(() => scrollY);
      await trigger.click();
      const dialog = page.locator('#movie-analysis[open]');
      await dialog.waitFor();
      const url = page.url();
      const nav = dialog.getByRole('navigation', { name: compact ? 'Разделы разбора' : 'Содержание разбора', exact: true, includeHidden: true });
      const toggle = dialog.getByRole('button', { name: 'Все разделы' });
      if (compact) {
        assert(await dialog.locator('[data-article-compact]').isVisible());
        assert(await dialog.locator('[data-article-compact]').getByText('ЛИСТАЙ НИЖЕ — ТАМ РАЗБОР', { exact: false }).isVisible());
        await toggle.click();
      }
      const buttons = nav.getByRole('button', { includeHidden: true });
      const labels = await buttons.allTextContents();
      const expected = await dialog.locator('[data-analysis~="case-section"] h3').allTextContents();
      assert.equal(labels.length, expected.length + 2);
      assert(labels[0].endsWith('Сцена')); assert(labels.at(-1).endsWith('Вывод'));
      expected.forEach((title, i) => assert(labels[i + 1].endsWith(title)));
      if (compact) await toggle.click();
      for (let index = 0; index < labels.length; index++) {
        if (compact) await toggle.click();
        await buttons.nth(index).click();
        if (compact) assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        await page.waitForTimeout(60);
        assert.equal(await buttons.nth(index).getAttribute('aria-current'), 'location', `${width}/${film}/${index}: ${await nav.locator('[aria-current]').textContent()}`);
        const id = await buttons.nth(index).getAttribute('aria-controls');
        const target = page.locator(`[id="${id}"]`);
        assert(await target.isVisible());
        if (film === 'austinPowers' && index === 2) assert.equal(await dialog.locator('[data-analysis="meaning-toggle"]').getAttribute('aria-expanded'), 'true');
        const rect = await target.boundingBox();
        const header = await dialog.locator('[data-article-header]').boundingBox();
        assert(rect.y >= header.y + header.height - 1, 'target must clear sticky header');
        assert.equal(page.url(), url);
        assert.equal(await page.evaluate(() => scrollY), 0, 'page remains locked');
      }
      // Manual internal scrolling must update the active section too.
      await dialog.evaluate(el => { el.scrollTop = 0; });
      await page.waitForFunction(() => document.querySelector('#movie-analysis [aria-current]')?.textContent.endsWith('Сцена'));
      if (!compact) {
        const navRect = await nav.boundingBox();
        const bodyRect = await dialog.locator('[data-article-body]').boundingBox();
        assert(navRect.x >= bodyRect.x + bodyRect.width, 'sidebar must not cover article');
        assert(await dialog.locator('video').evaluate(el => el.getBoundingClientRect().width >= 700));
      }
      assert.equal(await dialog.evaluate(el => el.scrollWidth > el.clientWidth), false);
      assert.equal(await dialog.locator('[data-close]').evaluate(el => getComputedStyle(el).borderTopWidth), '0px');
      if (output && film === 'airplane') await page.screenshot({ path: `${output}/${width}-${height}.png` });
      if (film === 'sherlock') await page.mouse.click(1, 1);
      else if (width <= 768) await dialog.getByRole('button', { name: 'Закрыть разбор' }).click();
      else await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'detached' });
      assert.equal(await trigger.evaluate(el => document.activeElement === el), true);
      assert.equal(await page.evaluate(() => scrollY), position);
    }
    console.log(`${width}x${height}: five articles, navigation, disclosure, sticky, focus and scroll passed`);
    await context.close();
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
