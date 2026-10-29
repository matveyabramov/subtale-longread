import { useLayoutEffect, type RefObject } from 'react';

/** Progressive enhancement: nothing is hidden while waiting for the observer.
 * CSS owns the finite entrance; removing the attribute restores the exact art. */
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

    const finish = (target: HTMLElement) => {
      clearTimeout(active.get(target));
      active.delete(target);
      target.dataset.editorialState = 'done';
      observer?.unobserve(target);
    };
    const unavailable = () => scope.hidden || !!scope.closest('[inert]');
    const check = () => {
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
        } else if (visible) {
          target.dataset.editorialState = 'entering';
          active.set(target, window.setTimeout(() => finish(target), 700));
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; check(); });
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      for (const target of targets) {
        if (target.dataset.editorialReveal === 'load' && target.contains(event.target)) finish(target);
      }
    };

    try {
      if (!('IntersectionObserver' in window)) { targets.forEach(finish); return; }
      observer = new IntersectionObserver(check, { threshold: 0 });
      for (const target of targets) {
        if (target.dataset.editorialState === 'done') continue;
        if (target.dataset.editorialReveal === 'load') {
          if (unavailable() || media.matches || document.hidden || (initialHash && initialHash !== '#hero')) finish(target);
          else {
            // Layout effect arms Hero before its first paint, including StrictMode.
            target.dataset.editorialState = 'entering';
            active.set(target, window.setTimeout(() => finish(target), 700));
          }
        } else observer.observe(target);
      }
      // Parent layout effects settle direct anchors and Experiment's inert state.
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!unavailable()) {
          for (const target of targets) {
            if (target.dataset.editorialReveal === 'load') continue;
            const rect = target.getBoundingClientRect();
            if (initialHash === `#${scope.id}` || (rect.top < innerHeight && rect.bottom > 0)) finish(target);
          }
        }
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
      active.forEach((timer, target) => {
        clearTimeout(timer);
        delete target.dataset.editorialState;
      });
      media.removeEventListener('change', check);
      document.removeEventListener('visibilitychange', check);
      scope.removeEventListener('focusin', focus);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [scopeRef]);
}
