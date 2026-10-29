import { useCallback, useEffect, useRef } from 'react';
import type { ReadingView } from './model';
import styles from './SceneTransition.module.css';

// Same path commands at both endpoints: the second contour is an expanding
// circular hole in the outgoing snapshot, never a mask on the live screen.
function aperture(width: number, height: number, radius: number) {
  const x = width / 2;
  const y = height / 2;
  return `path(evenodd, "M0 0 H${width} V${height} H0 Z M${x - radius} ${y} A${radius} ${radius} 0 1 0 ${x + radius} ${y} A${radius} ${radius} 0 1 0 ${x - radius} ${y} Z")`;
}

const frozenPaint = ['opacity', 'transform', 'translate', 'rotate', 'scale', 'clip-path',
  'color', 'background-color', 'border-color', 'filter', 'outline', 'outline-offset'] as const;

function copyScene(source: HTMLElement) {
  const copy = source.cloneNode(true) as HTMLElement;
  const originals = [source, ...source.querySelectorAll<HTMLElement>('*')];
  const copies = [copy, ...copy.querySelectorAll<HTMLElement>('*')];
  const scrollPositions: { node: HTMLElement; top: number; left: number }[] = [];
  originals.forEach((original, index) => {
    const node = copies[index]!;
    if (original.scrollTop || original.scrollLeft) scrollPositions.push({ node, top: original.scrollTop, left: original.scrollLeft });
    const paint = getComputedStyle(original);
    for (const property of frozenPaint) node.style.setProperty(property, paint.getPropertyValue(property), 'important');
    node.style.setProperty('animation', 'none', 'important');
    node.style.setProperty('transition', 'none', 'important');
    node.style.setProperty('--scene-before-border', getComputedStyle(original, '::before').borderColor);
    node.style.setProperty('--scene-after-border', getComputedStyle(original, '::after').borderColor);
    node.removeAttribute('id'); // Never shadow live anchors, focus or history targets.
    node.removeAttribute('data-narrative-section');
    for (const attribute of [...node.attributes]) {
      if (attribute.name.startsWith('data-editorial-')) node.removeAttribute(attribute.name);
    }
  });
  const rect = source.getBoundingClientRect();
  for (const [property, value] of Object.entries({ position: 'absolute', left: `${rect.left}px`,
    top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, margin: '0' })) {
    copy.style.setProperty(property, value, 'important');
  }
  return { copy, restoreScroll: () => scrollPositions.forEach(({ node, top, left }) => {
    node.scrollTop = top;
    node.scrollLeft = left;
  }) };
}

/** Presentation only. Every route applies immediately and cancels the old
 * decoration first; Target is never captured or put inside an animated parent. */
export function useSceneTransition() {
  const active = useRef<{ node: HTMLDivElement; animation: Animation } | null>(null);
  const cancel = useCallback(() => {
    const previous = active.current;
    active.current = null;
    previous?.animation.cancel();
    previous?.node.remove();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { if (media.matches) cancel(); };
    const visibility = () => { if (document.hidden) cancel(); };
    media.addEventListener('change', preference);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('resize', cancel);
    window.visualViewport?.addEventListener('resize', cancel);
    window.addEventListener('pagehide', cancel);
    return () => {
      cancel();
      media.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('resize', cancel);
      window.visualViewport?.removeEventListener('resize', cancel);
      window.removeEventListener('pagehide', cancel);
    };
  }, [cancel]);

  return useCallback((previous: ReadingView, next: ReadingView, source: string, id: string) => {
    cancel(); // Includes rapid Back, Target, history and gesture interruptions.
    if (!['navigate', 'gesture'].includes(source) || document.hidden ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const entering = previous.mode === 'experiment' && previous.step === null && next.step === 'instructions';
    const leaving = previous.step === 'result' && next.mode === 'reading' && id === 'emptiness';
    if (!entering && !leaving) return;
    const scene = document.getElementById(entering ? 'hero' : 'experiment-layer');
    if (!scene || scene.hidden || scene.querySelector('#experiment-target')) return;
    const rect = scene.getBoundingClientRect();
    // A partially departed Hero cannot supply the whole outgoing viewport.
    if (rect.top > 1 || rect.bottom < innerHeight - 1 || rect.width <= 0) return;
    const opening = aperture(innerWidth, innerHeight, 0.5);
    const opened = aperture(innerWidth, innerHeight, Math.hypot(innerWidth, innerHeight) / 2 + 2);
    if (!CSS.supports('clip-path', opening)) return;
    let node: HTMLDivElement | null = null;
    try {
      node = document.createElement('div');
      node.className = styles.snapshot!;
      node.dataset.sceneTransition = entering ? 'hero-instructions' : 'result-emptiness';
      node.setAttribute('aria-hidden', 'true');
      node.inert = true;
      const snapshot = copyScene(scene);
      node.append(snapshot.copy);
      document.body.append(node);
      snapshot.restoreScroll();
      const animation = node.animate([{ clipPath: opening }, { clipPath: opened }], {
        duration: entering ? 580 : 620,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'both',
      });
      active.current = { node, animation };
      const finish = () => { if (active.current?.node === node) cancel(); };
      void animation.finished.then(finish, finish);
    } catch {
      cancel();
      node?.remove(); // Failed setup never blocks navigation or leaves a cover.
    }
  }, [cancel]);
}
