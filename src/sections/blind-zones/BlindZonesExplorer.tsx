import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { imageAssets } from '../../assets/generated';
import { explorerArtworkDescriptions, explorerCategories } from './model';
import type { ExplorerCategoryId, ExplorerState, MeaningState } from './model';
import { explorerCopy, explorerVisuals } from './explorerVisualData';
import { CulturalReferenceArtwork, DoubleMeaningArtwork, IdiomArtwork, PunArtwork } from './ExplorerArtwork';
import styles from './BlindZonesExplorer.module.css';

interface BlindZonesExplorerProps {
  category?: ExplorerCategoryId;
  meaning?: MeaningState;
}

// Optional initial endpoints keep the isolated A/B visual QA fixtures available.
export function BlindZonesExplorer({ category: initialCategory = 'idiom', meaning: initialMeaning = 'A' }: BlindZonesExplorerProps) {
  const [state, setState] = useState<ExplorerState>(() => ({
    category: initialCategory,
    stateByCategory: { idiom: 'A', pun: 'A', doubleMeaning: 'A', reference: 'A', [initialCategory]: initialMeaning },
  }));
  const [focusedCategory, setFocusedCategory] = useState(initialCategory);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { category, stateByCategory } = state;
  const meaning = stateByCategory[category];
  const visual = explorerVisuals[category][meaning];
  const activeCopy = explorerCopy.find((copy) => copy.category === category)!;

  function selectCategory(next: ExplorerCategoryId) {
    setFocusedCategory(next);
    setState((current) => current.category === next ? current : { ...current, category: next });
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowUp': next = (index + explorerCopy.length - 1) % explorerCopy.length; break;
      case 'ArrowDown': next = (index + 1) % explorerCopy.length; break;
      case 'Home': next = 0; break;
      case 'End': next = explorerCopy.length - 1; break;
      default: return;
    }
    event.preventDefault();
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section id="blind-zones" aria-labelledby="blind-zones-title" data-narrative-section data-section-surface
      className={styles.section} data-category-count={explorerCategories.length} data-category={category} data-meaning={meaning}>
      <div className={styles.texture} data-section-texture data-node-id={visual.texture} aria-hidden="true"
        style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
      <div className={styles.canvas} data-section-canvas data-node-id={visual.frame}>
        <div className={styles.categories} data-node-id={visual.panel} style={{ zIndex: visual.order.panel }}
          role="tablist" aria-label="Категории слепых зон" aria-orientation="vertical"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocusedCategory(category);
          }}>
          {explorerCopy.map((copy, index) => {
            const ids = visual.cards[index];
            if (!ids) return null;
            return (
              <div key={copy.category} data-node-id={ids.card} data-active={category === copy.category} className={styles.card}>
                <button type="button" role="tab" id={`explorer-tab-${copy.category}`} className={styles.categoryTab}
                  ref={(node) => { tabs.current[index] = node; }}
                  aria-labelledby={`explorer-label-${copy.category}`}
                  aria-selected={category === copy.category} aria-controls="explorer-panel"
                  tabIndex={focusedCategory === copy.category ? 0 : -1}
                  onFocus={() => setFocusedCategory(copy.category)}
                  onClick={() => selectCategory(copy.category)}
                  onKeyDown={(event) => navigateTabs(event, index)} />
                <div className={styles.cardContent} data-node-id={ids.content}>
                  <div className={styles.cardHeading} data-node-id={ids.heading}>
                    <p className={styles.number} data-node-id={ids.number}>{copy.number}</p>
                    <h3 id={`explorer-label-${copy.category}`} className={styles.label} data-node-id={ids.label} style={{ width: `var(--category-label-width, ${copy.labelWidth}px)` }}>{copy.label}</h3>
                  </div>
                  <p className={styles.description} data-node-id={ids.description}><span>{copy.description}</span></p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.sectionHeading}>
          <h2 id="blind-zones-title" tabIndex={-1} className={styles.title} data-node-id={visual.title}
            style={{ zIndex: visual.order.title }}>Слепые</h2>
          <p className={styles.banner} data-node-id={visual.banner} style={{ zIndex: visual.order.banner }}>
            <span data-node-id={visual.bannerText}>зоны восприятия</span>
          </p>
        </div>
        <div id="explorer-panel" role="tabpanel" aria-labelledby={`explorer-tab-${category}`} className={styles.panel}>
          <p className={styles.activeDescription}>{activeCopy.description}</p>
          <button type="button" className={styles.question} data-node-id={visual.question}
            style={{ zIndex: visual.order.question, width: `var(--question-width, ${visual.questionWidth}px)` }}>{visual.questionText}</button>
          <div className={styles.artworkStage}>
            <span className={styles.artworkDescription} role="img" aria-label={explorerArtworkDescriptions[category][meaning]} />
            {category === 'idiom' && <IdiomArtwork meaning={meaning} />}
            {category === 'pun' && <PunArtwork meaning={meaning} />}
            {category === 'doubleMeaning' && <DoubleMeaningArtwork meaning={meaning} />}
            {category === 'reference' && <CulturalReferenceArtwork meaning={meaning} />}
          </div>
        </div>
      </div>
    </section>
  );
}
