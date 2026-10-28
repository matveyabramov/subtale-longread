import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import type { ReadingAnchorId } from '../../shared/navigation';

type IntroState = 'unseen' | 'open' | 'resolved';

export function useHeroIntroduction(contentsOpen: boolean) {
  const [state, setState] = useState<IntroState>('unseen');
  const stateRef = useRef<IntroState>('unseen');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);

  const finish = useCallback((restoreFocus = false) => {
    stateRef.current = 'resolved';
    setState('resolved');
    unlockRef.current?.();
    unlockRef.current = null;
    dialogRef.current?.close();
    if (restoreFocus) ctaRef.current?.focus({ preventScroll: true });
  }, []);

  const open = useCallback(() => {
    if (stateRef.current !== 'unseen') return;
    const dialog = dialogRef.current;
    if (!dialog) { finish(); return; }
    try {
      dialog.showModal();
      const root = document.documentElement;
      const overflow = root.style.getPropertyValue('overflow');
      const priority = root.style.getPropertyPriority('overflow');
      root.style.setProperty('overflow', 'hidden');
      unlockRef.current = () => {
        if (overflow) root.style.setProperty('overflow', overflow, priority);
        else root.style.removeProperty('overflow');
      };
      stateRef.current = 'open';
      setState('open');
      dialog.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
    } catch {
      // Failure to open must leave the longread readable and unlocked.
      finish();
    }
  }, [finish]);

  useEffect(() => {
    const outsideHero = () => {
      const hero = document.getElementById('hero');
      return !hero || hero.getBoundingClientRect().bottom <= 0;
    };
    const navigation = () => finish();
    const hashchange = () => {
      // Loading/reloading #hero can emit the initial hash event after mount.
      // An explicit Hero link is already handled by anchorClick below.
      if (location.hash !== '#hero' || stateRef.current === 'open') finish();
    };
    const anchorClick = (event: globalThis.MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.hash &&
        document.getElementById(decodeURIComponent(url.hash.slice(1)))) finish();
    };
    if ((location.hash && location.hash !== '#hero') || (!location.hash && outsideHero())) finish();
    window.addEventListener('hashchange', hashchange);
    window.addEventListener('popstate', navigation);
    window.addEventListener('pagehide', navigation);
    document.addEventListener('click', anchorClick, true);
    return () => {
      window.removeEventListener('hashchange', hashchange);
      window.removeEventListener('popstate', navigation);
      window.removeEventListener('pagehide', navigation);
      document.removeEventListener('click', anchorClick, true);
      unlockRef.current?.();
      unlockRef.current = null;
      dialogRef.current?.close();
    };
  }, [finish]);

  useEffect(() => {
    const canOpen = () => {
      if (contentsOpen || stateRef.current !== 'unseen') return false;
      const hero = document.getElementById('hero');
      if (!hero || hero.getBoundingClientRect().bottom <= 0 || (location.hash && location.hash !== '#hero')) {
        finish();
        return false;
      }
      return hero.getBoundingClientRect().top < window.innerHeight;
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.deltaY <= 0 ||
        Math.abs(event.deltaX) > event.deltaY || !canOpen()) return;
      event.preventDefault();
      open();
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
        !['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) return;
      if (event.target instanceof Element &&
        (event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])') ||
          (event.key === ' ' && event.target.closest('button, summary, [role="button"]')))) return;
      if (!canOpen()) return;
      event.preventDefault();
      open();
    };
    let touch: { x: number; y: number } | null = null;
    const touchstart = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      touch = point ? { x: point.clientX, y: point.clientY } : null;
    };
    const touchmove = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      if (!point || !touch) return;
      const down = touch.y - point.clientY;
      if (down <= 2 || down <= Math.abs(touch.x - point.clientX) || !canOpen()) return;
      event.preventDefault();
      touch = null;
      open();
    };
    document.addEventListener('wheel', wheel, { passive: false });
    document.addEventListener('keydown', keydown);
    document.addEventListener('touchstart', touchstart, { passive: true });
    document.addEventListener('touchmove', touchmove, { passive: false });
    return () => {
      document.removeEventListener('wheel', wheel);
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('touchstart', touchstart);
      document.removeEventListener('touchmove', touchmove);
    };
  }, [contentsOpen, finish, open]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: ReadingAnchorId) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    finish();
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'instant', block: 'start' });
    const heading = target?.getAttribute('aria-labelledby');
    if (heading) document.getElementById(heading)?.focus({ preventScroll: true });
  };

  const onClose = () => {
    // Native/assistive-technology dismissal is the same safe exit as Escape.
    if (stateRef.current === 'open') finish(true);
  };

  return { state, dialogRef, ctaRef, finish, navigate, onClose };
}
