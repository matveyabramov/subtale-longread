import { useEffect, useRef, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { imageAssets, vectorAssets } from '../../assets/generated';
import { sectionIds } from '../../shared/navigation';
import { scrollToReadingTarget } from '../../shared/readingViewport';
import { useCurrentSection } from './useCurrentSection';
import control from './HeaderControl.module.css';
import styles from './Contents.module.css';

const titles = [
  'НАЧАЛО', 'СЛЕПОЕ ПЯТНО', 'МОЗГ НЕ ЛЮБИТ ПУСТОТУ', 'СМЫСЛ НЕ СУММА СЛОВ',
  'ИДИОМЫ, КАЛАМБУРЫ, ОТСЫЛКИ', 'РАЗБОР КИНОСЦЕН', 'ЗНАТЬ СЛОВА МАЛО',
  'ПРИЗНАКИ УПУЩЕННОГО СМЫСЛА', 'ЗАМЕЧАЙ БОЛЬШЕ', 'ЛОВУШКА ПОНИМАНИЯ',
];

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function Contents({ open, onClose, triggerRef }: Props) {
  const current = useCurrentSection();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  const closeAndRestore = () => {
    onClose();
    triggerRef.current?.focus({ preventScroll: true });
  };

  return createPortal(
    <div id="contents-panel" className={styles.panel}
      onClick={(event) => {
        if (event.target instanceof Element && !event.target.closest('a, button')) closeAndRestore();
      }}
      onBlur={(event) => {
        // Keyboard users can leave this nonmodal disclosure in either direction.
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) onClose();
      }}>
      <div className={styles.texture} aria-hidden="true"
        style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <img src={vectorAssets['subtale-pixel-mark']} alt="" />
            <div className={styles.brandName}>
              <span className={styles.brandLatin}>subtale</span>
              <span className={styles.brandCyrillic}>cабтейл</span>
            </div>
          </div>
          <span className={styles.label}>/ ОГЛАВЛЕНИЕ</span>
        </div>
        <button ref={closeRef} type="button" className={`${control.control} ${control.close}`} onClick={closeAndRestore}>
          <span>Закрыть</span><span className={`${control.icon} ${control.cross}`} aria-hidden="true"><i /><i /></span>
        </button>
      </header>
      <nav className={styles.navigation} aria-label="Оглавление">
        <ol className={styles.list}>
          {sectionIds.map((id, index) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={current === id ? 'location' : undefined}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  onClose();
                  const section = document.getElementById(id);
                  if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
                  if (section) scrollToReadingTarget(section);
                  const headingId = section?.getAttribute('aria-labelledby');
                  if (headingId) document.getElementById(headingId)?.focus({ preventScroll: true });
                }}>
                <span className={styles.number}>{String(index).padStart(2, '0')}</span>
                <span className={styles.title}>{titles[index]}</span>
                <span className={styles.marker} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>, document.body,
  );
}

export function ContentsTrigger({ open, onToggle, triggerRef }: {
  open: boolean;
  onToggle: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  return createPortal(
    <button type="button" className={`${control.control} ${control.trigger}`} data-node-id="10:680"
      ref={triggerRef} aria-expanded={open} aria-hidden={open || undefined} tabIndex={open ? -1 : undefined}
      aria-controls="contents-panel" onClick={onToggle}>
      <span data-node-id="10:681">Оглавление</span>
      <span className={control.icon} data-node-id="10:682" aria-hidden="true"><i /><i /></span>
    </button>, document.body,
  );
}
