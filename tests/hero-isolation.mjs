// Use the existing Playwright installation; run with QA_BROWSER=webkit as well.
import assert from 'node:assert/strict';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.QA_BROWSER || 'chromium';
const browser = await (engine === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4173';
const errors = [];
const intro = 'dialog[aria-labelledby="hero-hint-title"]';
const reading = '#main-content > div > section, #footer';
const load = async (page, hash = '') => {
  await page.goto(`${origin}/?hero-isolation=1${hash}`);
  await page.locator('#hero').waitFor({ state: 'attached' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
};
// Model the pull, reversal and release as a single gesture, including WebKit
// hosts where TouchEvent/Touch constructors are not available.
const gesture = (page, ys, cancel = false) => page.evaluate(({ ys, cancel }) => {
  const node = document.getElementById('hero'), prevented = [];
  const send = (type, y) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'touches', { value: y === null ? [] : [{ clientX: 180, clientY: y }] });
    node.dispatchEvent(event); prevented.push(event.defaultPrevented);
  };
  send('touchstart', ys[0]); ys.slice(1).forEach(y => send('touchmove', y));
  send(cancel ? 'touchcancel' : 'touchend', null);
  return prevented;
}, { ys, cancel });
const isolated = async page => {
  assert(await page.locator(reading).evaluateAll(ns => ns.every(n => !n.getClientRects().length)));
  assert(await page.locator('#hero').evaluate(n => Math.abs(n.clientHeight - innerHeight) <= 1));
  assert(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight + 1));
  assert.equal(await page.evaluate(() => document.body.style.position), '');
  assert.equal(await page.locator('#experiment-layer').count(), 0);
};
try {
  const viewports = [[320,568],[360,800],[390,844],[390,480],[430,932],[768,1024],
    [820,1180],[1024,768],[1024,1366],[1440,810],[1920,1080],[844,390]];
  for (const [width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width <= 1024, hasTouch: width <= 1024 });
    page.on('pageerror', error => errors.push(error.message));
    await load(page); await isolated(page);
    // Simulated browser bar changes must never expose the reading document.
    for (const h of [Math.max(390, height - 110), height]) {
      await page.setViewportSize({ width, height: h }); await isolated(page);
    }
    assert((await gesture(page, [220, 300, 180, 120])).every(v => !v));
    assert.equal(await page.locator(intro).evaluate(n => n.open), false);
    await isolated(page);
    // Fresh forward gesture still owns the one-time introduction, even on tablet.
    await gesture(page, [300, 240, 200]);
    assert.equal(await page.locator(intro).evaluate(n => n.open), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator(intro).evaluate(n => n.open), false);
    for (let i = 0; i < 3; i++) {
      await gesture(page, [200, 320, 120]);
      await gesture(page, [300, 150, 100], true);
      await page.locator('#hero').dispatchEvent('wheel', { deltaY: 3000, bubbles: true, cancelable: true });
      await page.evaluate(() => dispatchEvent(new Event('scroll')));
    }
    await isolated(page);
    await page.locator('#hero a[href="#experiment-instructions"]').click();
    assert.equal(await page.locator('#experiment-instructions').count(), 1);
    assert.equal(await page.evaluate(() => document.body.style.position), 'fixed');
    assert(await page.locator(reading).evaluateAll(ns => ns.every(n => !n.getClientRects().length)));
    await page.locator('#experiment-instructions a[href="#hero"]').click();
    await isolated(page);
    assert.equal(await page.locator('#hero').evaluate(n => n.scrollTop), 0);
    await gesture(page, [200, 300, 150]);
    await page.keyboard.press('PageDown');
    await isolated(page);
    // The explicit CTA stays usable after bounce, repeated gestures and Back.
    await page.locator('#hero a[href="#experiment-instructions"]').click();
    await page.locator('#experiment-instructions a[href="#experiment-target"]').click();
    await page.locator('#experiment-target button[aria-controls="experiment-help"]').click();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#experiment-help').evaluate(n => n.open), false);
    await page.locator('#experiment-target a[href="#experiment-result"]').click();
    await page.locator('#experiment-result a[href="#emptiness"]').click();
    assert.equal(await page.evaluate(() => location.hash), '#emptiness');
    assert(await page.locator(reading).evaluateAll(ns => ns.every(n => n.getClientRects().length)));
    // All real reading sections have their normal boxes; no fake spacer/screen.
    for (const id of ['emptiness','elephant','blind-zones','movies','vocab','blind-spot-scene','what-to-do','footer']) {
      const node = page.locator(`#${id}`);
      await node.evaluate(n => n.scrollIntoView({ behavior: 'instant' }));
      assert((await node.boundingBox()).height > 0);
    }
    await page.keyboard.press('Home');
    await page.waitForFunction(() => location.hash === '#experiment-result');
    await page.locator('#experiment-result a[href="#emptiness"]').click();
    await page.keyboard.press('ArrowUp');
    await page.waitForFunction(() => location.hash === '#experiment-result');
    await page.locator('#experiment-result a[href="#emptiness"]').click();
    // Contents can expose a mounted chapter directly from the isolated Hero.
    await page.reload(); await page.locator('#hero').waitFor(); await isolated(page);
    await page.locator('[aria-controls="contents-panel"]').click();
    await page.locator('#contents-panel a[href="#movies"]').click();
    assert.equal(await page.evaluate(() => location.hash), '#movies');
    assert(await page.locator('#movies').isVisible());
    await page.goBack(); await page.locator('#hero').waitFor(); await isolated(page);
    await page.goForward(); assert(await page.locator('#movies').isVisible());
    await load(page, '#vocab'); assert(await page.locator('#vocab').isVisible());
    await page.reload(); await page.locator('#hero').waitFor(); await isolated(page);
    await page.reload(); await page.locator('#hero').waitFor(); await isolated(page);
    console.log(`${engine}/${width}x${height}: isolation, resize, pull/reversal, intro/Escape, CTA/Back, Experiment/Help, reading/return, contents/history/hash/reload passed`);
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  for (const destination of ['experiment-instructions', 'emptiness']) {
    await load(page);
    await page.keyboard.press('PageDown');
    await page.locator(`${intro}[open] a[href="#${destination}"]`).click();
    assert.equal(await page.evaluate(() => location.hash), `#${destination}`);
    assert.equal(await page.locator('[data-scene-transition]').count(), 0);
    if (destination === 'emptiness') assert(await page.locator('#emptiness').isVisible());
  }
  assert.deepEqual(errors, []);
  await page.close();
  console.log(`${engine}: introduction Start/Skip and reduced motion passed`);
} finally { await browser.close(); }
