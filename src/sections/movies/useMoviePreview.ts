import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { movieCases, type MovieMedia } from './model';

const hoverQuery = '(hover: hover) and (pointer: fine)';
const motionQuery = '(prefers-reduced-motion: reduce)';
type Selection = { media: MovieMedia; autoplay: boolean; source: 'pointer' | 'focus' };

/** Native scrolling changes the hit target, never the permission to preview. */
export function useMoviePreview(sectionRef: RefObject<HTMLElement | null>, listRef: RefObject<HTMLDivElement | null>) {
  const videos = useRef(new Map<string, HTMLVideoElement>());
  const selected = useRef<Selection | null>(null);
  const [preview, setPreview] = useState<Selection | null>(null);
  const pause = useCallback(() => videos.current.forEach((video) => video.pause()), []);
  const stop = useCallback(() => {
    selected.current = null;
    pause();
    setPreview(null);
  }, [pause]);
  const select = useCallback((media: MovieMedia, source: Selection['source']) => {
    if (document.hidden || document.querySelector('dialog[open]')) return;
    const autoplay = source !== 'focus' && !window.matchMedia(motionQuery).matches;
    const current = selected.current;
    if (current?.media.id === media.id && current.autoplay === autoplay && current.source === source) return;
    // Pause synchronously, before React or any new play promise can run.
    pause();
    selected.current = { media, autoplay, source };
    setPreview(selected.current);
  }, [pause]);
  const focus = (media: MovieMedia) => {
    if (document.documentElement.dataset.inputModality !== 'pointer' &&
      selected.current?.media.id !== media.id) select(media, 'focus');
  };
  const blur = () => { if (selected.current?.source === 'focus') stop(); };
  const guardPlayback = (video: HTMLVideoElement, media: MovieMedia) => {
    const current = selected.current;
    if (current?.media.id !== media.id || !current.autoplay || document.hidden ||
      window.matchMedia(motionQuery).matches || document.querySelector('dialog[open]')) video.pause();
  };

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;
    const hover = window.matchMedia(hoverQuery);
    const motion = window.matchMedia(motionQuery);
    let point: { x: number; y: number } | null = null;
    let visible = false;
    let frame = 0;
    let lastScroll = window.scrollY;
    let previousTime = 0;
    let x = 0;
    let rotation = 0;
    let target = 0;
    const blocked = () => document.hidden || !!document.querySelector('dialog[open]');
    const resetMotion = () => {
      x = rotation = target = previousTime = 0;
      list.style.transform = '';
    };
    const rowVisible = (row: Element) => {
      const bounds = row.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    };
    const hitTest = () => {
      if (!visible || blocked()) { stop(); return; }
      if (selected.current?.source === 'focus') {
        const row = section.querySelector(`[data-movie-case="${selected.current.media.id}"]`);
        if (!row || !rowVisible(row)) stop();
        return;
      }
      if (!hover.matches || !point) return;
      const row = document.elementFromPoint(point.x, point.y)?.closest<HTMLElement>('[data-movie-case]');
      const media = row && section.contains(row) && movieCases.find((item) => item.id === row.dataset.movieCase);
      if (media) select(media, 'pointer');
      else stop();
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || blocked()) { resetMotion(); stop(); return; }
      const dt = previousTime ? Math.min(now - previousTime, 64) : 1000 / 60;
      previousTime = now;
      if (hover.matches && !motion.matches) {
        // Time-based exponential ease: retarget from the current pose, no overshoot.
        const blend = 1 - Math.exp(-dt / 80);
        x += (target * 6 - x) * blend;
        rotation += (target * 0.35 - rotation) * blend;
        target *= Math.exp(-dt / 90);
        list.style.transform = `translateX(${x.toFixed(3)}px) rotate(${rotation.toFixed(4)}deg)`;
      } else resetMotion();
      // Use the painted, transformed rows, including while the sway settles.
      hitTest();
      if (Math.abs(x) + Math.abs(rotation) + Math.abs(target) > 0.01) schedule();
      else resetMotion();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') { suspend(); return; }
      if (!hover.matches) return;
      section.dataset.mouseHover = 'true';
      point = { x: event.clientX, y: event.clientY };
      if (selected.current?.source === 'focus') stop();
      if (visible) schedule();
    };
    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (!visible) return;
      if (hover.matches && point && !motion.matches && !blocked() && Math.abs(delta) > 0.1) {
        target = Math.max(-1, Math.min(1, delta / 50));
      }
      schedule();
    };
    const suspend = () => {
      delete section.dataset.mouseHover;
      point = null;
      cancelAnimationFrame(frame);
      frame = 0;
      resetMotion();
      stop();
    };
    // Touch emits pointerout on every lift; only a mouse can leave the window.
    const onPointerOut = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && !event.relatedTarget) suspend();
    };
    const onVisibility = () => { if (document.hidden) suspend(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) schedule(); else suspend();
    });
    observer.observe(section);
    // Other dialogs (including contents) also suspend previews immediately.
    const dialogs = new MutationObserver(() => { if (blocked()) suspend(); });
    dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'], childList: true });
    hover.addEventListener('change', suspend);
    motion.addEventListener('change', suspend);
    document.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerdown', onPointer, { capture: true, passive: true });
    document.addEventListener('pointerout', onPointerOut);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', suspend);
    window.addEventListener('blur', suspend);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      resetMotion();
      pause();
      observer.disconnect();
      dialogs.disconnect();
      hover.removeEventListener('change', suspend);
      motion.removeEventListener('change', suspend);
      document.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerdown', onPointer, true);
      delete section.dataset.mouseHover;
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', suspend);
      window.removeEventListener('blur', suspend);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
    };
  }, [sectionRef, listRef, pause, select, stop]);

  return { videos, preview, stop, focus, blur, guardPlayback };
}
