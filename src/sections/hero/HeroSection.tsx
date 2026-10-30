import { createPortal } from 'react-dom';
import { useRef } from 'react';
import { useEditorialEntrance } from '../../shared/useEditorialEntrance';
import { useHeroIntroduction } from './useHeroIntroduction';
import introStyles from './HeroIntroduction.module.css';
import { imageAssets, vectorAssets } from '../../assets/generated';
import { HeroFilm, HeroPortrait, HeroStars } from './HeroArtwork';
import styles from './HeroSection.module.css';

export function HeroSection({ contentsOpen = false, hidden = false }: { contentsOpen?: boolean; hidden?: boolean }) {
  const intro = useHeroIntroduction(contentsOpen);
  const sectionRef = useRef<HTMLElement>(null);
  useEditorialEntrance(sectionRef);
  return (
    <section ref={sectionRef} id="hero" aria-labelledby="hero-title" data-narrative-section data-editorial-reveal="load" className={styles.hero} hidden={hidden} inert={hidden}>
      <div className={styles.canvas} data-node-id="10:472">
        <div className={styles.introduction} data-node-id="10:1928">
          <p className={styles.introCopy} data-node-id="10:1929">{'Слова знакомы. Сюжет продолжается.\nНо весь ли смысл остаётся с тобой?'}</p>
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
      </div>
      {createPortal(
        <dialog ref={intro.dialogRef} className={introStyles.dialog} aria-labelledby="hero-hint-title"
          aria-describedby="hero-hint-description" data-intro-state={intro.state}
          onCancel={(event) => { event.preventDefault(); intro.finish(true); }}
          onClose={intro.onClose}>
          <div className={introStyles.interior}>
            <div className={introStyles.copy}>
              <h2 id="hero-hint-title"><span>Сначала — небольшой эксперимент</span></h2>
              <p id="hero-hint-description">Нажми “Начни с одного эксперимента, чтобы продолжить историю</p>
            </div>
            <div className={introStyles.actions}>
              <a className={introStyles.start} href="#experiment-instructions"
                onClick={(event) => intro.navigate(event, 'experiment-instructions')}>
                <span>Начать</span>
                <span className={introStyles.arrow}>
                  <picture>
                    <source media="(width <= 600px)" srcSet={vectorAssets['hero-intro-arrow-12']} />
                    <source media="(width < 1920px)" srcSet={vectorAssets['hero-intro-arrow-16']} />
                    <img src={vectorAssets['hero-cta-arrow']} alt="" />
                  </picture>
                </span>
              </a>
              <a className={introStyles.skip} href="#emptiness" onClick={(event) => intro.navigate(event, 'emptiness')}>Пропустить</a>
            </div>
          </div>
        </dialog>, document.body,
      )}
    </section>
  );
}
