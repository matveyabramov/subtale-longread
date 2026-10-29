import { useCallback, useLayoutEffect, useRef } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { lockPageScroll } from '../../shared/lockPageScroll';
import { explorerExplanationCopy } from './explorerExplanationCopy';
import type { ExplorerCategoryId } from './model';
import styles from './ExplorerExplanationDialog.module.css';

interface Props {
  category: ExplorerCategoryId;
  trigger: HTMLButtonElement | null;
  onClose: () => void;
}

export function ExplorerExplanationDialog({ category, trigger, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const release = useRef<(() => void) | null>(null);
  const finished = useRef(false);
  const backdropPress = useRef(false);
  const copy = explorerExplanationCopy[category];

  const close = useCallback((restoreFocus = true) => {
    if (finished.current) return;
    finished.current = true;
    dialog.current?.close();
    release.current?.();
    release.current = null;
    if (restoreFocus && trigger?.isConnected) trigger.focus({ preventScroll: true });
    onClose();
  }, [onClose, trigger]);

  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    finished.current = false;
    try {
      release.current = lockPageScroll();
      element.showModal();
      closeButton.current?.focus({ preventScroll: true });
    } catch { close(); }
    const leave = () => close(false);
    window.addEventListener('pagehide', leave);
    window.addEventListener('hashchange', leave);
    window.addEventListener('popstate', leave);
    return () => {
      window.removeEventListener('pagehide', leave);
      window.removeEventListener('hashchange', leave);
      window.removeEventListener('popstate', leave);
      element.close();
      release.current?.();
      release.current = null;
    };
  }, [close]);

  const outside = (event: MouseEvent<HTMLDialogElement> | PointerEvent<HTMLDialogElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };

  return createPortal(
    <dialog id="explorer-explanation" ref={dialog} className={styles.dialog}
      aria-modal="true" aria-labelledby="explorer-explanation-title" aria-describedby="explorer-explanation-copy"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClose={(event) => { if (!event.currentTarget.open) close(); }}
      onPointerDown={(event) => { backdropPress.current = event.target === event.currentTarget && outside(event); }}
      onPointerCancel={() => { backdropPress.current = false; }}
      onClick={(event) => {
        const dismiss = backdropPress.current && event.target === event.currentTarget && outside(event);
        backdropPress.current = false;
        if (dismiss) close();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        event.preventDefault();
        // The close button and scrollable text are the only focus stops.
        (document.activeElement === closeButton.current ? content.current : closeButton.current)?.focus({ preventScroll: true });
      }}>
      <div className={styles.interior}>
        <header className={styles.header}>
          <h2 id="explorer-explanation-title" className={styles.title}>{copy.title}</h2>
          <button ref={closeButton} type="button" className={styles.close} aria-label="Закрыть объяснение" onClick={() => close()}>
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div ref={content} id="explorer-explanation-copy" className={styles.body} tabIndex={0}
          role="region" aria-labelledby="explorer-explanation-title">
          {copy.quote && <blockquote className={styles.quote} lang="en">{copy.quote}</blockquote>}
          {copy.paragraphs.map((paragraph, index) => (
            <p key={index} data-explanation-paragraph className={index === copy.paragraphs.length - 1 ? styles.conclusion : undefined}>
              {index === 0 && copy.lead && <span className={styles.phrase} lang="en">{copy.lead}</span>}{paragraph}
            </p>
          ))}
        </div>
      </div>
    </dialog>, document.body,
  );
}
