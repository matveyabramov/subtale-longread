import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

export function useArticleNavigation(dialogRef: RefObject<HTMLDialogElement | null>, film: string) {
  const [items, setItems] = useState<{ id: string; title: string }[]>([]);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const targets = useRef<HTMLElement[]>([]);
  const frame = useRef(0);
  const destination = useRef<{ index: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const header = dialog.querySelector<HTMLElement>('[data-article-header]')!;
    const compact = dialog.querySelector<HTMLElement>('[data-article-compact]')!;
    targets.current = [...dialog.querySelectorAll<HTMLElement>('[data-article-scene], [data-analysis~="case-section"], [data-analysis="case-conclusion"]')];
    setItems(targets.current.map((target, index) => {
      target.id = `analysis-${film}-${index}`;
      target.tabIndex = -1;
      return { id: target.id, title: index === 0 ? 'Сцена' : target.querySelector('h3')?.textContent || 'Вывод' };
    }));
    const update = () => {
      frame.current = 0;
      const headerHeight = header.getBoundingClientRect().height;
      dialog.style.setProperty('--article-header-height', `${headerHeight}px`);
      const compactHeight = compact.getBoundingClientRect().height;
      dialog.style.setProperty('--article-nav-height', `${compactHeight}px`);
      const line = dialog.getBoundingClientRect().top + dialog.clientTop + headerHeight + compactHeight + 32;
      let current = 0;
      targets.current.forEach((target, index) => {
        if (!target.closest('[hidden]') && target.getBoundingClientRect().top <= line) current = index;
      });
      if (dialog.scrollTop > 0 && dialog.scrollHeight - dialog.clientHeight - dialog.scrollTop < 2) current = targets.current.length - 1;
      // Near the end, an anchor may be clamped by the scroll range. Keep the
      // chosen visible section selected until the reader scrolls again.
      if (destination.current && Math.abs(dialog.scrollTop - destination.current.top) < 2) current = destination.current.index;
      else destination.current = null;
      setActive(current);
    };
    const schedule = () => { if (!frame.current) frame.current = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(header); resize.observe(compact);
    resize.observe(dialog.querySelector('[data-article-body]')!);
    const visibility = new MutationObserver(schedule);
    visibility.observe(dialog, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
    const readingInput = () => { destination.current = null; schedule(); };
    dialog.addEventListener('wheel', readingInput, { passive: true });
    dialog.addEventListener('touchmove', readingInput, { passive: true });
    dialog.addEventListener('keydown', readingInput);
    dialog.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame.current); frame.current = 0;
      resize.disconnect(); visibility.disconnect();
      destination.current = null;
      dialog.removeEventListener('wheel', readingInput);
      dialog.removeEventListener('touchmove', readingInput);
      dialog.removeEventListener('keydown', readingInput);
      dialog.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [dialogRef, film]);

  const jump = (index: number) => {
    const dialog = dialogRef.current;
    const target = targets.current[index];
    if (!dialog || !target) return;
    if (target.closest('[hidden]')) {
      dialog.querySelector<HTMLButtonElement>('[data-analysis="meaning-toggle"][aria-expanded="false"]')?.click();
    }
    setExpanded(false);
    // Wait for the existing disclosure and compact list to commit their layout.
    requestAnimationFrame(() => {
      if (!dialog.isConnected) return;
      const header = dialog.querySelector<HTMLElement>('[data-article-header]')!.getBoundingClientRect().height;
      const compact = dialog.querySelector<HTMLElement>('[data-article-compact]')!.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top - dialog.getBoundingClientRect().top - dialog.clientTop + dialog.scrollTop - header - compact - 24;
      target.focus({ preventScroll: true });
      dialog.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      destination.current = { index, top: dialog.scrollTop };
      setActive(index);
    });
  };
  return { items, active, expanded, setExpanded, jump };
}
