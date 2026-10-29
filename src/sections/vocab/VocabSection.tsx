import { useRef } from 'react';
import { useEditorialEntrance } from '../../shared/useEditorialEntrance';
import { imageAssets, vectorAssets } from '../../assets/generated';
import { copy } from './copy';
import styles from './VocabSection.module.css';

export function VocabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEditorialEntrance(sectionRef);
  return (
    <section ref={sectionRef} id="vocab" aria-labelledby="vocab-title" data-narrative-section data-section-surface className={styles.section}>
      <div className={`${styles.texture} ${styles.mosaic}`} data-section-texture data-node-id="10:967" aria-hidden="true"
        style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
      <div className={styles.canvas} data-section-canvas data-node-id="10:966">
        <div className={styles.statistic} data-node-id="10:968">
          <div className={styles.artwork} data-node-id="10:969" data-editorial-reveal="scroll">
            <img src={vectorAssets['vocab-illustration']} alt="98%" />
          </div>
          <p className={styles.text} data-node-id="10:971"><span>{copy['10:971']}</span></p>
        </div>
        <div className={styles.sectionHeading}>
          <h2 id="vocab-title" tabIndex={-1} className={styles.text} data-node-id="10:973" data-editorial-reveal="scroll"><span>{copy['10:973']}</span></h2>
          <div className={styles.banner} data-node-id="10:974" data-editorial-reveal="scroll">
            <p className={styles.text} data-node-id="10:975"><span className={styles.regularBanner}>{copy['10:975']}</span><span className={styles.mobileBanner}>{copy['10:975'].replace('равно не', 'равно\nне')}</span></p>
          </div>
        </div>
        <p className={styles.text} data-node-id="10:972" data-editorial-reveal="scroll"><span>{copy['10:972']}</span></p>
      </div>
    </section>
  );
}
