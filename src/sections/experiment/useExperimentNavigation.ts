import { useEffect } from 'react';
import { experimentSteps } from './model';

/** Keep document anchors/history native; constrain only user scroll gestures. */
export function useExperimentNavigation() {
  useEffect(() => {
    const screens = experimentSteps.map(({ anchor }) => document.getElementById(anchor))
      .filter((screen): screen is HTMLElement => screen !== null);
    const experiment = document.getElementById('experiment');
    const previousInert = screens.map((screen) => screen.inert);
    let current: HTMLElement | null = null;
    let frame = 0;

    const activate = (screen: HTMLElement | null) => {
      current = screen;
      // Keep Tab in the current screen's controls, without trapping the global
      // contents button or removing any screen/anchor from document flow.
      screens.forEach((item) => { item.inert = screen !== null && item !== screen; });
      if (experiment) {
        if (screen) experiment.dataset.activeStep = screen.id;
        else delete experiment.dataset.activeStep;
      }
    };
    const atReadingPosition = () => screens.find((screen) => {
      const bounds = screen.getBoundingClientRect();
      return bounds.top <= 0.5 && bounds.bottom > 0.5;
    }) ?? null;
    const sync = () => { frame = 0; activate(atReadingPosition()); };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const screenForHash = (hash: string) => {
      const id = hash.slice(1);
      if (id === 'experiment') return screens[0] ?? null;
      const target = document.getElementById(id);
      return target ? screens.find((screen) => screen === target || screen.contains(target)) ?? null : null;
    };
    const anchorClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const next = screenForHash(url.hash);
      activate(next);
      if (next) next.scrollTop = 0;
      // Capture runs before existing link handlers move focus to the target.
      schedule();
    };
    const historyNavigation = () => { activate(screenForHash(location.hash)); schedule(); };
    const overlayOpen = () => document.querySelector('dialog[open], #contents-panel') !== null;

    const enterFromOutside = (delta: number) => {
      const first = screens[0];
      const last = screens[screens.length - 1];
      if (!first || !last) return false;
      const firstTop = first.getBoundingClientRect().top;
      const lastBottom = last.getBoundingClientRect().bottom;
      const target = delta > 0 && firstTop > 0 && delta >= firstTop ? first
        : delta < 0 && lastBottom <= 0 && -delta >= -lastBottom ? last : null;
      if (!target) return false;
      activate(target);
      target.scrollTop = 0;
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      return true;
    };
    const mayScrollLocally = (screen: HTMLElement, delta: number, target: EventTarget | null) => {
      if (!(target instanceof Node) || !screen.contains(target)) return false;
      const remaining = screen.scrollHeight - screen.clientHeight - screen.scrollTop;
      return delta > 0 ? remaining > 1 : screen.scrollTop > 1;
    };
    const wheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
        !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY) || overlayOpen()) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? window.innerHeight : 1);
      const screen = atReadingPosition();
      if (!screen) {
        if (enterFromOutside(delta)) event.preventDefault();
        return;
      }
      activate(screen);
      // The frame's overscroll containment also stops a large native wheel
      // packet from chaining into the next document screen at its local edge.
      if (!mayScrollLocally(screen, delta, event.target)) event.preventDefault();
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || overlayOpen() ||
        (event.shiftKey && event.key !== ' ')) return;
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(event.key)) return;
      if (event.target instanceof Element &&
        (event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])') ||
          (event.key === ' ' && event.target.closest('button, summary, [role="button"]')))) return;
      const screen = atReadingPosition();
      const page = (screen?.clientHeight ?? window.innerHeight) * 0.9;
      const delta = event.key === 'ArrowDown' ? 40 : event.key === 'ArrowUp' ? -40
        : event.key === 'PageUp' || (event.key === ' ' && event.shiftKey) ? -page : page;
      if (!screen) {
        if (event.key !== 'Home' && event.key !== 'End' && enterFromOutside(delta)) event.preventDefault();
        return;
      }
      event.preventDefault();
      activate(screen);
      if (event.key === 'Home') screen.scrollTop = 0;
      else if (event.key === 'End') screen.scrollTop = screen.scrollHeight;
      else screen.scrollTop += delta;
    };
    let touch: { x: number; y: number } | null = null;
    const touchstart = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      touch = point ? { x: point.clientX, y: point.clientY } : null;
    };
    const touchmove = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      const previous = touch;
      touch = point ? { x: point.clientX, y: point.clientY } : null;
      if (!point || !previous || event.defaultPrevented || overlayOpen()) return;
      const delta = previous.y - point.clientY;
      if (!delta || Math.abs(previous.x - point.clientX) >= Math.abs(delta)) return;
      const screen = atReadingPosition();
      if (!screen) {
        if (enterFromOutside(delta)) event.preventDefault();
        return;
      }
      activate(screen);
      if (!mayScrollLocally(screen, delta, event.target)) event.preventDefault();
    };
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (current) current.scrollIntoView({ behavior: 'instant', block: 'start' });
        sync();
      });
    };
    const pagehide = () => { cancelAnimationFrame(frame); frame = 0; activate(null); };

    const initial = screenForHash(location.hash);
    activate(initial);
    // React creates these anchors after the browser's initial fragment lookup.
    // Resolve a direct/reloaded Experiment link once, but preserve Back/Forward
    // scroll restoration when this document is restored by the browser.
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (initial && navigation?.type !== 'back_forward') initial.scrollIntoView({ behavior: 'instant', block: 'start' });
    schedule();
    document.addEventListener('click', anchorClick, true);
    document.addEventListener('wheel', wheel, { passive: false });
    document.addEventListener('keydown', keydown);
    document.addEventListener('touchstart', touchstart, { passive: true });
    document.addEventListener('touchmove', touchmove, { passive: false });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('hashchange', historyNavigation);
    window.addEventListener('popstate', historyNavigation);
    window.addEventListener('pagehide', pagehide);
    window.addEventListener('pageshow', schedule);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', anchorClick, true);
      document.removeEventListener('wheel', wheel);
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('touchstart', touchstart);
      document.removeEventListener('touchmove', touchmove);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      window.removeEventListener('hashchange', historyNavigation);
      window.removeEventListener('popstate', historyNavigation);
      window.removeEventListener('pagehide', pagehide);
      window.removeEventListener('pageshow', schedule);
      screens.forEach((screen, index) => { screen.inert = previousInert[index] ?? false; });
      if (experiment) delete experiment.dataset.activeStep;
    };
  }, []);
}
