// UA/platform profiles check document surfaces, not real Safari chrome tint.
import assert from 'node:assert/strict';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.QA_BROWSER || 'chromium';
const browser = await (engine === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4173';
const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1';
const mac = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15';
const profiles = [
  ...[360,390,430].map(width => ({ name: 'iPhone Safari 26', width, ua: iphone })),
  ...[768,820,1024].map(width => ({ name: 'iPad desktop UA Safari 26', width, ua: mac, ipad: true })),
  ...[1440,1920].map(width => ({ name: 'Desktop Safari 26', width, ua: mac })),
  { name: 'iOS Chrome', width: 390, ua: iphone.replace('Version/26.0', 'CriOS/142.0.0.0') },
  { name: 'iOS Firefox', width: 390, ua: iphone.replace('Version/26.0', 'FxiOS/144.0') },
  { name: 'Safari 18', width: 390, ua: iphone.replace('Version/26.0', 'Version/18.6') },
];
const errors = [];
try {
  for (const profile of profiles) {
    const page = await browser.newPage({ userAgent: profile.ua, viewport: { width: profile.width, height: 900 },
      hasTouch: profile.width <= 1024, isMobile: profile.width <= 1024 });
    page.on('pageerror', error => errors.push(error.message));
    if (profile.ipad) await page.addInitScript(() => {
      Object.defineProperty(navigator, 'platform', { get: () => 'MacIntel' });
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 5 });
    });
    const load = async hash => {
      await page.goto(`${origin}/?safari-entry=1${hash || ''}`);
      await page.locator('#hero').waitFor({ state: 'attached' });
      await page.waitForTimeout(100);
    };
    const surface = async () => {
      assert(await page.evaluate(() => [document.documentElement, document.body].every(n =>
        n.getBoundingClientRect().height >= innerHeight - 1 && getComputedStyle(n).backgroundColor === 'rgb(11, 13, 15)')));
    };
    const sample = () => page.evaluate(() => ({ hash: location.hash, focus: document.activeElement.id,
      lock: document.body.style.position, bg: getComputedStyle(document.getElementById('experiment-layer')).backgroundColor }));
    for (const entry of ['CTA', 'Start']) {
      await load();
      if (entry === 'Start') { await page.keyboard.press('PageDown'); await page.locator('dialog[open]').waitFor(); }
      await page.locator(entry === 'CTA' ? '#hero a[href="#experiment-instructions"]' : 'dialog[open] a[href="#experiment-instructions"]').evaluate(node => {
        node.click();
        const animation = document.querySelector('[data-scene-transition]')?.getAnimations()[0];
        animation?.pause();
      });
      assert.equal(await page.locator('[data-scene-transition]').count(), 1);
      await surface();
      assert.deepEqual(await sample(), { hash: '#experiment-instructions', focus: 'experiment-instructions-title', lock: 'fixed', bg: 'rgb(11, 13, 15)' });
      await page.locator('[data-scene-transition]').evaluate(n => n.getAnimations()[0].play());
      await page.waitForTimeout(1100);
      assert.equal(await page.locator('[data-scene-transition]').count(), 0);
      // Live screens retain their existing route, Help and scroll-lock behavior.
      await page.locator('#experiment-instructions a[href="#experiment-target"]').click();
      assert.equal(await page.locator('[data-scene-transition]').count(), 0);
      await surface();
      await page.locator('#experiment-target button[aria-controls="experiment-help"]').click();
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#experiment-help').evaluate(n => n.open), false);
      await page.locator('#experiment-target a[href="#experiment-result"]').click();
      await surface();
      await page.locator('#experiment-result a[href="#emptiness"]').evaluate(node => {
        node.click(); document.querySelector('[data-scene-transition]').getAnimations()[0].pause();
      });
      assert.equal(await page.locator('[data-scene-transition]').getAttribute('data-scene-transition'), 'result-emptiness');
      assert.equal(await page.locator('[data-scene-transition]').evaluate(n => n.getAnimations()[0].effect.getTiming().duration), 620);
      assert.equal(await page.evaluate(() => document.body.style.position), '');
      await page.keyboard.press('ArrowUp');
      assert.equal(await page.locator('[data-scene-transition]').count(), 0);
      assert.equal((await sample()).hash, '#experiment-result');
      await page.goBack(); await page.goForward();
      assert.equal(await page.locator('[data-scene-transition]').count(), 0);
    }
    await load('#experiment-instructions'); await surface(); assert.equal(await page.locator('[data-scene-transition]').count(), 0);
    for (const height of [568, 844]) {
      await page.setViewportSize({ width: profile.width, height }); await surface();
    }
    await page.locator('#experiment-instructions a[href="#hero"]').click();
    assert(await page.locator('#hero').isVisible());
    assert.equal(await page.evaluate(() => document.body.style.position), '');
    await page.keyboard.press('PageDown');
    assert.equal(await page.locator('#experiment-layer').count(), 0); // No gesture reentry after returning.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#hero a[href="#experiment-instructions"]').click();
    assert.equal(await page.locator('[data-scene-transition]').count(), 0);
    console.log(`${engine}/${profile.name}/${profile.width}: CTA/Start, black live layer, Target/Help/Result, reading iris, return, history/hash, Hero and reduce passed`);
    await page.close();
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
