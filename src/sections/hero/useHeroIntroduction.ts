import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import type { ReadingAnchorId } from '../../shared/navigation';
import { useReadingNavigation } from '../../shared/ReadingNavigation';

type IntroState = 'unseen' | 'open' | 'resolved';

export function useHeroIntroduction(contentsOpen: boolean) {
  const navigateReading = useReadingNavigation();
  const [state, setState] = useState<IntroState>('unseen');
  const stateRef = useRef<IntroState>('unseen');
  const visitRef = useRef({ inside: false, shown: false });
  const syncVisitRef = useRef<() => boolean>(() => false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);

  const finish = useCallback((restoreFocus = false) => {
    visitRef.current.shown = true;
    stateRef.current = 'resolved';
    setState('resolved');
    unlockRef.current?.();
    unlockRef.current = null;
    dialogRef.current?.close();
    if (restoreFocus) document.getElementById('hero-title')?.focus({ preventScroll: true });
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
      visitRef.current.shown = true;
      stateRef.current = 'open';
      setState('open');
      dialog.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
    } catch {
      // Failure to open must leave the longread readable and unlocked.
      finish();
    }
  }, [finish]);

  useEffect(() => {
    const hero = document.getElementById('hero');
    let frame = 0;
    const update = () => {
      const rect = hero?.getBoundingClientRect();
      const inside = !!hero && !hero.hidden && !!rect && rect.height > 0 &&
        rect.bottom > 0 && rect.top < window.innerHeight;
      if (inside !== visitRef.current.inside) {
        if (!inside && stateRef.current === 'open') finish();
        visitRef.current = { inside, shown: false };
        stateRef.current = inside ? 'unseen' : 'resolved';
        setState(stateRef.current);
      }
      return inside;
    };
    syncVisitRef.current = update;
    const navigation = () => {
      if (stateRef.current === 'open') finish();
      cancelAnimationFrame(frame);
      // Navigation owns routing and restoration; observing it never opens UI.
      frame = requestAnimationFrame(update);
    };
    const pagehide = () => {
      if (stateRef.current === 'open') finish();
      visitRef.current = { inside: false, shown: false };
    };
    const observer = new MutationObserver(update);
    if (hero) observer.observe(hero, { attributes: true, attributeFilter: ['hidden'] });
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('hashchange', navigation);
    window.addEventListener('popstate', navigation);
    window.addEventListener('pagehide', pagehide);
    window.addEventListener('pageshow', update);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      syncVisitRef.current = () => false;
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('hashchange', navigation);
      window.removeEventListener('popstate', navigation);
      window.removeEventListener('pagehide', pagehide);
      window.removeEventListener('pageshow', update);
      unlockRef.current?.();
      unlockRef.current = null;
      dialogRef.current?.close();
    };
  }, [finish]);

  useEffect(() => {
    const canOpen = () => {
      const inside = syncVisitRef.current();
      if (!inside || visitRef.current.shown || contentsOpen || stateRef.current !== 'unseen' ||
        document.querySelector('dialog[open], #contents-panel') ||
        document.getElementById('hero')?.closest('[inert]') ||
        getComputedStyle(document.documentElement).overflow === 'hidden') return false;
      return true;
    };
    const wheel = (event: WheelEvent) => {
      if (!event.isTrusted || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.deltaY <= 0 ||
        Math.abs(event.deltaX) > event.deltaY || !canOpen()) return;
      event.preventDefault();
      open();
    };
    const keydown = (event: KeyboardEvent) => {
      if (!event.isTrusted || event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
        !['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) return;
      if (event.target instanceof Element &&
        (event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])') ||
          (event.key === ' ' && event.target.closest('button, summary, [role="button"]')))) return;
      if (!canOpen()) return;
      event.preventDefault();
      open();
    };
    let touch: { x: number; y: number; pulling: boolean } | null = null;
    const touchstart = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      touch = point ? { x: point.clientX, y: point.clientY, pulling: false } : null;
    };
    const touchmove = (event: TouchEvent) => {
      const point = event.touches.length === 1 ? event.touches[0] : null;
      if (!event.isTrusted || event.defaultPrevented || !point || !touch) return;
      const down = touch.y - point.clientY;
      // A pull-down gesture stays native even if the finger reverses direction.
      if (down < -2) touch.pulling = true;
      if (touch.pulling) return;
      if (down <= 2 || down <= Math.abs(touch.x - point.clientX) || !canOpen()) return;
      event.preventDefault();
      touch = null;
      open();
    };
    const touchend = () => { touch = null; };
    document.addEventListener('touchend', touchend, { passive: true });
    document.addEventListener('touchcancel', touchend, { passive: true });
    document.addEventListener('wheel', wheel, { passive: false });
    document.addEventListener('keydown', keydown);
    document.addEventListener('touchstart', touchstart, { passive: true });
    document.addEventListener('touchmove', touchmove, { passive: false });
    return () => {
      document.removeEventListener('touchend', touchend);
      document.removeEventListener('touchcancel', touchend);
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
    navigateReading(id);
  };

  const onClose = () => {
    // Native/assistive-technology dismissal is the same safe exit as Escape.
    if (stateRef.current === 'open') finish(true);
  };

  return { state, dialogRef, finish, navigate, onClose };
}
