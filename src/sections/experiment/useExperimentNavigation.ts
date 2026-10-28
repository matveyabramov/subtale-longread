import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { experimentAnchorIds, sectionIds, type ReadingAnchorId } from '../../shared/navigation';
import { lockPageScroll } from '../../shared/lockPageScroll';
import { experimentStepForHash, experimentSteps, type ExperimentStep } from './model';

type Destination = { id: string; focus: boolean };

function goToDocument({ id, focus }: Destination) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: 'instant', block: 'start' });
  if (!focus || !target) return;
  const heading = target.getAttribute('aria-labelledby');
  (heading ? document.getElementById(heading) : target)?.focus({ preventScroll: true });
}

function focusActiveScreen(step: ExperimentStep) {
  const screen = document.getElementById(experimentSteps.find((item) => item.id === step)!.anchor);
  const heading = screen?.getAttribute('aria-labelledby');
  (heading ? document.getElementById(heading) : screen)?.focus({ preventScroll: true });
}

/** Steps are React state. Document scrolling is used only to enter/leave reading. */
export function useExperimentNavigation() {
  const [step, setStep] = useState<ExperimentStep | null>(() => experimentStepForHash(location.hash));
  const active = useRef(step);
  const pendingExit = useRef<Destination | null>(null);
  const returnFromHero = useRef(false);
  const boundary = useRef<{ direction: number } | null>(null);
  const releasePage = useRef<(() => void) | null>(null);

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
    releasePage.current = () => {
      releasePage.current = null;
      background.forEach((element, index) => { element.inert = inert[index] ?? false; });
      if (contents) {
        contents.inert = contentsInert;
        if (contentsHidden === undefined) delete contents.dataset.experimentHidden;
        else contents.dataset.experimentHidden = contentsHidden;
      }
      unlock();
    };
  }, []);

  const applyRoute = useCallback((id: string, focus: boolean) => {
    const next = experimentStepForHash(`#${id}`);
    const previous = active.current;
    boundary.current = null;
    active.current = next;
    if (next) {
      pendingExit.current = null;
      setStep(next);
    } else if (previous) {
      pendingExit.current = { id, focus };
      setStep(null);
    } else if (focus) goToDocument({ id, focus });
  }, []);

  const navigate = useCallback((id: ReadingAnchorId) => {
    returnFromHero.current = id === 'hero' && active.current === 'instructions';
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    applyRoute(id, true);
  }, [applyRoute]);

  useLayoutEffect(() => {
    if (step) {
      engage();
      const screen = document.getElementById(experimentSteps.find((item) => item.id === step)!.anchor);
      if (screen) {
        screen.scrollTop = 0;
        focusActiveScreen(step);
      }
    } else {
      releasePage.current?.();
      if (pendingExit.current) {
        goToDocument(pendingExit.current);
        pendingExit.current = null;
      }
    }
  }, [step, engage]);

  useLayoutEffect(() => () => releasePage.current?.(), []);

  // One listener set for the lifetime of the reader, never one set per step.
  useEffect(() => {
    let touch: { x: number; y: number } | null = null;
    let historyFocus = 0;
    const help = () => document.querySelector<HTMLDialogElement>('#experiment-help[open]');
    const frame = () => document.querySelector<HTMLElement>('#experiment-layer > section');
    const openAtBoundary = (next: ExperimentStep, replace: boolean) => {
      const id = experimentSteps.find((item) => item.id === next)!.anchor;
      returnFromHero.current = false;
      if (location.hash !== `#${id}`) {
        if (replace) history.replaceState(history.state, '', `#${id}`);
        else history.pushState(null, '', `#${id}`);
      }
      applyRoute(id, false);
    };
    const enter = (delta: number) => {
      const marker = document.getElementById('experiment');
      if (!marker) return false;
      const top = marker.getBoundingClientRect().top;
      const hero = document.getElementById('hero')?.getBoundingClientRect();
      // Hero listeners may be rebound after opening Contents. The first gate
      // still owns this gesture regardless of document listener order.
      if (hero && hero.bottom > 0 && (!location.hash || location.hash === '#hero') &&
        document.querySelector('dialog[aria-labelledby="hero-hint-title"]')?.getAttribute('data-intro-state') === 'unseen') return false;
      if (delta > 0 && returnFromHero.current && hero && hero.bottom > 0) {
        openAtBoundary('instructions', false);
        return true;
      }
      if (delta > 0 && top > 0 && delta >= top) {
        openAtBoundary('instructions', true);
        return true;
      }
      if (delta < 0 && top <= 1 && -delta >= Math.max(0, -top - 1)) {
        openAtBoundary('result', true);
        return true;
      }
      boundary.current = delta > 0 && top > 0 ? { direction: 1 }
        : delta < 0 && top <= 1 ? { direction: -1 } : null;
      return false;
    };
    const mayScroll = (scroller: HTMLElement | null, delta: number, target: EventTarget | null) => {
      if (!scroller || !(target instanceof Node) || !scroller.contains(target)) return false;
      return delta > 0 ? scroller.scrollHeight - scroller.clientHeight - scroller.scrollTop > 1 : scroller.scrollTop > 1;
    };
    const overlay = () => document.querySelector('dialog[open], #contents-panel') !== null;
    const wheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
        !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (active.current) {
        if (!mayScroll(help() ?? frame(), delta, event.target)) event.preventDefault();
      } else if (!overlay() && enter(delta)) event.preventDefault();
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey ||
        (event.shiftKey && event.key !== ' ') || overlay()) return;
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(event.key)) return;
      if (event.target instanceof Element && (event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])') ||
        (event.key === ' ' && event.target.closest('button, summary, [role="button"]')))) return;
      const screen = frame();
      const page = (screen?.clientHeight ?? window.innerHeight) * 0.9;
      const delta = event.key === 'ArrowDown' ? 40 : event.key === 'ArrowUp' ? -40
        : event.key === 'PageUp' || (event.key === ' ' && event.shiftKey) ? -page : page;
      if (active.current && screen) {
        event.preventDefault();
        if (event.key === 'Home') screen.scrollTop = 0;
        else if (event.key === 'End') screen.scrollTop = screen.scrollHeight;
        else screen.scrollTop += delta;
      } else if (event.key !== 'Home' && (event.key !== 'End' || returnFromHero.current) && enter(delta)) event.preventDefault();
    };
    const touchstart = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      touch = point ? { x: point.clientX, y: point.clientY } : null;
    };
    const touchmove = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      const previous = touch;
      touch = point ? { x: point.clientX, y: point.clientY } : null;
      if (!point || !previous || event.defaultPrevented) return;
      const delta = previous.y - point.clientY;
      if (!delta || Math.abs(previous.x - point.clientX) >= Math.abs(delta)) return;
      if (active.current) {
        if (!mayScroll(help() ?? frame(), delta, event.target)) event.preventDefault();
      } else if (!overlay() && enter(delta)) event.preventDefault();
    };
    const scroll = () => {
      if (active.current || !boundary.current || overlay()) return;
      const top = document.getElementById('experiment')?.getBoundingClientRect().top;
      if (top === undefined) return;
      if (boundary.current.direction > 0 ? top <= 0 : top > 0) {
        openAtBoundary(boundary.current.direction > 0 ? 'instructions' : 'result', true);
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
    const historyNavigation = () => {
      returnFromHero.current = false;
      boundary.current = null;
      if (active.current || experimentStepForHash(location.hash)) applyRoute(location.hash.slice(1) || 'hero', true);
      cancelAnimationFrame(historyFocus);
      // Chrome may restore the old element's focus after popstate. Focus the
      // mounted state after native traversal, without moving the document.
      historyFocus = requestAnimationFrame(() => {
        historyFocus = 0;
        if (active.current && !help()) focusActiveScreen(active.current);
      });
    };
    const pagehide = () => { cancelAnimationFrame(historyFocus); boundary.current = null; releasePage.current?.(); };
    const pageshow = () => { if (active.current) engage(); };
    document.addEventListener('click', anchorClick);
    document.addEventListener('wheel', wheel, { passive: false });
    document.addEventListener('keydown', keydown);
    document.addEventListener('touchstart', touchstart, { passive: true });
    document.addEventListener('touchmove', touchmove, { passive: false });
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
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('hashchange', historyNavigation);
      window.removeEventListener('popstate', historyNavigation);
      window.removeEventListener('pagehide', pagehide);
      window.removeEventListener('pageshow', pageshow);
    };
  }, [applyRoute, engage, navigate]);

  return { step, navigate };
}
