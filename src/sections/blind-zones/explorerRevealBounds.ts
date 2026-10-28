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

// Hit areas use the union of both existing endpoints and never depend on the
// displayed state. All artwork geometry/crops/paint order remain untouched.
export function explorerRevealStyle(category: ExplorerCategoryId) {
  const wide = wideBounds(category);
  const at = (viewport: 0 | 1 | 2) => union(Object.entries(responsiveArtSlots)
    .filter(([key]) => key.startsWith(category))
    .map(([key, slots]): Rect => {
      const slot = slots[viewport];
      return key === 'punB-0' ? rotated(slot, Math.cos(Math.PI / 6), 0.5, -0.5, Math.cos(Math.PI / 6)) : slot;
    }));
  const slots = [at(0), at(1), at(2)] as const;
  return {
    ...responsiveSlotStyle(wide, slots),
    '--reveal-x': `${wide[0]}px`, '--reveal-y': `${wide[1]}px`,
    '--reveal-width': `${wide[2]}px`, '--reveal-height': `${wide[3]}px`,
  } as CSSProperties;
}
