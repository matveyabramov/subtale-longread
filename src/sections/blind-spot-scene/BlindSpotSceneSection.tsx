import type { CSSProperties } from 'react';
import { imageAssets } from '../../assets/generated';
import { copy } from './copy';
import styles from './BlindSpotSceneSection.module.css';

const pairs = [['10:999', '10:1004'], ['10:1005', '10:1007'], ['10:1008', '10:1010']] as const;
const lines = [
  { id: '10:1000', x: 356, y: 509, width: 284, narrow: [294, 406, 239] }, { id: '10:1001', x: 1281, y: 509, width: 146, narrow: [908, 406, 121] },
  { id: '10:1002', x: 1281, y: 626, width: 146, narrow: [908, 502, 121] }, { id: '10:1003', x: 1281, y: 743, width: 29, narrow: [908, 598, 21] },
  { id: '10:1006', x: 317, y: 626, width: 323, narrow: [260, 502, 273] }, { id: '10:1009', x: 297, y: 743, width: 343, narrow: [243, 598, 290] },
] as const;

export function BlindSpotSceneSection() {
  return (
    <section id="blind-spot-scene" aria-labelledby="blind-spot-scene-title" data-narrative-section className={styles.section}>
      <div className={styles.canvas} data-node-id="10:997">
        <div className={`${styles.texture} ${styles.grain}`} data-node-id="10:998" aria-hidden="true"
          style={{ '--responsive-mosaic': `url("${imageAssets['mosaic-texture']}")` } as CSSProperties}>
          <img src={imageAssets['au-fg-texture4-8k']} alt="" />
        </div>
        <div className={styles.sectionHeading}>
          <h2 id="blind-spot-scene-title" tabIndex={-1} className={styles.text} data-node-id="10:1013"><span>{copy['10:1013']}</span></h2>
          <div className={styles.banner} data-node-id="10:1014"><p className={styles.text} data-node-id="10:1015"><span>{copy['10:1015']}</span></p></div>
        </div>
        <p className={styles.text} data-node-id="10:1011"><span>{copy['10:1011']}</span></p>
        <div className={styles.pairs}>
          {pairs.map(([statement, reaction]) => <div key={statement} className={styles.pair}>
            <p className={styles.text} data-node-id={statement}><span>{copy[statement]}</span></p>
            <p className={styles.text} data-node-id={reaction}><span>{copy[reaction]}</span></p>
          </div>)}
        </div>
        {lines.map(line => <div key={line.id} className={styles.line} data-node-id={line.id} aria-hidden="true"
          style={{
            left: `var(--connector-x, ${line.x}px)`, top: `var(--connector-y, ${line.y}px)`, width: `var(--connector-width, ${line.width}px)`,
            ...Object.fromEntries(['x', 'y', 'width'].map((axis, i) => {
              const start = line.narrow[i]!;
              const end = axis === 'x' ? line.x : axis === 'y' ? line.y : line.width;
              const slope = (end - start) / 480;
              return [`--wide-${axis}`, `calc(${slope * 100}vw + ${start - slope * 1440}px)`];
            })),
          }} />)}
        <div className={styles.illustration} data-node-id="10:1012" aria-hidden="true">
          <img src={imageAssets['blind-spot-circle-cutout']} alt="" />
        </div>
      </div>
    </section>
  );
}
