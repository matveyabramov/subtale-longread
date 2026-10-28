import { sectionIds, type ExperimentAnchorId } from '../../shared/navigation';

export const experimentSteps = [
  { id: 'instructions', anchor: 'experiment-instructions', frame: '10:718' },
  { id: 'target', anchor: 'experiment-target', frame: '10:730' },
  { id: 'result', anchor: 'experiment-result', frame: '10:760' },
] as const satisfies readonly { id: string; anchor: ExperimentAnchorId; frame: string }[];

export type ExperimentStep = (typeof experimentSteps)[number]['id'];
export type ExperimentOutcome = 'unattempted' | 'attempted' | 'skipped';
export type ReadingView =
  | { mode: 'experiment'; step: ExperimentStep | null }
  | { mode: 'reading'; step: null };

export function experimentStepForHash(hash: string): ExperimentStep | null {
  if (hash === '#experiment') return 'instructions';
  return experimentSteps.find(({ anchor }) => hash === `#${anchor}`)?.id ?? null;
}

export function readingViewForHash(hash: string): ReadingView {
  const step = experimentStepForHash(hash);
  if (step) return { mode: 'experiment', step };
  const reading = sectionIds.some((id) => id !== 'hero' && id !== 'experiment' && hash === `#${id}`);
  return reading ? { mode: 'reading', step: null } : { mode: 'experiment', step: null };
}
