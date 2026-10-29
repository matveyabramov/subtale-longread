// Reuse the existing Playwright installation; run for chromium and QA_BROWSER=webkit.
import assert from 'node:assert/strict';
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.QA_BROWSER || 'chromium';
const browser = await (engine === 'webkit' ? webkit.launch({ headless: true }) : chromium.launch({ channel: 'chrome', headless: true }));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4173';
const widths = process.env.QA_WIDTHS?.split(',').map(Number) || [320, 340, 360, 390, 414, 430, 600, 601, 768, 1024, 1100, 1101, 1280, 1440, 1600, 1919, 1920];
const errors = [];
const cards = (page) => page.locator('#blind-zones [data-editorial-reveal="card"]');
const layout = (page) => cards(page).evaluateAll(nodes => ({
  grid: [nodes[0].parentElement.offsetTop, nodes[0].parentElement.offsetHeight],
  cards: nodes.map(n => [n.offsetTop, n.offsetLeft, n.offsetWidth, n.offsetHeight]),
}));
const load = async (page, label, hash = 'elephant') => {
  await page.goto(`${origin}/?continuity=${label}#${hash}`);
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(requestAnimationFrame); });
};
const enter = async (page, index = 0, ratio = 0.84) => {
  await cards(page).nth(index).evaluate((node, ratio) => scrollTo(0, node.getBoundingClientRect().top + scrollY - innerHeight * ratio), ratio);
  await page.waitForFunction(index => document.querySelectorAll('[data-editorial-reveal="card"]')[index].dataset.editorialState === 'entering', index);
};
const monitor = async (page) => page.evaluate(() => {
  const nodes = [...document.querySelectorAll('[data-editorial-reveal="card"]')];
  window.cardProbe = { events: [], frames: [], running: true };
  for (const type of ['animationstart', 'animationend', 'animationcancel']) document.addEventListener(type, event => {
    const index = nodes.indexOf(event.target);
    if (index >= 0) window.cardProbe.events.push({ index, type, elapsed: event.elapsedTime });
  });
  const sample = () => {
    window.cardProbe.frames.push(nodes.map(node => {
      const css = getComputedStyle(node), animation = node.getAnimations().find(a => a instanceof CSSAnimation);
      return { state: node.dataset.editorialState, opacity: +css.opacity,
        y: css.translate === 'none' ? 0 : +css.translate.split(' ').at(-1).replace('px', ''),
        time: animation?.currentTime ?? null };
    }));
    if (window.cardProbe.running) requestAnimationFrame(sample);
  };
  requestAnimationFrame(sample);
});
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 844 }, isMobile: width <= 1024, hasTouch: width <= 1024 });
    page.on('pageerror', error => errors.push(error.message));
    await load(page, `rows-${width}`);
    const original = await layout(page);
    await monitor(page);
    await enter(page);
    const ingredients = await cards(page).first().evaluate(node => {
      const css = getComputedStyle(node);
      return [css.animationDuration, css.animationDelay, css.animationTimingFunction, css.rotate, css.scale,
        node.getAnimations({ subtree: true }).filter(a => a instanceof CSSAnimation).length];
    });
    assert.deepEqual(ingredients, ['0.42s', '0s', 'cubic-bezier(0.22, 1, 0.36, 1)', 'none', 'none', 1]);
    // Cross the former 740px breakpoint while the first row is still entering.
    if (width <= 600) {
      await page.waitForTimeout(45);
      await page.setViewportSize({ width, height: 724 });
      await page.waitForTimeout(45);
      assert.deepEqual(await layout(page), original, `${width}: toolbar collapse must not resize/move grid rows`);
      await page.setViewportSize({ width, height: 844 });
      await page.waitForTimeout(30);
      assert.deepEqual(await layout(page), original, `${width}: toolbar return must preserve the same variant`);
    }
    await cards(page).last().evaluate(node => scrollTo(0, node.getBoundingClientRect().top + scrollY - innerHeight * 0.84));
    await page.waitForTimeout(1000);
    const probe = await page.evaluate(() => { window.cardProbe.running = false; return window.cardProbe; });
    assert.equal(probe.events.filter(e => e.type === 'animationstart').length, 4, `${width}: each card starts once`);
    assert(probe.events.filter(e => e.type === 'animationcancel').every(e => e.elapsed >= 0.419), `${width}: no premature cancellation ${JSON.stringify(probe.events)}`);
    for (let i = 0; i < 4; i++) {
      let previous = null;
      for (const frame of probe.frames) {
        const current = frame[i];
        if (current.state === 'entering' && previous?.state === 'entering') {
          assert(current.opacity + 0.001 >= previous.opacity, `${width}/${i}: opacity never reverses`);
          assert(current.y <= previous.y + 0.01, `${width}/${i}: translation never reverses`);
        }
        previous = current;
      }
    }
    // The two cards of each mobile row must share the same animation timeline.
    if (width <= 1100) for (const frame of probe.frames) for (const [a, b] of [[0, 1], [2, 3]]) {
      if (frame[a].time !== null && frame[b].time !== null) assert(Math.abs(frame[a].time - frame[b].time) < 2, `${width}: row timeline skew`);
    }
    assert.deepEqual(await layout(page), original);
    assert.equal(await page.locator('#blind-zones').getAttribute('data-category'), 'idiom');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.locator('#elephant').evaluate(n => n.scrollIntoView({ behavior: 'instant' }));
    await page.locator('#blind-zones').evaluate(n => n.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(50);
    assert.equal(await page.evaluate(() => window.cardProbe.events.filter(e => e.type === 'animationstart').length), 4, `${width}: no replay`);
    // A brief offscreen excursion and keyboard focus must not cut a live entrance.
    await load(page, `excursion-${width}`);
    await enter(page);
    await page.waitForTimeout(35);
    await page.locator('#movies').evaluate(n => n.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(30);
    assert.equal(await cards(page).first().getAttribute('data-editorial-state'), 'entering', `${width}: offscreen entrance continues`);
    await cards(page).first().evaluate(node => scrollTo(0, node.getBoundingClientRect().top + scrollY - innerHeight * 0.5));
    await page.keyboard.press('Shift');
    const focusStates = await cards(page).first().evaluate(node => {
      const before = node.dataset.editorialState;
      node.querySelector('button').focus({ preventScroll: true });
      return [before, node.dataset.editorialState];
    });
    assert.equal(focusStates[1], focusStates[0], `${width}: focus does not snap the pose`);
    await page.waitForTimeout(1000);
    assert.equal(await cards(page).first().evaluate(n => getComputedStyle(n).opacity), '1');
    // Fast skips of targets not yet started still fail open; reduce cancels movement.
    await load(page, `skip-${width}`);
    await page.locator('#movies').evaluate(n => n.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(50);
    assert(await cards(page).evaluateAll(ns => ns.every(n => n.dataset.editorialState === 'done')));
    await load(page, `reduce-${width}`);
    await enter(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(50);
    assert(await cards(page).evaluateAll(ns => ns.every(n => n.dataset.editorialState === 'done' && getComputedStyle(n).opacity === '1')));
    console.log(`${engine}/${width}: continuous reveal, stable rows, no replay/overflow, active Idiom, focus, fast skip and reduce passed`);
    await page.close();
  }
  // Simulate a busy phone delaying the first paint after JS arms the entrance.
  // Duration must start on the CSS timeline, not expire on a guessed JS timer.
  const busy = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await load(busy, 'busy-first-paint');
  await busy.evaluate(() => {
    const card = document.querySelector('[data-editorial-reveal="card"]');
    window.busyResult = [];
    for (const type of ['animationend', 'animationcancel']) card.addEventListener(type, event => window.busyResult.push({ type, elapsed: event.elapsedTime }));
    const observer = new MutationObserver(() => {
      if (card.dataset.editorialState !== 'entering') return;
      observer.disconnect();
      const end = performance.now() + 180;
      while (performance.now() < end) { /* main-thread contention before first paint */ }
    });
    observer.observe(card, { attributes: true, attributeFilter: ['data-editorial-state'] });
  });
  await enter(busy);
  await busy.waitForTimeout(800);
  const completion = await busy.evaluate(() => window.busyResult);
  assert(completion.some(event => event.type === 'animationend' && event.elapsed >= 0.419), 'busy phone receives the complete CSS entrance');
  assert(!completion.some(event => event.type === 'animationcancel' && event.elapsed < 0.419), 'no guessed timeout cancels a delayed first paint');
  await busy.close();
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
