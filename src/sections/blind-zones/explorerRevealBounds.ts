import { iceFragments, punMatrices, snowflakes } from './explorerArtworkData';
import { responsiveArtSlots, responsiveSlotStyle } from './explorerResponsiveData';
import type { ExplorerCategoryId } from './model';
import type { CSSProperties } from 'react';

type Rect = readonly [number, number, number, number];

function union(rectangles: Rect[]): Rect {
  const x = Math.min(...rectangles.map((r) => r[0]));
  const y = Math.min(...rectangles.map((r) => r[1]));
  return [x, y, Math.max(...rectangles.map((r) => r[0] + r[2])) - x,
    Math.max(...rectangles.map((r) => r[1] + r[3])) - y];
}

function rotated([x, y, w, h]: Rect, a: number, b: number, c: number, d: number): Rect {
  return union(([[0, 0], [w, 0], [0, h], [w, h]] as const).map(([px, py]) =>
    [x + a * px + c * py, y + b * px + d * py, 0, 0]));
}

function wideBounds(category: ExplorerCategoryId): Rect {
  switch (category) {
    case 'idiom': return union([...iceFragments.map((r): Rect => [r.x, r.y, r.width, r.height]), [227, 228, 635, 851]]);
    case 'pun': return union(Object.values(punMatrices).map(([[a, c, x], [b, d, y]]) => rotated([x, y, 735, 985], a, b, c, d)));
    case 'doubleMeaning': return [115, 383, 845, 563];
    case 'reference': return union([...snowflakes.map((r): Rect => [r.x, r.y, r.width, r.height]), [301, 263, 610, 817]]);
  }
}

// A/B share stable bounds for fitting and input; crops and paint order stay
// independent of the available viewport height.
function revealBounds(category: ExplorerCategoryId) {
  const wide = wideBounds(category);
  const at = (viewport: 0 | 1 | 2) => union(Object.entries(responsiveArtSlots)
    .filter(([key]) => key.startsWith(category))
    .map(([key, slots]): Rect => {
      const slot = slots[viewport];
      return key === 'punB-0' ? rotated(slot, Math.cos(Math.PI / 6), 0.5, -0.5, Math.cos(Math.PI / 6)) : slot;
    }));
  const slots = [at(0), at(1), at(2)] as const;
  return { wide, slots };
}

export function explorerFitBounds(category: ExplorerCategoryId, viewport: number): Rect {
  const { wide, slots: [desktop, tablet, phone] } = revealBounds(category);
  if (viewport >= 1920) return wide;
  // Match responsiveSlotStyle's source coordinates before applying the fit.
  const axis = (i: 0 | 1 | 2 | 3) => {
    if (viewport > 1100) return desktop[i] * Math.min(1, viewport / 1440)
      + (wide[i] - desktop[i]) / 480 * Math.max(0, viewport - 1440);
    const mobile = phone[i] - (i === 1 ? 366 : 0);
    const target = tablet[i] - (i === 1 ? 497 : 0);
    const origin = i === 0 ? 15 : i === 1 ? 222.5 : 0;
    return origin + (mobile - origin) * Math.min(1, (viewport - 30) / 360)
      + (target - mobile) / 378 * Math.max(0, Math.min(378, viewport - 390));
  };
  return [axis(0), axis(1), axis(2), axis(3)];
}

export function explorerRevealStyle(category: ExplorerCategoryId) {
  const { wide, slots } = revealBounds(category);
  return {
    ...responsiveSlotStyle(wide, slots),
    '--reveal-x': `${wide[0]}px`, '--reveal-y': `${wide[1]}px`,
    '--reveal-width': `${wide[2]}px`, '--reveal-height': `${wide[3]}px`,
  } as CSSProperties;
}
