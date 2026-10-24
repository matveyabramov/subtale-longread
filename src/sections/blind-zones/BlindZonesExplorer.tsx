import { imageAssets } from '../../assets/generated';
import { explorerCategories } from './model';
import type { ExplorerCategoryId, MeaningState } from './model';
import { explorerCopy, explorerVisuals } from './explorerVisualData';
import { CulturalReferenceArtwork, DoubleMeaningArtwork, IdiomArtwork, PunArtwork } from './ExplorerArtwork';
import styles from './BlindZonesExplorer.module.css';

interface BlindZonesExplorerProps {
  category?: ExplorerCategoryId;
  meaning?: MeaningState;
}

// Controlled visual endpoints only. Stage 3 owns selection and per-category memory.
export function BlindZonesExplorer({ category = 'idiom', meaning = 'A' }: BlindZonesExplorerProps) {
  const visual = explorerVisuals[category][meaning];
  return (
    <section id="blind-zones" aria-labelledby="blind-zones-title" data-narrative-section
      className={styles.section} data-category-count={explorerCategories.length} data-category={category} data-meaning={meaning}>
      <div className={styles.canvas} data-node-id={visual.frame}>
        <div className={styles.texture} data-node-id={visual.texture} aria-hidden="true"
          style={{ zIndex: visual.order.texture, backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
        <div className={styles.categories} data-node-id={visual.panel} style={{ zIndex: visual.order.panel }}>
          {explorerCopy.map((copy, index) => {
            const ids = visual.cards[index];
            if (!ids) return null;
            return (
              <div key={copy.category} data-node-id={ids.card} data-active={category === copy.category} className={styles.card}>
                <div className={styles.cardContent} data-node-id={ids.content}>
                  <div className={styles.cardHeading} data-node-id={ids.heading}>
                    <p className={styles.number} data-node-id={ids.number}>{copy.number}</p>
                    <h3 className={styles.label} data-node-id={ids.label} style={{ width: copy.labelWidth }}>{copy.label}</h3>
                  </div>
                  <p className={styles.description} data-node-id={ids.description}><span>{copy.description}</span></p>
                </div>
              </div>
            );
          })}
        </div>
        <h2 id="blind-zones-title" tabIndex={-1} className={styles.title} data-node-id={visual.title}
          style={{ zIndex: visual.order.title }}>Слепые</h2>
        <p className={styles.banner} data-node-id={visual.banner} style={{ zIndex: visual.order.banner }}>
          <span data-node-id={visual.bannerText}>зоны восприятия</span>
        </p>
        <button type="button" className={styles.question} data-node-id={visual.question}
          style={{ zIndex: visual.order.question, width: visual.questionWidth }}>{visual.questionText}</button>
        {category === 'idiom' && <IdiomArtwork meaning={meaning} />}
        {category === 'pun' && <PunArtwork meaning={meaning} />}
        {category === 'doubleMeaning' && <DoubleMeaningArtwork meaning={meaning} />}
        {category === 'reference' && <CulturalReferenceArtwork meaning={meaning} />}
      </div>
    </section>
  );
}
