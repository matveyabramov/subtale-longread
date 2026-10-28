import type { RefObject } from 'react';
import { imageAssets, vectorAssets } from '../../assets/generated';
import { HeroFilm, HeroPortrait, HeroStars } from './HeroArtwork';
import styles from './HeroSection.module.css';

export function HeroSection({ contentsOpen = false, contentsTrigger, onToggleContents }: {
  contentsOpen?: boolean;
  contentsTrigger?: RefObject<HTMLButtonElement | null>;
  onToggleContents?: () => void;
}) {
  return (
    <section id="hero" aria-labelledby="hero-title" data-narrative-section className={styles.hero}>
      <div className={styles.canvas} data-node-id="10:472">
        <div className={styles.introduction} data-node-id="10:1928">
          <p className={styles.introCopy} data-node-id="10:1929">{'Слова знакомы. Сюжет продолжается.\nНо весь ли смысл остаётся с тобой?'}</p>
          <a className={styles.primaryCta} href="#experiment-instructions" data-node-id="10:1930">
            <span data-node-id="10:1931">Начни с одного эксперимента</span>
            <span className={styles.primaryArrowBox} data-node-id="10:1932">
              <img src={vectorAssets['hero-cta-arrow']} alt="" data-node-id="10:1933" />
            </span>
          </a>
        </div>
        <div className={styles.texture} data-node-id="10:473" aria-hidden="true"
          style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
        <div className={styles.artwork} aria-hidden="true">
          <HeroFilm />
          <HeroStars />
          <HeroPortrait />
        </div>
        <div className={styles.brand} data-node-id="10:611">
          <img className={styles.brandMark} src={vectorAssets['subtale-pixel-mark']} alt="" data-node-id="10:612" />
          <div className={styles.brandName} data-node-id="10:675">
            <span className={styles.brandLatin} data-node-id="10:676">subtale</span>
            <span className={styles.brandCyrillic} data-node-id="10:677">cабтейл</span>
          </div>
        </div>
        <h1 id="hero-title" className={styles.headline} tabIndex={-1}>
          <span className={styles.headlineFirst} data-node-id="10:685">Ты смотришь сериалы без перевода</span>
          <span className={styles.headlineBanner} data-node-id="10:678">
            <span data-node-id="10:679">{'Сколько шуток из них\nТы правда понял?'}</span>
          </span>
        </h1>
        <button type="button" className={styles.contents} data-node-id="10:680"
          ref={contentsTrigger} aria-expanded={contentsOpen} aria-controls="contents-panel" onClick={onToggleContents}>
          <span data-node-id="10:681">Оглавление</span>
          <span className={styles.contentsIcon} data-node-id="10:682" aria-hidden="true"><i /><i /></span>
        </button>
        <aside hidden className={styles.hint} data-node-id="10:688" aria-labelledby="hero-hint-title">
          <div className={styles.hintInterior} data-node-id="10:689">
            <div className={styles.hintCopy} data-node-id="10:690">
              <h2 id="hero-hint-title" data-node-id="10:691"><span>Сначала — небольшой эксперимент</span></h2>
              <p data-node-id="10:692">Нажми “Начни с одного эксперимента, чтобы продолжить историю</p>
            </div>
            <div className={styles.hintActions} data-node-id="10:693">
              <a className={styles.hintStart} href="#experiment-instructions" data-node-id="10:694">
                <span data-node-id="10:695">Начать</span>
                <span className={styles.hintArrowBox} data-node-id="10:696">
                  <img src={vectorAssets['hero-cta-arrow']} alt="" data-node-id="10:697" />
                </span>
              </a>
              <a className={styles.hintSkip} href="#emptiness" data-node-id="10:698">Пропустить</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
