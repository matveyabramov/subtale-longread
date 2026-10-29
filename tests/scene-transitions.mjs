// Run against the local app with the existing Playwright installation.
import assert from 'node:assert/strict';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.QA_BROWSER || 'chromium';
const browser = await (engine === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4173';
const errors = [];
const cover = '[data-scene-transition]';
const load = async (page, hash = '') => {
  await page.goto(`${origin}/?scene-qa=1${hash}`);
  await page.locator('#main-content').waitFor({ state: 'attached' });
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(requestAnimationFrame); });
};
const state = page => page.evaluate(() => ({
  hash: location.hash, focus: document.activeElement.id, lock: document.body.style.position,
  inert: document.getElementById('main-content').inert, y: scrollY,
}));
const pauseClick = async (page, selector) => {
  await page.locator(selector).evaluate(node => {
    node.click();
    const animation = document.querySelector('[data-scene-transition]')?.getAnimations()[0];
    animation?.pause();
    if (animation) animation.currentTime = 0;
  });
  await page.evaluate(() => new Promise(requestAnimationFrame));
};
const assertNoCover = page => page.waitForFunction(() => !document.querySelector('[data-scene-transition]'), null, { timeout: 1000 });
const touchUp = page => page.evaluate(() => {
  const target = document.getElementById('emptiness');
  // WebKit on macOS has no constructible TouchEvent; model the handler input.
  const send = (type, y) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'touches', { value: [{ identifier: 1, target, clientX: 180, clientY: y }] });
    target.dispatchEvent(event);
  };
  send('touchstart', 220); send('touchmove', 290);
  target.dispatchEvent(new Event('touchend', { bubbles: true }));
});
try {
  for (const [width, height] of [[1920, 1080], [1440, 900], [768, 1024], [390, 844], [390, 480]]) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width <= 768, hasTouch: width <= 768 });
    page.on('pageerror', error => errors.push(error.message));
    await load(page);
    await page.waitForTimeout(750);
    await pauseClick(page, '#hero a[href="#experiment-instructions"]');
    assert.deepEqual(await state(page), { hash: '#experiment-instructions', focus: 'experiment-instructions-title', lock: 'fixed', inert: true, y: 0 });
    const presentation = await page.locator(cover).evaluate(node => ({
      inert: node.inert, hidden: node.getAttribute('aria-hidden'), ids: node.querySelectorAll('[id]').length,
      pointer: getComputedStyle(node).pointerEvents,
      background: getComputedStyle(node).backgroundColor,
      sceneBackground: getComputedStyle(node.firstElementChild).backgroundColor,
      timing: node.getAnimations()[0].effect.getTiming(),
    }));
    assert.equal(presentation.inert, true); assert.equal(presentation.hidden, 'true');
    assert.equal(presentation.ids, 0); assert.equal(presentation.pointer, 'none');
    assert.equal(presentation.background, 'rgb(11, 13, 15)');
    assert.equal(presentation.sceneBackground, 'rgb(1, 46, 215)');
    assert.equal(presentation.timing.duration, 580);
    assert.equal(presentation.timing.easing, 'cubic-bezier(0.4, 0, 0.2, 1)');
    const instructionRect = await page.locator('#experiment-instructions').boundingBox();
    for (const time of [1, 116, 290, 579]) {
      await page.locator(cover).evaluate((node, time) => { node.getAnimations()[0].currentTime = time; }, time);
      assert.deepEqual(await page.locator('#experiment-instructions').boundingBox(), instructionRect);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    // Real pointer input must reach the new screen even while the snapshot is paused.
    await page.locator('#experiment-instructions a[href="#experiment-target"]').click();
    await assertNoCover(page);
    assert.equal((await state(page)).hash, '#experiment-target');
    const stimuli = await page.locator('#experiment-target [data-node-id="10:732"], #experiment-target [data-node-id="10:735"]').evaluateAll(nodes => nodes.map(node => {
      const ancestors = [];
      for (let p = node.parentElement; p; p = p.parentElement) {
        const css = getComputedStyle(p);
        ancestors.push([css.transform, css.opacity, css.clipPath]);
      }
      return { animations: node.getAnimations().length, ancestors };
    }));
    assert(stimuli.every(s => s.animations === 0 && s.ancestors.every(a => a.join('|') === 'none|1|none')));
    await page.locator('#experiment-target button[aria-controls="experiment-help"]').click();
    assert.equal(await page.locator('#experiment-help').evaluate(n => n.open), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#experiment-help').evaluate(n => n.open), false);
    assert.equal((await state(page)).lock, 'fixed');
    await page.locator('#experiment-target a[href="#experiment-result"]').click();
    await assertNoCover(page);
    for (let cycle = 0; cycle < 3; cycle++) {
      await page.locator('#experiment-result a[href="#emptiness"]').scrollIntoViewIfNeeded();
      const screenScroll = await page.locator('#experiment-result').evaluate(n => n.scrollTop);
      await pauseClick(page, '#experiment-result a[href="#emptiness"]');
      assert.deepEqual(await state(page), { hash: '#emptiness', focus: 'emptiness-title', lock: '', inert: false, y: 0 });
      assert.equal(await page.locator(cover).getAttribute('data-scene-transition'), 'result-emptiness');
      assert.equal(await page.locator(`${cover} > div > section`).evaluate(n => n.scrollTop), screenScroll);
      assert.equal(await page.locator(cover).evaluate(n => n.getAnimations()[0].effect.getTiming().duration), 620);
      // Back to Result via each existing input path, without awaiting the effect.
      if (cycle === 0) await page.keyboard.press('ArrowUp');
      else if (cycle === 1) await touchUp(page);
      else await page.locator('#emptiness').dispatchEvent('wheel', { deltaY: -900, bubbles: true, cancelable: true });
      await assertNoCover(page);
      assert.equal((await state(page)).hash, '#experiment-result');
      assert.equal((await state(page)).lock, 'fixed');
    }
    // Natural completion removes its cover; assembly is still owned by Emptiness.
    await page.locator('#experiment-result a[href="#emptiness"]').click();
    await page.waitForTimeout(720);
    await assertNoCover(page);
    assert.equal((await state(page)).lock, '');
    await page.waitForTimeout(500);
    assert.equal(await page.locator('#emptiness [data-editorial-reveal="scroll"]').getAttribute('data-editorial-state'), 'done');
    await page.goBack(); await assertNoCover(page);
    assert.equal((await state(page)).hash, '#experiment-result');
    await page.goForward(); await assertNoCover(page);
    assert.equal((await state(page)).hash, '#emptiness');
    console.log(`${engine}/${width}x${height}: immediate routes/focus/locks, transparent input, static Target, Help/Escape, three return cycles, cleanup and history passed`);
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  page.on('pageerror', error => errors.push(error.message));
  // Intro gate Start and Skip retain their existing semantics.
  for (const destination of ['experiment-instructions', 'emptiness']) {
    await load(page);
    await page.keyboard.press('PageDown');
    await page.locator('dialog[aria-labelledby="hero-hint-title"][open]').waitFor();
    assert.equal(await page.locator('dialog[aria-labelledby="hero-hint-title"]').evaluate(n => n.open), true);
    await pauseClick(page, `dialog[open] a[href="#${destination}"]`);
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal((await state(page)).hash, `#${destination}`);
    if (destination === 'emptiness') { await assertNoCover(page); assert.equal((await state(page)).lock, ''); }
    else assert.equal(await page.locator(cover).count(), 1);
  }
  // Fast Back/Forward cancels stale decoration and never replays it.
  await load(page);
  await pauseClick(page, '#hero a[href="#experiment-instructions"]');
  await page.locator('#experiment-instructions a[href="#hero"]').click();
  await assertNoCover(page);
  await pauseClick(page, '#hero a[href="#experiment-instructions"]');
  assert.equal(await page.locator(cover).count(), 1);
  await page.goBack(); await assertNoCover(page);
  await page.goForward(); await assertNoCover(page);
  // Resizes, reduced-motion changes and pagehide safely discard decoration.
  for (const interrupt of ['resize', 'reduce', 'pagehide', 'hidden']) {
    await load(page);
    await pauseClick(page, '#hero a[href="#experiment-instructions"]');
    if (interrupt === 'resize') await page.setViewportSize({ width: 390, height: 600 });
    else if (interrupt === 'reduce') await page.emulateMedia({ reducedMotion: 'reduce' });
    else await page.evaluate(kind => {
      if (kind === 'hidden') Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      dispatchEvent(new Event(kind === 'pagehide' ? 'pagehide' : 'unused'));
      if (kind === 'hidden') document.dispatchEvent(new Event('visibilitychange'));
    }, interrupt);
    await assertNoCover(page);
    if (interrupt !== 'pagehide') assert.equal((await state(page)).lock, 'fixed');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
  for (const hash of ['#experiment-instructions', '#experiment-target', '#experiment-result', '#emptiness']) {
    await load(page, hash); await assertNoCover(page);
    assert.equal((await state(page)).hash, hash);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await load(page);
  await page.locator('#hero a[href="#experiment-instructions"]').click(); await assertNoCover(page);
  await page.locator('#experiment-instructions a[href="#experiment-target"]').click();
  await page.locator('#experiment-target a[href="#experiment-result"]').click();
  await page.locator('#experiment-result a[href="#emptiness"]').click(); await assertNoCover(page);
  assert.equal((await state(page)).lock, '');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await load(page);
  await page.evaluate(() => {
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      if (this.hasAttribute('data-scene-transition')) throw new Error('QA: animation unavailable');
      return animate.apply(this, args);
    };
  });
  await page.locator('#hero a[href="#experiment-instructions"]').click(); await assertNoCover(page);
  assert.equal((await state(page)).focus, 'experiment-instructions-title');
  assert.equal((await state(page)).lock, 'fixed');
  assert.deepEqual(errors, []);
  console.log(`${engine}: intro Start/Skip, rapid interruption, resize, visibility/pagehide, direct hashes, reduced motion and failed initialization passed`);
  await page.close();
} finally { await browser.close(); }
