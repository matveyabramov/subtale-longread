import { movieCases } from './model';
import { imageAssets } from '../../assets/generated';
import { MovieCase } from './MovieCase';
import styles from './MoviesSection.module.css';

export function MoviesSection() {
  return (
    <section id="movies" aria-labelledby="movies-title" data-narrative-section
      data-case-count={movieCases.length} className={styles.section}>
      <div className={styles.canvas} data-node-id="10:1794">
        <div className={styles.texture} data-node-id="10:1795" aria-hidden="true"
          style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
        <FilmPerforation edge="top" />
        <FilmPerforation edge="bottom" />
        <div className={styles.sectionHeading}>
          <h2 id="movies-title" tabIndex={-1} className={styles.title} data-node-id="10:1918">Ты слышишь фразу.</h2>
          <p className={styles.banner} data-node-id="10:1919"><span data-node-id="10:1920">Что остаётся за ней?</span></p>
        </div>
        <div className={styles.cases} data-node-id="10:1840">
          {movieCases.map((media) => <MovieCase key={media.id} media={media} />)}
          <div className={styles.divider} data-node-id="10:1917" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function FilmPerforation({ edge }: { edge: 'top' | 'bottom' }) {
  const top = edge === 'top';
  return (
    <div className={styles.perforation} data-edge={edge} data-node-id={top ? '10:1796' : '10:1818'} aria-hidden="true">
      {Array.from({ length: 21 }, (_, index) => <span key={index} data-node-id={`10:${(top ? 1797 : 1819) + index}`} />)}
    </div>
  );
}
