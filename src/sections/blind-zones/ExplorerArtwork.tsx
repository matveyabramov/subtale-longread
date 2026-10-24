import { imageAssets, vectorAssets } from '../../assets/generated';
import type { MeaningState } from './model';
import { iceFragments, punLayers, punMatrices, snowflakes } from './explorerArtworkData';
import styles from './BlindZonesExplorer.module.css';

export function IdiomArtwork({ meaning }: { meaning: MeaningState }) {
  return (
    <>
      {iceFragments.map((fragment) => {
        const [[sx, , tx], [, sy, ty]] = fragment.crop;
        return (
          <div key={fragment.ids.A} data-node-id={fragment.ids[meaning]} data-art-layer="ice"
            className={styles.ice} aria-hidden="true" style={{
              left: fragment.x, top: fragment.y, width: fragment.width, height: fragment.height,
              zIndex: fragment.order[meaning],
              maskImage: fragment.mask ? `url("${vectorAssets[fragment.mask]}")` : 'none',
            }}>
            <img src={imageAssets[fragment.asset]} alt="" style={{
              width: fragment.width / sx, height: fragment.height / sy,
              left: -tx * fragment.width / sx, top: -ty * fragment.height / sy,
            }} />
          </div>
        );
      })}
      {meaning === 'B' && (
        <div className={`${styles.bitmap} ${styles.telephone}`} data-node-id="10:1598" data-art-layer="telephone" aria-hidden="true">
          <img src={imageAssets['idiom-telephone-cutout']} alt="" />
        </div>
      )}
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
      style={{ transform: `matrix(${a},${b},${c},${d},${tx},${ty})` }}>
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
      data-art-layer="eye" aria-hidden="true">
      <img src={meaning === 'A' ? imageAssets['double-meaning-eye'] : imageAssets['double-meaning-eye-couple']} alt="" />
    </div>
  );
}

export function CulturalReferenceArtwork({ meaning }: { meaning: MeaningState }) {
  if (meaning === 'B') {
    return (
      <div className={`${styles.bitmap} ${styles.throne}`} data-node-id="10:2087" data-art-layer="throne" aria-hidden="true">
        <img src={imageAssets['cultural-iron-throne-cutout']} alt="" />
      </div>
    );
  }
  return snowflakes.map((snowflake) => (
    <div key={snowflake.id} className={styles.bitmap} data-node-id={snowflake.id} data-art-layer="snowflake" aria-hidden="true"
      style={{ left: snowflake.x, top: snowflake.y, width: snowflake.width, height: snowflake.height, zIndex: snowflake.order }}>
      <img src={imageAssets['cultural-snowflake-cutout']} alt="" />
    </div>
  ));
}
