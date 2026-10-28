import { experimentAnchorIds, sectionIds } from './navigation';
import { scrollToReadingTarget } from './readingViewport';

const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
export const isPageReload = navigation?.type === 'reload';

export function positionInitialReadingAnchor() {
  if (isPageReload || navigation?.type === 'back_forward') return;
  const id = location.hash.slice(1);
  if (![...sectionIds, ...experimentAnchorIds].some((anchor) => anchor === id)) return;
  const target = document.getElementById(id);
  if (!target) return;
  scrollToReadingTarget(target);
  const url = location.href;
  let cancelled = false;
  let frame = 0;
  const inputs = ['pointerdown', 'touchstart', 'wheel', 'keydown'] as const;
  const cleanup = () => inputs.forEach((type) => document.removeEventListener(type, cancel, true));
  const cancel = () => { cancelled = true; cancelAnimationFrame(frame); cleanup(); };
  inputs.forEach((type) => document.addEventListener(type, cancel, { capture: true, passive: true }));
  // A late local font can change preceding section heights. Settle a fresh
  // direct link once after fonts, unless the reader has already taken control.
  document.fonts.ready.then(() => {
    if (cancelled) return;
    frame = requestAnimationFrame(() => {
      if (!cancelled && location.href === url) scrollToReadingTarget(target);
      cleanup();
    });
  });
  return cancel;
}

/** Run once before React mounts. Fragment navigation and history never call it. */
export function prepareReloadNavigation() {
  if (!isPageReload) return;
  history.replaceState(history.state, '', location.pathname + location.search);
  const restoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  const toHero = () => {
    // A user can follow a link before Safari finishes restoring the document.
    // Never overwrite that new fragment with a delayed reload correction.
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };
  toHero();
  const settle = () => {
    toHero();
    requestAnimationFrame(() => {
      toHero();
      requestAnimationFrame(() => {
        toHero();
        history.scrollRestoration = restoration;
      });
    });
  };
  if (document.readyState === 'complete') settle();
  else window.addEventListener('pageshow', settle, { once: true });
}
