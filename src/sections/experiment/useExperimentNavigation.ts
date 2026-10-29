import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { experimentAnchorIds, sectionIds, type ReadingAnchorId } from '../../shared/navigation';
import { lockPageScroll } from '../../shared/lockPageScroll';
import { experimentSteps, readingViewForHash, type ExperimentStep } from './model';
import { useSceneTransition } from './useSceneTransition';

type Destination = { id: string; focus: boolean };
type NavigationSource = 'navigate' | 'gesture' | 'pop' | 'hash';

function goToDocument({ id, focus }: Destination) {
  const target = document.getElementById(id);
  if (id === 'emptiness') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  else target?.scrollIntoView({ behavior: 'instant', block: 'start' });
  if (!focus || !target) return;
  const heading = target.getAttribute('aria-labelledby');
  (heading ? document.getElementById(heading) : target)?.focus({ preventScroll: true });
}

function focusActiveScreen(step: ExperimentStep) {
  const screen = document.getElementById(experimentSteps.find((item) => item.id === step)!.anchor);
  const heading = screen?.getAttribute('aria-labelledby');
  (heading ? document.getElementById(heading) : screen)?.focus({ preventScroll: true });
}

/** Two explicit modes; only Experiment's selected state is mounted fullscreen. */
export function useExperimentNavigation() {
  const presentScene = useSceneTransition();
  const [view, setView] = useState(() => readingViewForHash(location.hash));
  const current = useRef(view);
  const pendingDocument = useRef<Destination | null>(null);
  const returnFromHero = useRef(false);
  const returnArmed = useRef(false);
  const lastScrollY = useRef(window.scrollY);
  const direction = useRef(0);
  const handledURL = useRef(location.href);
  const releasePage = useRef<((restorePosition?: boolean) => void) | null>(null);

  const engage = useCallback(() => {
    if (releasePage.current) return;
    const unlock = lockPageScroll();
    const background = ['main-content', 'footer'].map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const inert = background.map((element) => element.inert);
    const contents = document.querySelector<HTMLButtonElement>('[aria-controls="contents-panel"]');
    const contentsInert = contents?.inert ?? false;
    const contentsHidden = contents?.dataset.experimentHidden;
    background.forEach((element) => { element.inert = true; });
    if (contents) { contents.inert = true; contents.dataset.experimentHidden = 'true'; }
    releasePage.current = (restorePosition = true) => {
      releasePage.current = null;
      background.forEach((element, index) => { element.inert = inert[index] ?? false; });
      if (contents) {
        contents.inert = contentsInert;
        if (contentsHidden === undefined) delete contents.dataset.experimentHidden;
        else contents.dataset.experimentHidden = contentsHidden;
      }
      unlock(restorePosition);
    };
  }, []);

  const applyRoute = useCallback((id: string, source: NavigationSource) => {
    const next = readingViewForHash(`#${id}`);
    const previous = current.current;
    presentScene(previous, next, source, id);
    current.current = next;
    // Navigation starts a new reading session. Queued restoration/bounce events
    // cannot reopen Result until fresh input or actual forward reading occurs.
    returnArmed.current = false;
    direction.current = 0;
    pendingDocument.current = !next.step && (source !== 'pop' || previous.step !== null || previous.mode !== next.mode)
      ? { id, focus: source !== 'pop' } : null;
    setView(next);
  }, [presentScene]);

  const navigate = useCallback((id: ReadingAnchorId) => {
    returnFromHero.current = id === 'hero' && current.current.step === 'instructions';
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    handledURL.current = location.href;
    applyRoute(id, 'navigate');
  }, [applyRoute]);

  useLayoutEffect(() => {
    if (view.step) {
      engage();
      const screen = document.getElementById(experimentSteps.find((item) => item.id === view.step)!.anchor);
      if (screen) screen.scrollTop = 0;
      focusActiveScreen(view.step);
    } else {
      // An explicit destination owns the new position; do not first restore an
      // obsolete background coordinate from the other document mode.
      releasePage.current?.(pendingDocument.current === null);
      if (pendingDocument.current) {
        goToDocument(pendingDocument.current);
        pendingDocument.current = null;
      }
    }
    lastScrollY.current = window.scrollY;
  }, [view, engage]);

  useLayoutEffect(() => () => releasePage.current?.(), []);

  useEffect(() => {
    let touch: { x: number; y: number } | null = null;
    let historyFocus = 0;
    const help = () => document.querySelector<HTMLDialogElement>('#experiment-help[open]');
    const frame = () => document.querySelector<HTMLElement>('#experiment-layer > section');
    const overlay = () => document.querySelector('dialog[open], #contents-panel') !== null;
    const heroGatePending = () => document.querySelector('dialog[aria-labelledby="hero-hint-title"]')
      ?.getAttribute('data-intro-state') === 'unseen';
    const openStep = (next: ExperimentStep, event?: Event) => {
      if (current.current.step) return;
      if (event?.cancelable) event.preventDefault();
      const id = experimentSteps.find((item) => item.id === next)!.anchor;
      returnFromHero.current = false;
      if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
      handledURL.current = location.href;
      flushSync(() => applyRoute(id, 'gesture'));
    };
    const input = (delta: number, event: Event, arm = true) => {
      if (!delta) return;
      if (current.current.mode === 'experiment' && heroGatePending()) return;
      if (arm) returnArmed.current = true;
      direction.current = Math.sign(delta);
      lastScrollY.current = window.scrollY;
      if (current.current.mode === 'reading') {
        if (returnArmed.current && delta < 0 && window.scrollY <= 0) openStep('result', event);
      } else if (delta > 0) {
        const hero = document.getElementById('hero')?.getBoundingClientRect();
        if (hero && (returnFromHero.current || hero.bottom <= delta)) openStep('instructions', event);
      }
    };
    const mayScroll = (scroller: HTMLElement | null, delta: number, target: EventTarget | null) => {
      if (!scroller || !(target instanceof Node) || !scroller.contains(target)) return false;
      return delta > 0 ? scroller.scrollHeight - scroller.clientHeight - scroller.scrollTop > 1 : scroller.scrollTop > 1;
    };
    const wheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
        !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (current.current.step) {
        if (!mayScroll(help() ?? frame(), delta, event.target)) event.preventDefault();
      } else if (!overlay()) input(delta, event);
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey ||
        (event.shiftKey && event.key !== ' ') || overlay()) return;
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(event.key)) return;
      if (event.target instanceof Element && (event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])') ||
        (event.key === ' ' && event.target.closest('button, summary, [role="button"]')))) return;
      const screen = frame();
      const page = (screen?.clientHeight ?? window.innerHeight) * 0.9;
      const delta = event.key === 'Home' ? -Math.max(window.scrollY, 1)
        : event.key === 'End' ? document.documentElement.scrollHeight - window.innerHeight - window.scrollY
        : event.key === 'ArrowDown' ? 40 : event.key === 'ArrowUp' ? -40
        : event.key === 'PageUp' || (event.key === ' ' && event.shiftKey) ? -page : page;
      if (current.current.step && screen) {
        event.preventDefault();
        if (event.key === 'Home') screen.scrollTop = 0;
        else if (event.key === 'End') screen.scrollTop = screen.scrollHeight;
        else screen.scrollTop += delta;
      } else input(delta, event, !event.repeat);
    };
    const touchstart = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      touch = point ? { x: point.clientX, y: point.clientY } : null;
      if (point && !current.current.step && !overlay()) {
        returnArmed.current = true;
        direction.current = 0;
        lastScrollY.current = window.scrollY;
      }
    };
    const touchmove = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      const previous = touch;
      touch = point ? { x: point.clientX, y: point.clientY } : null;
      if (!point || !previous || event.defaultPrevented) return;
      const delta = previous.y - point.clientY;
      if (!delta || Math.abs(previous.x - point.clientX) >= Math.abs(delta)) return;
      if (current.current.step) {
        if (!mayScroll(help() ?? frame(), delta, event.target)) event.preventDefault();
      } else if (!overlay()) input(delta, event, false);
    };
    const touchend = () => { touch = null; }; // Keep scroll intent: Safari momentum continues after release.
    const scroll = () => {
      const y = window.scrollY;
      const movement = y - lastScrollY.current;
      lastScrollY.current = y;
      if (current.current.step) return;
      if (overlay()) { returnArmed.current = false; direction.current = 0; return; }
      if (movement) direction.current = Math.sign(movement);
      if (movement > 0 && y > 0) returnArmed.current = true;
      if (!returnArmed.current) return;
      if (current.current.mode === 'reading') {
        if (y <= 0 && direction.current < 0) openStep('result');
      } else if (direction.current > 0 && !heroGatePending()) {
        const hero = document.getElementById('hero');
        if (hero && hero.getBoundingClientRect().bottom <= 0) openStep('instructions');
      }
    };
    const anchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
      const id = url.hash.slice(1);
      if (![...sectionIds, ...experimentAnchorIds].some((anchor) => anchor === id)) return;
      event.preventDefault();
      navigate(id as ReadingAnchorId);
    };
    const historyNavigation = (event: PopStateEvent | HashChangeEvent) => {
      if (event.type === 'hashchange' && handledURL.current === location.href) return;
      handledURL.current = location.href;
      returnFromHero.current = false;
      flushSync(() => applyRoute(location.hash.slice(1) || 'hero', event.type === 'popstate' ? 'pop' : 'hash'));
      cancelAnimationFrame(historyFocus);
      historyFocus = requestAnimationFrame(() => {
        historyFocus = 0;
        if (current.current.step && !help()) focusActiveScreen(current.current.step);
      });
    };
    const pagehide = () => {
      cancelAnimationFrame(historyFocus);
      returnArmed.current = false;
      direction.current = 0;
      releasePage.current?.();
    };
    const pageshow = () => {
      lastScrollY.current = window.scrollY;
      if (current.current.step) engage();
    };
    document.addEventListener('click', anchorClick);
    document.addEventListener('wheel', wheel, { passive: false });
    document.addEventListener('keydown', keydown);
    document.addEventListener('touchstart', touchstart, { passive: true });
    document.addEventListener('touchmove', touchmove, { passive: false });
    document.addEventListener('touchend', touchend, { passive: true });
    document.addEventListener('touchcancel', touchend, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('hashchange', historyNavigation);
    window.addEventListener('popstate', historyNavigation);
    window.addEventListener('pagehide', pagehide);
    window.addEventListener('pageshow', pageshow);
    return () => {
      cancelAnimationFrame(historyFocus);
      document.removeEventListener('click', anchorClick);
      document.removeEventListener('wheel', wheel);
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('touchstart', touchstart);
      document.removeEventListener('touchmove', touchmove);
      document.removeEventListener('touchend', touchend);
      document.removeEventListener('touchcancel', touchend);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('hashchange', historyNavigation);
      window.removeEventListener('popstate', historyNavigation);
      window.removeEventListener('pagehide', pagehide);
      window.removeEventListener('pageshow', pageshow);
    };
  }, [applyRoute, engage, navigate]);

  return { ...view, navigate };
}
