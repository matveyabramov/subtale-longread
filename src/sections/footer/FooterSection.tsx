import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { imageAssets, vectorAssets } from '../../assets/generated';
import { FooterCollage, FooterImage } from './FooterCollage';
import { copy } from './copy';
import styles from './FooterSection.module.css';

const credits = [
  { group: '10:1153', label: '10:2161', name: '10:1155', x: 0, width: 233 },
  { group: '10:1156', label: '10:2163', name: '10:1158', x: 333, width: 224 },
  { group: '10:1159', label: '10:2165', name: '10:1161', x: 657, width: 133 },
] as const;

// Keep the original collage coordinates; WebKit miscomputes tan(atan2())
// when its length arguments contain responsive calc()/clamp() expressions.
function useArtworkScale(sourceWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const slot = ref.current;
    if (!slot) return;
    const update = (width: number) => {
      if (width > 0) slot.style.setProperty('--footer-artwork-scale', String(width / sourceWidth));
      else slot.style.removeProperty('--footer-artwork-scale');
    };
    update(slot.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => {
      if (entry) update(entry.contentRect.width);
    });
    observer.observe(slot);
    return () => observer.disconnect();
  }, [sourceWidth]);
  return ref;
}

export function FooterSection() {
  const collageSlot = useArtworkScale(771);
  const brandSlot = useArtworkScale(160);
  const schoolSlot = useArtworkScale(201);
  return (
    <footer id="footer" aria-labelledby="footer-title" data-narrative-section className={styles.section}>
      <div className={styles.canvas} data-node-id="10:1016">
        <div className={`${styles.texture} ${styles.grain}`} data-node-id="10:1017" aria-hidden="true"
          style={{ '--responsive-mosaic': `url("${imageAssets['mosaic-texture']}")` } as CSSProperties}><img src={imageAssets['au-fg-texture4-8k']} alt="" /></div>
        <div className={styles.ending}>
          <h2 id="footer-title" tabIndex={-1} className={styles.text} data-node-id="10:1018"><span>{copy['10:1018']}</span></h2>
          <div ref={collageSlot} className={styles.collageSlot} aria-hidden="true">
            <div className={styles.collageBoard}>
              <FooterCollage />
              <FooterImage id="10:1146" />
            </div>
          </div>
          <div className={styles.banner} data-node-id="10:1147"><p className={styles.text} data-node-id="10:1148"><span>{copy['10:1148']}</span></p></div>
        </div>
        <div className={styles.information} data-node-id="10:1149">
          <div ref={brandSlot} className={styles.brandSlot}>
          <div className={styles.brand} data-node-id="10:2092">
            <div className={styles.brandMark} data-node-id="10:2093"><img src={vectorAssets['footer-pixel-mark']} alt="" /></div>
            <div className={styles.brandName} data-node-id="10:2156">
              <p className={styles.text} data-node-id="10:2157"><span>{copy['10:2157']}</span></p>
              <p className={styles.text} data-node-id="10:2158"><span>{copy['10:2158']}</span></p>
            </div>
          </div>
          </div>
          <div className={styles.credits} data-node-id="10:1152">
            {credits.map(credit => <div key={credit.group} className={styles.credit} data-node-id={credit.group} style={{ left: `var(--credit-left, ${credit.x}px)`, width: `var(--credit-width, ${credit.width}px)` }}>
              <p className={styles.text} data-node-id={credit.label}><span>{copy[credit.label]}</span></p>
              <p className={styles.text} data-node-id={credit.name}><span>{copy[credit.name]}</span></p>
            </div>)}
          </div>
          <div ref={schoolSlot} className={styles.schoolLogo}><FooterImage id="10:1162" /></div>
        </div>
      </div>
    </footer>
  );
}
