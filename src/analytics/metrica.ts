import type { ExplorerCategoryId } from '../sections/blind-zones/model';
import type { MovieCaseId } from '../sections/movies/model';

export const COUNTER_ID = 113892269;
export const goals = {
  experiment_start: null, experiment_attempt: null, experiment_result: null,
  experiment_skip: null, reading_start: null,
  explorer_select: null, explorer_reveal: null,
  movie_analysis_open: null, movie_video_play: null,
  read_50: null, read_75: null, footer_reached: null,
} as const;
type GoalParams = {
  explorer_select: { category: ExplorerCategoryId };
  explorer_reveal: { category: ExplorerCategoryId };
  movie_analysis_open: { movie_id: MovieCaseId };
  movie_video_play: { movie_id: MovieCaseId };
};
type Goal = keyof typeof goals;
type Ym = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
declare global {
  interface Window {
    ym?: Ym;
    subtaleAnalytics?: { initialized: boolean; milestones: Set<Goal> };
  }
}

export function analyticsEnabled() {
  const host = location.hostname.toLowerCase();
  // An explicit production hostname also supports a future custom domain.
  // IP literals (including LAN), localhost and all dev builds are always excluded.
  return import.meta.env.PROD && host !== 'localhost' && !host.endsWith('.localhost')
    && !host.includes(':') && !/^\[|^[\d.]+$/.test(host)
    && host === (import.meta.env.VITE_ANALYTICS_HOSTNAME || 'matveyabramov.github.io');
}

export function initializeAnalytics() {
  if (!analyticsEnabled()) return;
  const state = window.subtaleAnalytics ??= { initialized: false, milestones: new Set() };
  if (state.initialized) return;
  state.initialized = true;
  try {
    const ym: Ym = window.ym ?? Object.assign((...args: unknown[]) => {
      // A blocked script must not grow an unbounded queue.
      if ((ym.a?.length ?? 0) < 100) (ym.a ??= []).push(args);
    }, { l: Date.now() });
    window.ym = ym;
    ym(COUNTER_ID, 'init', {
      ssr: true, webvisor: true, clickmap: true,
      referrer: document.referrer, url: location.href,
      accurateTrackBounce: true, trackLinks: true,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;
    document.head.append(script);
  } catch { /* Analytics must never interrupt the longread. */ }
}

export function reachGoal<T extends Goal>(goal: T,
  ...args: T extends keyof GoalParams ? [params: GoalParams[T]] : []
) {
  if (!analyticsEnabled() || !window.subtaleAnalytics?.initialized) return;
  try { window.ym?.(COUNTER_ID, 'reachGoal', goal, ...args); } catch { /* Optional service. */ }
}

type Milestone = Exclude<Goal, keyof GoalParams>;
export function milestone(goal: Milestone) {
  if (!analyticsEnabled()) return;
  const state = window.subtaleAnalytics;
  if (!state?.initialized || state.milestones.has(goal)) return;
  state.milestones.add(goal);
  reachGoal(goal);
}
