// Run against npm run preview (production); reuse Playwright via PLAYWRIGHT_MODULE.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await (process.env.QA_BROWSER === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.QA_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
const films = ['airplane', 'backToTheFuture', 'austinPowers', 'sherlock', 'theShining'];
const files = ['airplane-surely', 'back-to-the-future-tree', 'austin-powers-number-two', 'sherlock-sher-locked', 'the-shining-heres-johnny'];
const errors = [];
const wait = (page, fn, arg) => page.waitForFunction(fn, arg, { timeout: 10000 });
const activeFilm = (page) => page.locator('#movies [data-movie-case][data-preview-active="true"]').getAttribute('data-movie-case');
const playing = (page) => page.locator('#movies video').evaluateAll(videos => videos.filter(v => !v.paused).map(v => v.src));
const stopped = async (page) => {
  await wait(page, () => document.querySelector('[data-movie-preview]').dataset.visible === 'false');
  assert.deepEqual(await playing(page), []);
};
try {
  for (const width of [1920, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1080 } });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    let simultaneous = false;
    await page.exposeFunction('reportConcurrentMovies', () => { simultaneous = true; });
    await page.addInitScript(() => document.addEventListener('play', () => {
      if ([...document.querySelectorAll('video')].filter(v => !v.paused).length > 1) window.reportConcurrentMovies();
    }, true));
    await page.goto(`${origin}/#movies`);
    await page.evaluate(() => document.fonts.ready);
    // No MP4 loads before an interaction.
    assert.equal(await page.locator('#movies video[src]').count(), 0);
    for (const [index, id] of films.entries()) {
      const row = page.locator(`#movie-${id}`);
      await row.scrollIntoViewIfNeeded();
      await row.hover({ position: { x: width / 2, y: 65 } });
      await wait(page, id => document.querySelector(`[data-preview-film="${id}"] video`).currentTime > 0.1, id);
      assert.equal(await activeFilm(page), id);
      assert((await playing(page))[0].endsWith(`${files[index]}.mp4`));
      assert.equal((await playing(page)).length, 1);
      await page.waitForTimeout(250);
      const geometry = await page.locator('[data-movie-preview]').evaluate(el => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height, pointer: getComputedStyle(el).pointerEvents };
      });
      assert.deepEqual(geometry, { x: 0, y: 0, width, height: 1080, pointer: 'none' });
      assert.equal(await row.evaluate(el => getComputedStyle(el).opacity), '1');
      assert.equal(await page.locator(`[data-movie-case]:not(#movie-${id})`).first().evaluate(el => getComputedStyle(el).opacity), '0.4');
      // Stationary pointer remains inside this row after native wheel scrolling.
      const before = await row.locator('..').evaluate(() => scrollY);
      await page.mouse.wheel(0, 24);
      await wait(page, before => scrollY > before, before);
      await page.waitForTimeout(300);
      assert.equal(await activeFilm(page), id);
      assert.equal((await playing(page)).length, 1);
      if (output && index === 0) await page.screenshot({ path: `${output}/movies-${width}.png` });
      // The existing arrow and row button still open the corresponding analysis.
      await row.locator('button[aria-haspopup="dialog"]').click({ position: { x: width - 45, y: 55 } });
      await page.locator('#movie-analysis[open]').waitFor();
      assert.equal(await page.locator('#movie-analysis video').getAttribute('poster'), await row.evaluate((_, id) => document.querySelector(`[data-preview-film="${id}"]`).style.backgroundImage.slice(5, -2), id));
      assert.deepEqual(await playing(page), []);
      await page.keyboard.press('Escape');
      await page.locator('#movie-analysis').waitFor({ state: 'detached' });
    }
    // Geometry changes beneath an unmoving pointer must select the new row.
    const first = page.locator('#movie-airplane');
    await first.scrollIntoViewIfNeeded();
    await first.hover({ position: { x: width / 2, y: 110 } });
    const jump = await first.evaluate(el => {
      const next = document.querySelector('#movie-backToTheFuture');
      return next.getBoundingClientRect().top - el.getBoundingClientRect().top;
    });
    await page.mouse.wheel(0, jump);
    await wait(page, () => document.querySelector('#movie-backToTheFuture').dataset.previewActive === 'true');
    await wait(page, () => document.querySelector('[data-movie-list]').style.transform === '');
    // Move into a real gap: no stale preview survives without a hovered row.
    await page.locator('#movies-title').scrollIntoViewIfNeeded();
    await page.locator('#movies-title').hover();
    await stopped(page);
    // Rapid reversals and late play promises cannot play two files together.
    await first.scrollIntoViewIfNeeded();
    for (const id of ['airplane', 'backToTheFuture', 'airplane', 'austinPowers']) {
      await page.locator(`#movie-${id}`).hover({ position: { x: width / 2, y: 60 } });
    }
    await page.waitForTimeout(500);
    assert.equal(await activeFilm(page), 'austinPowers');
    assert.equal(simultaneous, false);
    // Any other dialog must also stop playback.
    await page.getByRole('button', { name: 'Оглавление', exact: true }).click();
    await stopped(page);
    await page.keyboard.press('Escape');
    // Hidden-tab lifecycle; use the browser event with a controlled visibility getter.
    await first.hover({ position: { x: width / 2, y: 80 } });
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await stopped(page);
    await page.evaluate(() => { delete document.hidden; });
    await page.mouse.move(1, 1);
    await first.hover({ position: { x: width / 2, y: 80 } });
    // A fixed video must be physically clipped where Movies ends, even while active.
    await page.mouse.move(width / 2, 1070);
    await page.locator('#movies').evaluate(el => scrollTo(0, el.getBoundingClientRect().bottom + scrollY - 540));
    await page.mouse.move(width / 2, 1070);
    await stopped(page);
    await wait(page, () => document.querySelector('[data-movie-list]').style.transform === '');
    await page.waitForTimeout(250);
    const clip = { x: 0, y: 550, width, height: 530 };
    const outsideBefore = await page.screenshot({ clip });
    await page.locator('#movie-theShining').hover({ position: { x: width / 2, y: 60 } });
    await wait(page, () => document.querySelector('[data-preview-film="theShining"] video').currentTime > 0.1);
    const outsideAfter = await page.screenshot({ clip });
    if (output && !outsideAfter.equals(outsideBefore)) {
      await writeFile(`${output}/boundary-before.png`, outsideBefore);
      await writeFile(`${output}/boundary-after.png`, outsideAfter);
    }
    if (!outsideAfter.equals(outsideBefore)) {
      // Chromium can rerasterize sparse texture edges after compositor promotion.
      const difference = await page.evaluate(async (sources) => {
        const pixels = await Promise.all(sources.map(async (src) => {
          const image = new Image();
          image.src = src;
          await image.decode();
          const canvas = document.createElement('canvas');
          canvas.width = image.width; canvas.height = image.height;
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, canvas.width, canvas.height).data;
        }));
        let changed = 0;
        for (let i = 0; i < pixels[0].length; i += 4) {
          if (pixels[0][i] !== pixels[1][i] || pixels[0][i + 1] !== pixels[1][i + 1] || pixels[0][i + 2] !== pixels[1][i + 2]) changed++;
        }
        return changed / (pixels[0].length / 4);
      }, [outsideBefore, outsideAfter].map(buffer => `data:image/png;base64,${buffer.toString('base64')}`));
      assert(difference < 0.002, `Preview must stay inside Movies; changed ${(difference * 100).toFixed(3)}% of the next section`);
    }
    if (output) await page.screenshot({ path: `${output}/movies-${width}-boundary.png` });
    await page.locator('#vocab').evaluate(el => el.scrollIntoView());
    await stopped(page);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log(`${width}: five MP4s, fullscreen, scroll hit-test, fades, dialogs, visibility, exit passed`);
    await context.close();
  }
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    const requests = [];
    page.on('request', r => { if (r.url().endsWith('.mp4')) requests.push(r.url()); });
    await page.goto(`${origin}/#movies`);
    await page.evaluate(() => document.fonts.ready);
    const overlaps = await page.locator('#movies').evaluate(section => {
      const collisions = [];
      for (const row of section.querySelectorAll('[data-movie-case]')) {
        const button = row.querySelector('[data-preview-action]').getBoundingClientRect();
        const text = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
        while (text.nextNode()) {
          if (text.currentNode.parentElement.closest('button, [aria-hidden="true"]')) continue;
          if (getComputedStyle(text.currentNode.parentElement).display === 'none') continue;
          const range = document.createRange();
          range.selectNodeContents(text.currentNode);
          for (const rect of range.getClientRects()) {
            if (rect.width && rect.height && rect.left < button.right && rect.right > button.left &&
              rect.top < button.bottom && rect.bottom > button.top) collisions.push(row.id);
          }
        }
      }
      return collisions;
    });
    assert.deepEqual(overlaps, [], 'Preview actions must not cover the existing copy');
    const row = page.locator('#movie-airplane');
    const action = row.locator('[data-preview-action]');
    await action.tap();
    await wait(page, () => document.querySelector('#movie-airplane').dataset.previewActive === 'true');
    if (reducedMotion === 'reduce') {
      await page.waitForTimeout(400);
      assert.deepEqual(requests, []);
      assert.deepEqual(await playing(page), []);
    } else {
      await wait(page, () => document.querySelector('[data-preview-film="airplane"] video').currentTime > 0.1);
      assert.equal((await playing(page)).length, 1);
    }
    assert.equal(await page.locator('[data-movie-list]').evaluate(el => el.style.transform), '');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if (output) await page.screenshot({ path: `${output}/movies-390-${reducedMotion}.png` });
    await action.tap();
    await stopped(page);
    await row.locator('[aria-haspopup="dialog"]').tap({ position: { x: 10, y: 200 } });
    await page.locator('#movie-analysis[open]').waitFor();
    await page.getByRole('button', { name: 'Смотреть сцену' }).tap();
    await wait(page, () => document.querySelector('#movie-analysis video').currentTime > 0.1);
    await page.getByRole('button', { name: 'Закрыть разбор' }).tap();
    console.log(`390/${reducedMotion}: explicit preview, poster fallback, analysis and explicit Play passed`);
    await context.close();
  }
  // Keyboard and preference changes on desktop.
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(`${origin}/#movies`);
  const action = page.locator('#movie-airplane [data-preview-action]');
  await page.keyboard.press('Tab');
  await action.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  assert.equal(await action.evaluate(el => el.matches(':focus-visible')), true);
  assert.equal(await page.locator('#movies video[src]').count(), 0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#movie-airplane').hover({ position: { x: 700, y: 90 } });
  await wait(page, () => document.querySelector('[data-preview-film="airplane"] video').currentTime > 0.1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await stopped(page);
  assert.equal(await page.locator('[data-movie-list]').evaluate(el => el.style.transform), '');
  assert.deepEqual(errors, []);
  console.log('Keyboard, live reduced-motion change and console checks passed');
} finally { await browser.close(); }
