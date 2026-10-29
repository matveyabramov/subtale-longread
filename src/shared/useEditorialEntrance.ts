import { useLayoutEffect, type RefObject } from 'react';

/** Progressive enhancement: only a successfully armed observer can prepare an
 * offscreen target. Static HTML, restored reading and failures stay visible. */
export function useEditorialEntrance(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const targets = [...scope.querySelectorAll<HTMLElement>('[data-editorial-reveal]')];
    if (scope.hasAttribute('data-editorial-reveal')) targets.unshift(scope);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const active = new Map<HTMLElement, number>();
    const initialHash = location.hash;
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    let frame = 0;
    let ready = false;

    const finish = (target: HTMLElement) => {
      clearTimeout(active.get(target));
      active.delete(target);
      target.dataset.editorialState = 'done';
      observer?.unobserve(target);
    };
    const unavailable = () => scope.hidden || !!scope.closest('[inert]');
    const start = (target: HTMLElement) => {
      target.dataset.editorialState = 'entering';
      try {
        // Some compositions animate siblings or a scaled outer slot. Read the
        // scope's actual CSS timings instead of cutting every reveal at 700ms.
        const durations = scope.getAnimations({ subtree: true }).map((animation) => {
          const end = Number(animation.effect?.getComputedTiming().endTime ?? 0);
          return Number.isFinite(end) ? end : 0;
        });
        active.set(target, window.setTimeout(() => finish(target), Math.max(0, ...durations) + 50));
      } catch { finish(target); }
    };
    const check = () => {
      if (!ready) return;
      for (const target of targets) {
        if (target.dataset.editorialState === 'done') continue;
        if (media.matches || document.hidden) { finish(target); continue; }
        if (unavailable()) {
          if (active.has(target)) finish(target);
          continue;
        }
        const rect = target.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        if (rect.bottom <= 0) { finish(target); continue; }
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (active.has(target)) {
          if (!visible) finish(target);
        } else if (rect.top < 0) {
          finish(target); // A jump already passed the reading position.
        } else if (rect.top <= window.innerHeight * 0.6) {
          start(target);
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; check(); });
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      for (const target of targets) {
        if (target.contains(event.target) && (target.dataset.editorialReveal === 'load' ||
          (event.target instanceof Element && event.target.closest('a, button, input, select, textarea, [role="button"]')))) finish(target);
      }
    };

    try {
      if (!('IntersectionObserver' in window)) { targets.forEach(finish); return; }
      // Pixel margins use viewport height; percentage IO margins use root width.
      // The existing scroll/resize check also measures the live 60% attention line.
      observer = new IntersectionObserver(check, { rootMargin: `0px 0px -${window.innerHeight * 0.4}px 0px`, threshold: 0 });
      for (const target of targets) {
        if (target.dataset.editorialState === 'done') continue;
        if (target.dataset.editorialReveal === 'load') {
          if (unavailable() || media.matches || document.hidden || (initialHash && initialHash !== '#hero')) finish(target);
          else {
            // Layout effect arms Hero before its first paint, including StrictMode.
            start(target);
          }
        } else observer.observe(target);
      }
      // Parent layout effects settle direct anchors and Experiment's inert state.
      frame = requestAnimationFrame(() => {
        frame = 0;
        for (const target of targets) {
          if (target.dataset.editorialReveal === 'load' || target.dataset.editorialState === 'done') continue;
          const rect = target.getBoundingClientRect();
          if (!unavailable() && (initialHash === `#${scope.id}` || (rect.top < innerHeight && rect.bottom > 0))) finish(target);
          else target.dataset.editorialState = 'pending';
        }
        ready = true;
        check();
      });
      mutations = new MutationObserver(schedule);
      mutations.observe(scope, { attributes: true, attributeFilter: ['hidden'] });
      const main = scope.closest('main');
      if (main) mutations.observe(main, { attributes: true, attributeFilter: ['inert'] });
    } catch {
      targets.forEach(finish);
    }

    media.addEventListener('change', check);
    document.addEventListener('visibilitychange', check);
    scope.addEventListener('focusin', focus);
    // Also finish a skipped entrance when a fast jump crosses it between IO samples.
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      observer?.disconnect();
      mutations?.disconnect();
      cancelAnimationFrame(frame);
      active.forEach((timer) => clearTimeout(timer));
      targets.forEach((target) => {
        if (target.dataset.editorialState !== 'done') delete target.dataset.editorialState;
      });
      media.removeEventListener('change', check);
      document.removeEventListener('visibilitychange', check);
      scope.removeEventListener('focusin', focus);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [scopeRef]);
}
