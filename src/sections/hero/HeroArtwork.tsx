import { imageAssets, vectorAssets } from '../../assets/generated';
import { heroStars, portraitFragments } from './heroArtworkData';
import styles from './HeroSection.module.css';

function PortraitFragment({ index }: { index: number }) {
  const fragment = portraitFragments[index];
  if (!fragment) return null;
  const [[sx, , tx], [, sy, ty]] = fragment.crop;
  const clipId = `hero-portrait-${index}`;
  return (
    <svg width={fragment.width} height={fragment.height} aria-hidden="true"
      data-node-id={fragment.id} className={styles.portraitFragment}
      style={{ width: fragment.width, height: fragment.height }}>
      <defs>
        <clipPath id={clipId}>
          {fragment.rectangles.map(([x, y, width, height], i) => (
            <rect key={i} x={x} y={y} width={width} height={height} />
          ))}
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width={fragment.width} height={fragment.height} fill="#fed128" />
        <image href={imageAssets['hero-person-collage']} preserveAspectRatio="none"
          x={-tx * fragment.width / sx} y={-ty * fragment.height / sy}
          width={fragment.width / sx} height={fragment.height / sy} />
      </g>
    </svg>
  );
}

export function HeroStars() {
  return heroStars.map((star) => (
    <img key={star.id} data-node-id={star.id} src={vectorAssets[star.asset]} alt=""
      className={styles.star} style={{ left: star.left, top: star.top }} />
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

export function HeroPortrait() {
  return (
    <div className={styles.portrait} data-node-id="10:484" aria-hidden="true">
      <div className={styles.middleBand} data-node-id="10:485"><PortraitFragment index={0} /></div>
      <div className={styles.lowerBand}><PortraitFragment index={1} /></div>
      <div className={styles.clippedBand}><PortraitFragment index={2} /></div>
      <div className={styles.upperBand} data-node-id="10:570">
        <PortraitFragment index={3} />
        <div className={styles.eyeCrop} data-node-id="10:610">
          <img src={imageAssets['hero-man-eye']} alt="" />
        </div>
      </div>
    </div>
  );
}
