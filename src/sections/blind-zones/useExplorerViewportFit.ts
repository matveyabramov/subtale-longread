import { useLayoutEffect, useRef } from 'react';
import { explorerFitBounds } from './explorerRevealBounds';
import type { ExplorerCategoryId } from './model';

// Scale slot coordinates, not a wrapper: phone/ice and heading keep their
// shared stacking context. Both A/B endpoints use the same fit calculation.
export function useExplorerViewportFit(category: ExplorerCategoryId) {
  const stage = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = stage.current;
    if (!element) return;
    const fit = () => {
      const [x, y, width, height] = explorerFitBounds(category, window.innerWidth);
      const scale = Math.min(1, element.clientWidth / width, element.clientHeight / height);
      const values = {
        '--fit-scale': String(scale), '--fit-origin-x': `${x}px`, '--fit-origin-y': `${y}px`,
        '--fit-left': `${(element.clientWidth - width * scale) / 2}px`,
        '--fit-top': `${(element.clientHeight - height * scale) / 2}px`,
      };
      for (const [name, value] of Object.entries(values)) element.style.setProperty(name, value);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    window.addEventListener('resize', fit);
    return () => { observer.disconnect(); window.removeEventListener('resize', fit); };
  }, [category]);
  return stage;
}
