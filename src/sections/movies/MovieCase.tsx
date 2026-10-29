import { vectorAssets } from '../../assets/generated';
import { movieVisuals } from './moviesVisualData';
import type { MovieMedia } from './model';
import styles from './MoviesSection.module.css';

// The transparent button covers the original row without moving its Figma slots.
export function MovieCase({ media, onOpen, active, onFocus, onBlur }: {
  media: MovieMedia;
  onOpen: (media: MovieMedia, trigger: HTMLButtonElement) => void;
  active: boolean;
  onFocus: (media: MovieMedia) => void;
  onBlur: () => void;
}) {
  const visual = movieVisuals[media.id];
  const quote = <p className={styles.quote} data-node-id={visual.quote.id}
    style={{ width: `var(--quote-width, ${visual.quote.w}px)`, height: `var(--quote-height, ${visual.quote.h}px)` }}>
    {media.id === 'austinPowers' ? <>
      <span className={styles.standardQuote}>{visual.quote.text}</span>
      <span className={styles.mobileQuote}>{visual.quote.text.replace('Number Two\nwork for?', 'Number\nTwo work for?')}</span>
    </> : visual.quote.text}
  </p>;
  return (
    <article id={`movie-${media.id}`} data-movie-case={media.id} aria-labelledby={`movie-${media.id}-title`}
      data-preview-active={active}
      onFocus={(event) => { if (event.target.matches(':focus-visible')) onFocus(media); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) onBlur(); }}
      className={styles.scene} data-node-id={visual.id} style={{ height: `var(--scene-height, ${visual.h}px)` }}>
      <button type="button" className={styles.openCase} aria-label={`Разобрать сцену: ${visual.film.text.replaceAll('\n', ' ')}`}
        aria-haspopup="dialog" aria-controls="movie-analysis" onClick={(event) => onOpen(media, event.currentTarget)} />
      <div className={styles.divider} data-node-id={visual.divider} aria-hidden="true" />
      <div className={styles.sceneBody} data-node-id={visual.body}>
        <div className={styles.sceneContent} data-node-id={visual.content} style={{ width: `var(--scene-content-width, ${visual.contentWidth}px)` }}>
          <div className={styles.metadata} data-node-id={visual.meta} style={{ height: `var(--meta-height, ${visual.metaHeight}px)` }}>
            <div className={styles.tags} data-node-id={visual.tagsId}>
              {visual.tags.map((tag, index) => (
                <div className={styles.tag} data-number={index === 0} key={tag.id} data-node-id={tag.id} style={{ width: `var(--tag-width, ${tag.w}px)` }}>
                  <span data-node-id={tag.text.id} style={{ width: `var(--tag-copy-width, ${tag.text.w}px)` }}><span>{tag.text.text}</span></span>
                </div>
              ))}
            </div>
            <h3 id={`movie-${media.id}-title`} className={styles.film} data-node-id={visual.film.id}
              style={{ width: `var(--film-width, ${visual.film.w}px)`, height: `var(--film-height, ${visual.film.h}px)` }}><span>{visual.film.text}</span></h3>
          </div>
          {visual.quoteGroup && visual.reply ? (
            <div className={styles.quoteGroup} data-node-id={visual.quoteGroup}>
              {quote}
              <p className={styles.reply} data-node-id={visual.reply.id}
                style={{ width: `var(--reply-width, ${visual.reply.w}px)`, height: `var(--reply-height, ${visual.reply.h}px)` }}><span>{visual.reply.text}</span></p>
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
