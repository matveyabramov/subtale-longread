import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Contents, ContentsTrigger } from '../components/contents/Contents';
import { HeroSection } from '../sections/hero/HeroSection';
import { ExperimentSection } from '../sections/experiment/ExperimentSection';
import { useExperimentNavigation } from '../sections/experiment/useExperimentNavigation';
import { ReadingNavigation } from '../shared/ReadingNavigation';
import { EmptinessSection } from '../sections/emptiness/EmptinessSection';
import { ElephantSection } from '../sections/elephant/ElephantSection';
import { BlindZonesExplorer } from '../sections/blind-zones/BlindZonesExplorer';
import { MoviesSection } from '../sections/movies/MoviesSection';
import { VocabSection } from '../sections/vocab/VocabSection';
import { BlindSpotSceneSection } from '../sections/blind-spot-scene/BlindSpotSceneSection';
import { WhatToDoSection } from '../sections/what-to-do/WhatToDoSection';
import { FooterSection } from '../sections/footer/FooterSection';
import { useReducedMotion } from '../shared/useReducedMotion';
import { useInputModality } from '../shared/useInputModality';
import { positionInitialReadingAnchor } from '../shared/reloadNavigation';
import styles from './App.module.css';

export function App() {
  const experiment = useExperimentNavigation();
  useLayoutEffect(positionInitialReadingAnchor, []);
  useInputModality();
  const reducedMotion = useReducedMotion();
  const [contentsOpen, setContentsOpen] = useState(false);
  const contentsTrigger = useRef<HTMLButtonElement>(null);
  const closeContents = useCallback(() => setContentsOpen(false), []);

  return (
    <ReadingNavigation value={experiment.navigate}>
      <div className={styles.longread} data-reduced-motion={reducedMotion} data-reading-mode={experiment.mode}>
        <main id="main-content" tabIndex={-1}>
          <HeroSection contentsOpen={contentsOpen} hidden={experiment.mode === 'reading' || experiment.step !== null} />
          <ExperimentSection navigation={experiment} />
          <div className={styles.readingContent} hidden={experiment.mode !== 'reading'} inert={experiment.mode !== 'reading'}>
            <EmptinessSection />
            <ElephantSection />
            <BlindZonesExplorer />
            <MoviesSection />
            <VocabSection />
            <BlindSpotSceneSection />
            <WhatToDoSection />
          </div>
        </main>
        <div className={styles.readingContent} hidden={experiment.mode !== 'reading'} inert={experiment.mode !== 'reading'}>
          <FooterSection />
        </div>
        <ContentsTrigger open={contentsOpen} triggerRef={contentsTrigger}
          onToggle={() => setContentsOpen((open) => !open)} />
        <Contents open={contentsOpen} onClose={closeContents} triggerRef={contentsTrigger} />
      </div>
    </ReadingNavigation>
  );
}
