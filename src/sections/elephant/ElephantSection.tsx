import { imageAssets } from '../../assets/generated';
import { elephantArtFrame, elephantImage, elephantPixels } from './elephantArtworkData';
import styles from './ElephantSection.module.css';

const levels = [
  { frame: '10:923', divider: '10:924', content: '10:925', heading: '10:926', copy: '10:927',
    title: 'Words', text: 'Elephant — слон. Room — комната. Отдельные слова знакомы', inset: 20, width: 572, titleWidth: 204 },
  { frame: '10:928', divider: '10:929', content: '10:930', heading: '10:931', copy: '10:932',
    title: 'Construction', text: 'Вместе они работают как идиома: очевидная проблема, которую избегают обсуждать', inset: 267, width: 617, titleWidth: 416 },
  { frame: '10:933', divider: '10:934', content: '10:935', heading: '10:936', copy: '10:937',
    title: 'Context', text: 'Какая именно проблема? Почему о ней молчат? Ответ находится в ситуации', inset: 504, width: 617, titleWidth: 240 },
  { frame: '10:938', divider: '10:939', content: '10:940', heading: '10:941', copy: '10:942',
    title: 'Cultural knowledge', text: 'А иногда нужен ещё один ключ — история, образ или отсылка за пределами самой фразы', inset: 740, width: 617, titleWidth: 617 },
] as const;

function ElephantArtwork() {
  const [[a, c, x], [b, d, y]] = elephantArtFrame.matrix;
  const [[ia, ic, ix], [ib, id, iy]] = elephantImage.matrix;
  return (
    <div className={styles.artworkSlot} aria-hidden="true">
      <div className={styles.artFrame} data-node-id="10:919"
        style={{
          width: `var(--frame-width, ${elephantArtFrame.width}px)`,
          height: `var(--frame-height, ${elephantArtFrame.height}px)`,
          transform: `var(--frame-transform, matrix(${a},${b},${c},${d},${x},${y}))`,
        }}>
        {/* A 10px inside stroke without CSS border's whole-pixel paint snapping. */}
        <svg className={styles.artBorder} width={elephantArtFrame.width} height={elephantArtFrame.height}
          viewBox={`0 0 ${elephantArtFrame.width} ${elephantArtFrame.height}`}>
          <rect x="5" y="5" width={elephantArtFrame.width - 10} height={elephantArtFrame.height - 10}
            fill="none" stroke="var(--color-yellow)" strokeWidth="10" />
        </svg>
        <img src={imageAssets['elephant-cutout']} alt="" className={styles.illustration} data-node-id="10:920"
          style={{
            width: `var(--image-width, ${elephantImage.width}px)`,
            height: `var(--image-height, ${elephantImage.height}px)`,
            transform: `var(--image-transform, matrix(${ia},${ib},${ic},${id},${ix},${iy}))`,
          }} />
      </div>
    </div>
  );
}

export function ElephantSection() {
  return (
    <section id="elephant" aria-labelledby="elephant-title" data-narrative-section data-section-surface className={styles.section}>
      <div className={styles.texture} data-section-texture data-node-id="10:918" aria-hidden="true"
        style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
      <div className={styles.canvas} data-section-canvas data-node-id="10:917">
        <ElephantArtwork />
        <div className={styles.heading}>
          <h2 id="elephant-title" tabIndex={-1} className={styles.title} data-node-id="10:944">Смысл</h2>
          <p className={styles.banner} data-node-id="10:945"><span data-node-id="10:946">не сумма слов</span></p>
        </div>
        <div className={styles.phraseBlock}>
          <p className={styles.introduction} data-node-id="10:947">Разберем одну фразу</p>
          <p className={styles.phrase} data-node-id="10:921"><span className={styles.phraseGlyphs}>the <span className={styles.phraseAccent}>elephant</span>{'\n'}in the room</span></p>
        </div>
        <div className={styles.levels} data-node-id="10:922">
          {levels.map((level) => (
            <div key={level.frame} className={styles.level} data-node-id={level.frame}>
              <div className={styles.divider} data-node-id={level.divider} aria-hidden="true" />
              <div className={styles.levelContent} data-node-id={level.content}
                style={{
                  paddingLeft: `var(--level-inset, ${level.inset}px)`,
                  width: `var(--level-width, ${level.inset + level.width}px)`,
                }}>
                <h3 data-node-id={level.heading} style={{ width: `var(--level-title-width, ${level.titleWidth}px)` }}>{level.title}</h3>
                <p data-node-id={level.copy} style={{ width: `var(--level-copy-width, ${level.width}px)` }}>{level.text}</p>
              </div>
            </div>
          ))}
          <div className={styles.divider} data-node-id="10:943" aria-hidden="true" />
        </div>
        {elephantPixels.map((pixel) => (
          <div key={pixel.id} className={styles.pixel} data-node-id={pixel.id} aria-hidden="true"
            style={{
              left: `var(--pixel-left, ${pixel.x}px)`,
              top: `var(--pixel-top, ${pixel.y}px)`,
              width: `var(--pixel-size, ${pixel.width}px)`,
              height: `var(--pixel-size, ${pixel.height}px)`,
            }} />
        ))}
      </div>
    </section>
  );
}
