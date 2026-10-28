import { HeroSection } from '../sections/hero/HeroSection';
import { ExperimentSection } from '../sections/experiment/ExperimentSection';
import { EmptinessSection } from '../sections/emptiness/EmptinessSection';
import { ElephantSection } from '../sections/elephant/ElephantSection';
import { BlindZonesExplorer } from '../sections/blind-zones/BlindZonesExplorer';
import { MoviesSection } from '../sections/movies/MoviesSection';
import { VocabSection } from '../sections/vocab/VocabSection';
import { BlindSpotSceneSection } from '../sections/blind-spot-scene/BlindSpotSceneSection';
import { WhatToDoSection } from '../sections/what-to-do/WhatToDoSection';
import { FooterSection } from '../sections/footer/FooterSection';
import { useReducedMotion } from '../shared/useReducedMotion';
import styles from './App.module.css';

export function App() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.longread} data-reduced-motion={reducedMotion}>
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ExperimentSection />
        <EmptinessSection />
        <ElephantSection />
        <BlindZonesExplorer />
        <MoviesSection />
        <VocabSection />
        <BlindSpotSceneSection />
        <WhatToDoSection />
      </main>
      <FooterSection />
    </div>
  );
}
