import type { ExperimentAnchorId } from '../../shared/navigation';

export const experimentSteps = [
  { id: 'instructions', anchor: 'experiment-instructions', frame: '10:718' },
  { id: 'target', anchor: 'experiment-target', frame: '10:730' },
  { id: 'result', anchor: 'experiment-result', frame: '10:760' },
] as const satisfies readonly { id: string; anchor: ExperimentAnchorId; frame: string }[];

export type ExperimentStep = (typeof experimentSteps)[number]['id'];
export type ExperimentOutcome = 'unattempted' | 'attempted' | 'skipped';

// Screens remain in document flow; gestures stay local to the active frame.
export interface ExperimentState {
  outcome: ExperimentOutcome;
  helpOpen: boolean;
}
