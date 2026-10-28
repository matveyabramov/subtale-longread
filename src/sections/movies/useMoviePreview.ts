import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import type { MovieMedia } from './model';

const hoverQuery = '(hover: hover) and (pointer: fine)';
const motionQuery = '(prefers-reduced-motion: reduce)';

/** One lazily sourced, silent video. Every interruption requires a new hover. */
export function useMoviePreview(sectionRef: RefObject<HTMLElement | null>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = useRef<HTMLElement | null>(null);
  const request = useRef(0);
  const [preview, setPreview] = useState<{ media: MovieMedia; top: number } | null>(null);
  const stop = useCallback(() => {
    request.current += 1;
    active.current = null;
    videoRef.current?.pause();
    setPreview(null);
  }, []);

  const permitted = () => !document.hidden && window.matchMedia(hoverQuery).matches &&
    !window.matchMedia(motionQuery).matches && !document.querySelector('dialog[open]');

  const start = (media: MovieMedia, row: HTMLElement) => {
    const video = videoRef.current;
    if (!video || !permitted()) return;
    const bounds = row.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
    const token = ++request.current;
    active.current = row;
    video.pause();
    video.muted = true;
    video.poster = media.poster;
    if (video.getAttribute('src') !== media.video) video.src = media.video;
    setPreview({ media, top: Math.max(16, Math.min(bounds.top + 40, window.innerHeight - 220)) });
    // One DOM video prevents competing playback even across delayed play promises.
    void video.play().catch(() => { if (request.current === token) stop(); });
  };

  const guardPlayback = () => {
    if (!active.current || !permitted()) stop();
  };

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => !entry.isIntersecting &&
        (entry.target === section || entry.target === active.current))) stop();
    });
    observer.observe(section);
    section.querySelectorAll('[data-movie-case]').forEach((row) => observer.observe(row));
    const hover = window.matchMedia(hoverQuery);
    const motion = window.matchMedia(motionQuery);
    const onVisibility = () => { if (document.hidden) stop(); };
    hover.addEventListener('change', stop);
    motion.addEventListener('change', stop);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', stop);
    window.addEventListener('blur', stop);
    window.addEventListener('scroll', stop, { passive: true });
    window.addEventListener('resize', stop);
    return () => {
      request.current += 1;
      active.current = null;
      video?.pause();
      video?.removeAttribute('src');
      observer.disconnect();
      hover.removeEventListener('change', stop);
      motion.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', stop);
      window.removeEventListener('blur', stop);
      window.removeEventListener('scroll', stop);
      window.removeEventListener('resize', stop);
    };
  }, [sectionRef, stop]);

  return { videoRef, preview, start, stop, guardPlayback };
}
