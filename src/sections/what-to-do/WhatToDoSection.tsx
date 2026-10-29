import { useRef, type CSSProperties } from 'react';
import { useEditorialEntrance } from '../../shared/useEditorialEntrance';
import { imageAssets } from '../../assets/generated';
import { copy } from './copy';
import { panels } from './panelData';
import styles from './WhatToDoSection.module.css';

type Panel = (typeof panels)[number];

export function WhatToDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEditorialEntrance(sectionRef);
  return (
    <section ref={sectionRef} id="what-to-do" aria-labelledby="what-to-do-title" data-narrative-section data-section-surface className={styles.section}>
      <div className={`${styles.texture} ${styles.grain}`} data-section-texture data-node-id="10:1273" aria-hidden="true"
        style={{ '--responsive-mosaic': `url("${imageAssets['mosaic-texture']}")` } as CSSProperties}><img src={imageAssets['au-fg-texture4-8k']} alt="" /></div>
      <div className={styles.canvas} data-section-canvas data-node-id="10:1272">
        <div className={styles.sectionHeading}>
          <h2 id="what-to-do-title" tabIndex={-1} className={styles.text} data-node-id="10:1276"><span>{copy['10:1276']}</span></h2>
          <div className={styles.banner} data-node-id="10:1274"><p className={styles.text} data-node-id="10:1275"><span>{copy['10:1275']}</span></p></div>
        </div>
        <p className={styles.text} data-node-id="10:1277"><span>{copy['10:1277']}</span></p>
        <div className={styles.panels}>{panels.map(panel => <AdvicePanel key={panel.id} panel={panel} />)}</div>
      </div>
    </section>
  );
}

function AdvicePanel({ panel }: { panel: Panel }) {
  const after = panel.id === '10:1326';
  return (
    <div className={styles.panel} data-after={after} data-node-id={panel.id} data-editorial-reveal="scroll" style={{ left: `var(--panel-left, ${panel.x}px)`, top: `var(--panel-top, ${panel.y}px)` }}>
      {panel.columns.map(column => <div key={column.id} className={styles.column} data-node-id={column.id}
        style={{ left: `var(--column-left, ${column.x}px)`, top: `var(--column-top, ${column.y}px)`, width: `var(--pixel-size, ${column.width}px)`, height: `var(--column-height, ${column.height}px)` }} aria-hidden="true">
        {column.pixels.map(pixel => <span key={pixel.id} data-node-id={pixel.id} className={styles.pixel} style={{ top: `var(--pixel-top, ${pixel.y}px)` }} />)}
      </div>)}
      <h3 className={styles.text} data-node-id={panel.title}><span>{copy[panel.title]}</span></h3>
      <ol className={styles.steps} data-node-id={panel.steps.id} style={{ left: `var(--steps-left, ${panel.steps.x}px)`, top: `var(--steps-top, ${panel.steps.y}px)`, height: `var(--steps-height, ${panel.steps.height}px)` }}>
        {panel.steps.rows.map((row, index) => {
          const line = panel.steps.lines[index];
          return <li key={row.id} className={styles.step}>
            {line && <div className={styles.line} data-node-id={line.id} style={{ top: `var(--line-top, ${line.y}px)` }} aria-hidden="true" />}
            <div className={styles.row} data-node-id={row.id} style={{ top: `var(--row-top, ${row.y}px)`, width: `var(--row-width, ${row.width}px)`, height: `var(--row-height, ${row.height}px)` }}>
              {row.markerFrame ? <div className={styles.marker} data-node-id={row.markerFrame.id} style={{ width: `var(--marker-width, ${row.markerFrame.width}px)`, height: `var(--marker-height, ${row.markerFrame.height}px)` }}>
                <p className={styles.text} data-node-id={row.number}><span>{copy[row.number]}</span></p>
              </div> : <p className={styles.text} data-node-id={row.number}><span>{copy[row.number]}</span></p>}
              <p className={styles.text} data-node-id={row.text}><span>{copy[row.text]}</span></p>
            </div>
            {index === 2 && <div className={styles.line} data-node-id={panel.steps.lines[3].id} style={{ top: `var(--line-top, ${panel.steps.lines[3].y}px)` }} aria-hidden="true" />}
          </li>;
        })}
      </ol>
    </div>
  );
}
