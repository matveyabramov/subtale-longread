import { imageAssets } from '../../assets/generated';
import { copy } from './copy';
import { panels } from './panelData';
import styles from './WhatToDoSection.module.css';

type Panel = (typeof panels)[number];

export function WhatToDoSection() {
  return (
    <section id="what-to-do" aria-labelledby="what-to-do-title" data-narrative-section className={styles.section}>
      <div className={styles.canvas} data-node-id="10:1272">
        <div className={`${styles.texture} ${styles.grain}`} data-node-id="10:1273" aria-hidden="true"><img src={imageAssets['au-fg-texture4-8k']} alt="" /></div>
        <div className={styles.sectionHeading}>
          <h2 id="what-to-do-title" tabIndex={-1} className={styles.text} data-node-id="10:1276"><span>{copy['10:1276']}</span></h2>
          <div className={styles.banner} data-node-id="10:1274"><p className={styles.text} data-node-id="10:1275"><span>{copy['10:1275']}</span></p></div>
        </div>
        <p className={styles.text} data-node-id="10:1277"><span>{copy['10:1277']}</span></p>
        {panels.map(panel => <AdvicePanel key={panel.id} panel={panel} />)}
      </div>
    </section>
  );
}

function AdvicePanel({ panel }: { panel: Panel }) {
  const after = panel.id === '10:1326';
  return (
    <div className={styles.panel} data-after={after} data-node-id={panel.id} style={{ left: panel.x, top: panel.y }}>
      {panel.columns.map(column => <div key={column.id} className={styles.column} data-node-id={column.id}
        style={{ left: column.x, top: column.y, width: column.width, height: column.height }} aria-hidden="true">
        {column.pixels.map(pixel => <span key={pixel.id} data-node-id={pixel.id} className={styles.pixel} style={{ top: pixel.y }} />)}
      </div>)}
      <h3 className={styles.text} data-node-id={panel.title}><span>{copy[panel.title]}</span></h3>
      <ol className={styles.steps} data-node-id={panel.steps.id} style={{ left: panel.steps.x, top: panel.steps.y, height: panel.steps.height }}>
        {panel.steps.rows.map((row, index) => {
          const line = panel.steps.lines[index];
          return <li key={row.id} className={styles.step}>
            {line && <div className={styles.line} data-node-id={line.id} style={{ top: line.y }} aria-hidden="true" />}
            <div className={styles.row} data-node-id={row.id} style={{ top: row.y, width: row.width, height: row.height }}>
              {row.markerFrame ? <div className={styles.marker} data-node-id={row.markerFrame.id} style={{ width: row.markerFrame.width, height: row.markerFrame.height }}>
                <p className={styles.text} data-node-id={row.number}><span>{copy[row.number]}</span></p>
              </div> : <p className={styles.text} data-node-id={row.number}><span>{copy[row.number]}</span></p>}
              <p className={styles.text} data-node-id={row.text}><span>{copy[row.text]}</span></p>
            </div>
            {index === 2 && <div className={styles.line} data-node-id={panel.steps.lines[3].id} style={{ top: panel.steps.lines[3].y }} aria-hidden="true" />}
          </li>;
        })}
      </ol>
    </div>
  );
}
