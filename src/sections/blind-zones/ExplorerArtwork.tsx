import type { CSSProperties } from 'react';
import { imageAssets, vectorAssets } from '../../assets/generated';
import type { MeaningState } from './model';
import { iceFragments, punLayers, punMatrices, snowflakes } from './explorerArtworkData';
import { responsiveArtStyle } from './explorerResponsiveData';
import styles from './BlindZonesExplorer.module.css';

// Outward offsets are relative to each existing slot, so responsive fitting
// and original crop/mask matrices remain the sole owners of its geometry.
const iceSpread = [[-4, -8], [0, 16], [4, -8], [14, -3], [6, 3], [-12, 3], [-4, 8], [2, 8]] as const;

export function IdiomArtwork({ meaning }: { meaning: MeaningState }) {
  return (
    <>
      {iceFragments.map((fragment, index) => {
        const [[sx, , tx], [, sy, ty]] = fragment.crop;
        // Preserve A/B paint order; independent translate composes the spread.
        const order = fragment.order[meaning] + (meaning === 'B' && index > 0 ? 1 : 0);
        return (
          <div key={fragment.ids.A} data-node-id={fragment.ids[meaning]} data-art-layer="ice" data-open={meaning === 'B'}
            className={styles.ice} aria-hidden="true" style={{
              ...responsiveArtStyle(`idiomA-${index}`,
                [fragment.x, fragment.y, fragment.width, fragment.height]),
              left: `var(--art-x, ${fragment.x}px)`, top: `var(--art-y, ${fragment.y}px)`,
              width: `var(--art-width, ${fragment.width}px)`, height: `var(--art-height, ${fragment.height}px)`,
              zIndex: order,
              '--ice-open-x': `${(iceSpread[index]?.[0] ?? 0)}%`,
              '--ice-open-y': `${(iceSpread[index]?.[1] ?? 0)}%`,
              maskImage: fragment.mask ? `url("${vectorAssets[fragment.mask]}")` : 'none',
            } as CSSProperties}>
            <img src={imageAssets[fragment.asset]} alt="" style={{
              width: `var(--ice-image-width, ${fragment.width / sx}px)`, height: `var(--ice-image-height, ${fragment.height / sy}px)`,
              left: `var(--ice-image-left, ${-tx * fragment.width / sx}px)`, top: `var(--ice-image-top, ${-ty * fragment.height / sy}px)`,
              ...{ '--crop-width': `${100 / sx}%`, '--crop-height': `${100 / sy}%`,
                '--crop-left': `${-tx * 100 / sx}%`, '--crop-top': `${-ty * 100 / sy}%` },
            }} />
          </div>
        );
      })}
      <div className={`${styles.bitmap} ${styles.telephone}`} data-open={meaning === 'B'} data-node-id="10:1598" data-art-layer="telephone" aria-hidden="true"
          style={responsiveArtStyle('idiomB-1', [227, 228, 635, 851])}>
          <img src={imageAssets['idiom-telephone-cutout']} alt="" />
      </div>
    </>
  );
}

export function PunArtwork({ meaning }: { meaning: MeaningState }) {
  const [[a, c, x], [b, d, y]] = punMatrices[meaning];
  // Express the full measured frame matrix around the approved local center.
  // The tiny residual translations retain export precision without changing the pivot.
  const tx = x - 50 - 367.5 + a * 367.5 + c * 492.5;
  const ty = y - 200 - 492.5 + b * 367.5 + d * 492.5;
  return (
    <div className={styles.bicycle} data-node-id={punLayers[0].ids[meaning]} data-art-layer="bicycle" aria-hidden="true"
      style={{
        ...responsiveArtStyle(`pun${meaning}-0`, [x, y, 735, 985]),
        ...{ '--desktop-x': '50px', '--desktop-y': '200px' },
        transform: `var(--bicycle-transform, matrix(${a},${b},${c},${d},${tx},${ty}))`,
      }}>
      <div className={styles.bicycleBase} data-node-id={punLayers[1].ids[meaning]}>
        <img src={imageAssets['pun-bicycle-cutout']} alt="" data-node-id={punLayers[2].ids[meaning]} />
      </div>
      <div className={styles.bicycleWheels} data-node-id={punLayers[3].ids[meaning]}>
        <img src={imageAssets['pun-wheels-cutout']} alt="" data-node-id={punLayers[4].ids[meaning]} />
      </div>
    </div>
  );
}

export function DoubleMeaningArtwork({ meaning }: { meaning: MeaningState }) {
  return (
    <div className={`${styles.bitmap} ${styles.eye}`} data-node-id={meaning === 'A' ? '10:1558' : '10:2047'}
      data-art-layer="eye" aria-hidden="true"
      style={responsiveArtStyle(`doubleMeaning${meaning}-0`, [115, 383, 845, 563])}>
      <img src={meaning === 'A' ? imageAssets['double-meaning-eye'] : imageAssets['double-meaning-eye-couple']} alt="" />
    </div>
  );
}

export function CulturalReferenceArtwork({ meaning }: { meaning: MeaningState }) {
  if (meaning === 'B') {
    return (
      <div className={`${styles.bitmap} ${styles.throne}`} data-node-id="10:2087" data-art-layer="throne" aria-hidden="true"
        style={responsiveArtStyle('referenceB-0', [301, 263, 610, 817])}>
        <img src={imageAssets['cultural-iron-throne-cutout']} alt="" />
      </div>
    );
  }
  return snowflakes.map((snowflake, index) => (
    <div key={snowflake.id} className={styles.bitmap} data-node-id={snowflake.id} data-art-layer="snowflake" aria-hidden="true"
      style={{
        ...responsiveArtStyle(`referenceA-${index}`, [snowflake.x, snowflake.y, snowflake.width, snowflake.height]),
        left: `var(--art-x, ${snowflake.x}px)`, top: `var(--art-y, ${snowflake.y}px)`,
        width: `var(--art-width, ${snowflake.width}px)`, height: `var(--art-height, ${snowflake.height}px)`,
        zIndex: snowflake.order,
      }}>
      <img src={imageAssets['cultural-snowflake-cutout']} alt="" />
    </div>
  ));
}
