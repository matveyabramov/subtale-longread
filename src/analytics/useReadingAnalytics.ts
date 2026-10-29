import { useEffect } from 'react';
import type { ReadingView } from '../sections/experiment/model';
import { milestone } from './metrica';

export function useReadingAnalytics(view: ReadingView) {
  useEffect(() => {
    if (view.step === 'instructions') milestone('experiment_start');
    if (view.step === 'result') milestone('experiment_result');
    if (view.mode !== 'reading') return;
    milestone('reading_start');
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (document.hidden || document.querySelector('dialog[open], #contents-panel')) return;
      const start = document.getElementById('emptiness');
      const footer = document.getElementById('footer');
      if (!start?.getClientRects().length || !footer?.getClientRects().length) return;
      const top = start.getBoundingClientRect().top;
      const end = footer.getBoundingClientRect();
      const height = end.top - top;
      if (height <= 0) return;
      const progress = (window.innerHeight - top) / height;
      if (progress >= 0.5) milestone('read_50');
      if (progress >= 0.75) milestone('read_75');
      if (end.top < window.innerHeight && end.bottom > 0) milestone('footer_reached');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [view.mode, view.step]);
}
