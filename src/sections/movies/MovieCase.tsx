import { vectorAssets } from '../../assets/generated';
import { movieVisuals } from './moviesVisualData';
import type { movieCases } from './model';
import styles from './MoviesSection.module.css';

type MovieMedia = (typeof movieCases)[number];

// A scene owns its text and stable media identity. Stage 3 can add a media layer
// after its slot is approved; the static Figma row reserves no player rectangle.
export function MovieCase({ media }: { media: MovieMedia }) {
  const visual = movieVisuals[media.id];
  const quote = <p className={styles.quote} data-node-id={visual.quote.id}
    style={{ width: visual.quote.w, height: visual.quote.h }}>{visual.quote.text}</p>;
  return (
    <article id={`movie-${media.id}`} data-movie-case={media.id} aria-labelledby={`movie-${media.id}-title`}
      className={styles.scene} data-node-id={visual.id} style={{ height: visual.h }}>
      <div className={styles.divider} data-node-id={visual.divider} aria-hidden="true" />
      <div className={styles.sceneBody} data-node-id={visual.body}>
        <div className={styles.sceneContent} data-node-id={visual.content} style={{ width: visual.contentWidth }}>
          <div className={styles.metadata} data-node-id={visual.meta} style={{ height: visual.metaHeight }}>
            <div className={styles.tags} data-node-id={visual.tagsId}>
              {visual.tags.map((tag, index) => (
                <div className={styles.tag} data-number={index === 0} key={tag.id} data-node-id={tag.id} style={{ width: tag.w }}>
                  <span data-node-id={tag.text.id} style={{ width: tag.text.w }}><span>{tag.text.text}</span></span>
                </div>
              ))}
            </div>
            <h3 id={`movie-${media.id}-title`} className={styles.film} data-node-id={visual.film.id}
              style={{ width: visual.film.w, height: visual.film.h }}><span>{visual.film.text}</span></h3>
          </div>
          {visual.quoteGroup && visual.reply ? (
            <div className={styles.quoteGroup} data-node-id={visual.quoteGroup}>
              {quote}
              <p className={styles.reply} data-node-id={visual.reply.id}
                style={{ width: visual.reply.w, height: visual.reply.h }}><span>{visual.reply.text}</span></p>
            </div>
          ) : quote}
        </div>
        <div className={styles.arrowFrame} data-node-id={visual.arrow} aria-hidden="true">
          <div className={styles.arrowVector} data-node-id={visual.arrowVector}>
            <img src={vectorAssets['hero-cta-arrow']} alt="" />
          </div>
        </div>
      </div>
    </article>
  );
}
