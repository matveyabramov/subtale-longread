import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { imageAssets } from '../../assets/generated';
import { explorerArtworkDescriptions, explorerCategories } from './model';
import type { ExplorerCategoryId, ExplorerState, MeaningState } from './model';
import { explorerCopy, explorerVisuals } from './explorerVisualData';
import { CulturalReferenceArtwork, DoubleMeaningArtwork, IdiomArtwork, PunArtwork } from './ExplorerArtwork';
import { explorerRevealStyle } from './explorerRevealBounds';
import { useExplorerViewportFit } from './useExplorerViewportFit';
import { useEditorialEntrance } from '../../shared/useEditorialEntrance';
import { ExplorerExplanationDialog } from './ExplorerExplanationDialog';
import styles from './BlindZonesExplorer.module.css';

interface BlindZonesExplorerProps {
  category?: ExplorerCategoryId;
  meaning?: MeaningState;
}

function useCompactViewport() {
  const [compact, setCompact] = useState(() => window.innerHeight <= 740);
  useEffect(() => {
    let width = window.innerWidth;
    const resize = () => {
      // Browser chrome changes height during a swipe. Keep the initial layout
      // variant until a real width/orientation change, including on short phones.
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      setCompact(window.innerHeight <= 740);
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return compact;
}

// Optional initial endpoints keep the isolated A/B visual QA fixtures available.
export function BlindZonesExplorer({ category: initialCategory = 'idiom', meaning: initialMeaning = 'A' }: BlindZonesExplorerProps) {
  const compactViewport = useCompactViewport();
  const sectionRef = useRef<HTMLElement>(null);
  useEditorialEntrance(sectionRef);
  const [state, setState] = useState<ExplorerState>(() => ({
    category: initialCategory,
    stateByCategory: { idiom: 'A', pun: 'A', doubleMeaning: 'A', reference: 'A', [initialCategory]: initialMeaning },
  }));
  const [focusedCategory, setFocusedCategory] = useState(initialCategory);
  const [mousePreview, setMousePreview] = useState<{ category: ExplorerCategoryId; meaning: MeaningState } | null>(null);
  const revealPointer = useRef<string | null>(null);
  const [explanationCategory, setExplanationCategory] = useState<ExplorerCategoryId | null>(null);
  const explanationOpen = useRef(false);
  const hoverBlocked = useRef(false);
  const pointerInArtwork = useRef(false);
  const questionTrigger = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const artworkStage = useExplorerViewportFit(state.category);
  const { category, stateByCategory } = state;
  const meaning = mousePreview?.category === category ? mousePreview.meaning : stateByCategory[category];
  const visual = explorerVisuals[category][meaning];
  const activeCopy = explorerCopy.find((copy) => copy.category === category)!;

  useEffect(() => {
    const clearPreview = () => setMousePreview(null);
    const hover = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const visibility = () => { if (document.hidden) clearPreview(); };
    const resumeHover = (event: PointerEvent) => {
      // Modal removal can synthesize hover events over the underlying artwork.
      // Resume only after deliberate movement, preserving the open/close state.
      if (!hoverBlocked.current || explanationOpen.current || event.pointerType !== 'mouse' ||
        (!event.movementX && !event.movementY)) return;
      hoverBlocked.current = false;
      if (!hover.matches) return;
      const target = event.target instanceof Element ? event.target.closest('[data-explorer-reveal]') : null;
      const wasInside = pointerInArtwork.current;
      pointerInArtwork.current = target !== null;
      if (target || wasInside) setMousePreview({ category, meaning: target ? 'B' : 'A' });
    };
    hover.addEventListener('change', clearPreview);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', clearPreview);
    document.addEventListener('pointermove', resumeHover, true);
    return () => {
      hover.removeEventListener('change', clearPreview);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', clearPreview);
      document.removeEventListener('pointermove', resumeHover, true);
    };
  }, [category]);

  const closeExplanation = useCallback(() => {
    explanationOpen.current = false;
    setExplanationCategory(null);
  }, []);

  function toggleMeaning() {
    const next = meaning === 'A' ? 'B' : 'A';
    setMousePreview(null);
    setState((current) => ({ ...current, stateByCategory: { ...current.stateByCategory, [category]: next } }));
  }

  function selectCategory(next: ExplorerCategoryId) {
    if (next !== category) { pointerInArtwork.current = false; setMousePreview(null); }
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
    <section ref={sectionRef} id="blind-zones" aria-labelledby="blind-zones-title" data-narrative-section data-section-surface
      className={styles.section} data-compact-viewport={compactViewport}
      data-category-count={explorerCategories.length} data-category={category} data-meaning={meaning}>
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
              <div key={copy.category} data-node-id={ids.card} data-active={category === copy.category} className={styles.card} data-editorial-reveal="card">
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
            data-editorial-reveal="scroll" style={{ zIndex: visual.order.title }}>Слепые</h2>
          <p className={styles.banner} data-node-id={visual.banner} style={{ zIndex: visual.order.banner }}>
            <span data-node-id={visual.bannerText}>зоны восприятия</span>
          </p>
        </div>
        <div id="explorer-panel" role="tabpanel" aria-labelledby={`explorer-tab-${category}`} className={styles.panel}>
          <p className={styles.activeDescription}>{activeCopy.description}</p>
          <button ref={questionTrigger} type="button" className={styles.question} data-node-id={visual.question}
            aria-haspopup="dialog" aria-controls="explorer-explanation" aria-expanded={explanationCategory !== null}
            onClick={() => {
              explanationOpen.current = true;
              hoverBlocked.current = true;
              setExplanationCategory(category);
            }}
            style={{ zIndex: visual.order.question, width: `var(--question-width, ${visual.questionWidth}px)` }}>{visual.questionText}</button>
          <div ref={artworkStage} className={styles.artworkStage}>
            <span id="explorer-artwork-description" className={styles.artworkDescription} role="img" aria-label={explorerArtworkDescriptions[category][meaning]} />
            <button type="button" className={styles.artworkReveal} data-explorer-reveal
              style={explorerRevealStyle(category)}
              aria-label={`Изменить прочтение иллюстрации: ${activeCopy.label}`}
              aria-describedby="explorer-reveal-instructions explorer-artwork-description"
              aria-pressed={meaning === 'B'}
              onPointerEnter={(event) => {
                if (hoverBlocked.current) return;
                if (event.pointerType === 'mouse' && window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches) {
                  pointerInArtwork.current = true;
                  setMousePreview({ category, meaning: 'B' });
                }
              }}
              onPointerLeave={(event) => {
                if (hoverBlocked.current) return;
                if (event.pointerType === 'mouse') { pointerInArtwork.current = false; setMousePreview({ category, meaning: 'A' }); }
              }}
              onPointerDown={(event) => {
                if (event.pointerType !== 'mouse') hoverBlocked.current = false;
                revealPointer.current = event.pointerType;
                if (event.pointerType !== 'mouse') setMousePreview(null);
              }}
              onPointerCancel={() => { revealPointer.current = null; setMousePreview(null); }}
              onClick={(event) => {
                if (event.detail === 0 || revealPointer.current === 'touch' || revealPointer.current === 'pen') toggleMeaning();
                revealPointer.current = null;
              }} />
            <span id="explorer-reveal-instructions" className={styles.artworkDescription}>
              Нажмите Enter, пробел или коснитесь иллюстрации, чтобы изменить её прочтение.
            </span>
            {category === 'idiom' && <IdiomArtwork meaning={meaning} />}
            {category === 'pun' && <PunArtwork meaning={meaning} />}
            {category === 'doubleMeaning' && <DoubleMeaningArtwork meaning={meaning} />}
            {category === 'reference' && <CulturalReferenceArtwork meaning={meaning} />}
          </div>
        </div>
      </div>
      {explanationCategory && <ExplorerExplanationDialog category={explanationCategory}
        trigger={questionTrigger.current} onClose={closeExplanation} />}
    </section>
  );
}
