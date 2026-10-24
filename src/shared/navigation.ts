export const sectionIds = [
  'hero',
  'experiment',
  'emptiness',
  'elephant',
  'blind-zones',
  'movies',
  'vocab',
  'blind-spot-scene',
  'what-to-do',
  'footer',
] as const;

export const experimentAnchorIds = [
  'experiment-instructions',
  'experiment-target',
  'experiment-result',
] as const;

export type SectionId = (typeof sectionIds)[number];
export type ExperimentAnchorId = (typeof experimentAnchorIds)[number];
export type ReadingAnchorId = SectionId | ExperimentAnchorId;
export type ReadingHref = `#${ReadingAnchorId}`;

// Stage 3 will move focus on explicit navigation only. Native scrolling stays native.
