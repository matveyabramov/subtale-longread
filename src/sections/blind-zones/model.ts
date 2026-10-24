export const explorerCategories = [
  { id: 'idiom', frames: { A: '10:1431', B: '10:1596' } },
  { id: 'pun', frames: { A: '10:1495', B: '10:1981' } },
  { id: 'doubleMeaning', frames: { A: '10:1528', B: '10:2017' } },
  { id: 'reference', frames: { A: '10:1560', B: '10:2049' } },
] as const;

export type ExplorerCategoryId = (typeof explorerCategories)[number]['id'];
export type MeaningState = 'A' | 'B';

export interface ExplorerState {
  category: ExplorerCategoryId;
  stateByCategory: Record<ExplorerCategoryId, MeaningState>;
}

// State persistence belongs to this section, in memory until reload. No reducer yet.
