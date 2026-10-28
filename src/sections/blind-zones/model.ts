export const explorerCategories = [
  { id: 'idiom', frames: { A: '10:1431', B: '10:1596' } },
  { id: 'pun', frames: { A: '10:1495', B: '10:1981' } },
  { id: 'doubleMeaning', frames: { A: '10:1528', B: '10:2017' } },
  { id: 'reference', frames: { A: '10:1560', B: '10:2049' } },
] as const;

export type ExplorerCategoryId = (typeof explorerCategories)[number]['id'];
export type MeaningState = 'A' | 'B';

// Accessible visual descriptions, separate from the editorial explanation pop-ups.
export const explorerArtworkDescriptions = {
  idiom: { A: 'Восемь фрагментов льда', B: 'Телефонная трубка среди фрагментов льда' },
  pun: { A: 'Велосипед', B: 'Наклонённый велосипед' },
  doubleMeaning: { A: 'Глаз', B: 'Глаз с силуэтом пары' },
  reference: { A: 'Пять снежинок', B: 'Железный трон' },
} satisfies Record<ExplorerCategoryId, Record<MeaningState, string>>;

export interface ExplorerState {
  category: ExplorerCategoryId;
  stateByCategory: Record<ExplorerCategoryId, MeaningState>;
}

// Section-local memory until reload. Mouse hover previews do not overwrite it.
