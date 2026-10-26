import type { CSSProperties } from 'react';
import { imageAssets, vectorAssets } from '../../assets/generated';
import { heroStars } from './heroArtworkData';
import styles from './HeroSection.module.css';

export function HeroStars() {
  return heroStars.map((star) => (
    <img key={star.id} data-node-id={star.id} src={vectorAssets[star.asset]} alt=""
      className={styles.star} style={{ '--star-left': `${star.left}px`, '--star-top': `${star.top}px` } as CSSProperties} />
  ));
}

export function HeroFilm() {
  return (
    <div className={styles.film} data-node-id="10:475" aria-hidden="true">
      <div className={styles.filmBacking} data-node-id="10:476" />
      <img className={styles.filmImage} data-node-id="10:477"
        src={imageAssets['hero-film-cutout']} alt="" />
    </div>
  );
}

// Each source is an isolated Figma PNG of the whole portrait, including its
// eye accent: 10:484 + 10:686, 69:2013, 73:7226 and 79:12335 respectively.
// No browser-side tile masks or fractional fragment boundaries remain.
const portraitUrl = (width: number) => `${import.meta.env.BASE_URL}assets/images/hero/portrait-${width}.png`;

export function HeroPortrait() {
  return (
    <picture className={styles.portrait} data-node-id="10:484" aria-hidden="true">
      <source media="(min-width: 1920px)" srcSet={portraitUrl(1920)} />
      <source media="(min-width: 1101px)" srcSet={portraitUrl(1440)} />
      <source media="(min-width: 601px)" srcSet={portraitUrl(768)} />
      <img className={styles.portraitImage} src={portraitUrl(390)} width={390} height={352} alt="" />
    </picture>
  );
}
