import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { lockPageScroll } from '../../shared/lockPageScroll';

export function useExperimentHelp() {
  const [helpOpen, setHelpOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  const unlockRef = useRef<(() => void) | null>(null);
  const backdropPress = useRef(false);

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
      unlockRef.current = lockPageScroll();
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
    return () => {
      window.removeEventListener('hashchange', leave);
      window.removeEventListener('popstate', leave);
      window.removeEventListener('pagehide', leave);
      unlockRef.current?.();
      unlockRef.current = null;
      dialogRef.current?.close();
    };
  }, [close]);

  const outside = (event: MouseEvent<HTMLDialogElement> | PointerEvent<HTMLDialogElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
  };
  const onPointerDown = (event: PointerEvent<HTMLDialogElement>) => { backdropPress.current = outside(event); };
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    const dismiss = backdropPress.current && event.target === event.currentTarget && outside(event);
    backdropPress.current = false;
    if (dismiss) close();
  };

  return {
    helpOpen, dialogRef, triggerRef, open, close, onPointerDown, onBackdropClick,
    onPointerCancel: () => { backdropPress.current = false; },
    onClose: () => { if (openRef.current) close(); },
  };
}
