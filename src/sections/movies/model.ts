import { posterAssets, videoAssets } from '../../assets/generated';

export const movieCases = [
  { id: 'airplane', video: videoAssets['airplane-surely'], poster: posterAssets['airplane-surely'] },
  { id: 'backToTheFuture', video: videoAssets['back-to-the-future-tree'], poster: posterAssets['back-to-the-future-tree'] },
  { id: 'austinPowers', video: videoAssets['austin-powers-number-two'], poster: posterAssets['austin-powers-number-two'] },
  { id: 'sherlock', video: videoAssets['sherlock-sher-locked'], poster: posterAssets['sherlock-sher-locked'] },
  { id: 'theShining', video: videoAssets['the-shining-heres-johnny'], poster: posterAssets['the-shining-heres-johnny'] },
] as const;

export type MovieCaseId = (typeof movieCases)[number]['id'];
export type PlaybackStatus = 'poster' | 'loading' | 'playing' | 'paused' | 'buffering' | 'ended' | 'error';

export interface ScenePlaybackState {
  status: PlaybackStatus;
  currentTime: number;
  muted: boolean;
}

export interface MediaCoordinatorState {
  activeCaseId: MovieCaseId | null;
}

// Stage 3: first explicit Play has sound; respect a subsequent manual mute.
// Stage 1A does not mount video elements, load MP4s or implement a coordinator.
