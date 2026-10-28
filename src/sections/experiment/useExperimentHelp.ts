import { useCallback, useEffect, useRef, useState } from 'react';

export function useExperimentHelp() {
  const [helpOpen, setHelpOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  const unlockRef = useRef<(() => void) | null>(null);

  const close = useCallback((restoreFocus = true) => {
    openRef.current = false;
    setHelpOpen(false);
    unlockRef.current?.();
    unlockRef.current = null;
    dialogRef.current?.close();
    if (restoreFocus) triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || openRef.current) return;
    try {
      dialog.showModal();
      const root = document.documentElement;
      const properties = ['overflow', 'padding-right'] as const;
      const previous = properties.map((name) => ({ name, value: root.style.getPropertyValue(name), priority: root.style.getPropertyPriority(name) }));
      const gutter = window.innerWidth - root.clientWidth;
      const padding = getComputedStyle(root).paddingRight;
      root.style.setProperty('overflow', 'hidden');
      // Preserve the reading width on platforms with a classic scrollbar:
      // opening help must not shift either stimulus horizontally.
      if (gutter) root.style.setProperty('padding-right', `calc(${padding} + ${gutter}px)`);
      unlockRef.current = () => previous.forEach(({ name, value, priority }) => {
        if (value) root.style.setProperty(name, value, priority);
        else root.style.removeProperty(name);
      });
      openRef.current = true;
      setHelpOpen(true);
      dialog.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
    } catch { close(); }
  };

  useEffect(() => {
    const leave = () => { if (openRef.current) close(false); };
    window.addEventListener('hashchange', leave);
    window.addEventListener('popstate', leave);
    window.addEventListener('pagehide', leave);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && !entry.isIntersecting && openRef.current) close(false);
    });
    const target = document.getElementById('experiment-target');
    if (target) observer.observe(target);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', leave);
      window.removeEventListener('popstate', leave);
      window.removeEventListener('pagehide', leave);
      unlockRef.current?.();
      unlockRef.current = null;
      dialogRef.current?.close();
    };
  }, [close]);

  return { helpOpen, dialogRef, triggerRef, open, close, onClose: () => { if (openRef.current) close(); } };
}
