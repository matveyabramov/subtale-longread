import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockPageScroll } from '../../shared/lockPageScroll';
import type { MovieMedia } from './model';
import { movieAnalysis } from './movieAnalysis';
import styles from './MovieAnalysisDialog.module.css';

export function MovieAnalysisDialog({ media, trigger, onDismiss }: {
  media: MovieMedia; trigger: HTMLButtonElement; onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropPress = useRef(false);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState(false);
  const analysis = movieAnalysis[media.id];

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    let unlock: (() => void) | undefined;
    try {
      dialog.showModal();
      unlock = lockPageScroll();
      dialog.querySelector<HTMLButtonElement>('[data-close]')?.focus({ preventScroll: true });
    } catch { onDismiss(); }
    return () => {
      dialog.close();
      unlock?.();
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger, onDismiss]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const pause = () => video.pause();
    const visibility = () => { if (document.hidden) pause(); };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => { if (!entry?.isIntersecting) pause(); });
    observer.observe(video);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', onDismiss);
    window.addEventListener('hashchange', onDismiss);
    window.addEventListener('popstate', onDismiss);
    motion.addEventListener('change', pause);
    return () => {
      pause();
      video.removeAttribute('src');
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', onDismiss);
      window.removeEventListener('hashchange', onDismiss);
      window.removeEventListener('popstate', onDismiss);
      motion.removeEventListener('change', pause);
    };
  }, [onDismiss]);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setError(false);
    if (!requested || error) {
      video.src = media.video;
      if (error) video.load();
    }
    setRequested(true);
    video.focus({ preventScroll: true });
    void video.play().catch(() => setError(true));
  };
  const outside = (x: number, y: number) => {
    const bounds = dialogRef.current?.getBoundingClientRect();
    return !!bounds && (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom);
  };

  // StrictMode cleanup queues close before showModal reopens the same element.
  // Only dismiss a genuinely closed dialog, not that stale close event.
  return createPortal(
    <dialog ref={dialogRef} id="movie-analysis" className={styles.dialog} aria-labelledby="movie-analysis-title"
      onCancel={(event) => { event.preventDefault(); onDismiss(); }}
      onClose={(event) => { if (!event.currentTarget.open) onDismiss(); }}
      onPointerDown={(event) => { backdropPress.current = event.target === event.currentTarget && outside(event.clientX, event.clientY); }}
      onPointerCancel={() => { backdropPress.current = false; }}
      onClick={(event) => {
        const dismiss = backdropPress.current && event.target === event.currentTarget && outside(event.clientX, event.clientY);
        backdropPress.current = false;
        if (dismiss) onDismiss();
      }}>
      <header className={styles.header}>
        <p className={styles.category}>{analysis.category}</p>
        <button type="button" className={styles.close} data-close onClick={onDismiss} aria-label="Закрыть разбор">Закрыть <span aria-hidden="true">×</span></button>
      </header>
      <div className={styles.interior}>
        <h2 id="movie-analysis-title" className={styles.title} lang="en">{analysis.title}</h2>
        <p className={styles.film}>{analysis.film}</p>
        <div className={styles.media}>
          <video ref={videoRef} poster={media.poster} preload="none" playsInline controls={requested} tabIndex={0}
            aria-label={`Сцена: ${analysis.film}`} onError={() => setError(true)}
            onPlay={(event) => { if (document.hidden) event.currentTarget.pause(); }} />
          {(!requested || error) && <button type="button" className={styles.play} onClick={play}>
            {error ? 'Повторить загрузку сцены' : 'Смотреть сцену'} <span aria-hidden="true">▶</span>
          </button>}
        </div>
        {error && <p role="status" className={styles.error}>Не удалось воспроизвести видео. Разбор доступен ниже.</p>}
        <div className={styles.body}>{analysis.content}</div>
      </div>
    </dialog>, document.body,
  );
}
