import { imageAssets } from '../../assets/generated';
import { characterCrops, emptinessLayers } from './emptinessArtworkData';
import styles from './EmptinessSection.module.css';

function EmptinessArtwork() {
  return (
    <div className={styles.artwork} data-node-id="10:846" aria-hidden="true">
      {emptinessLayers.map((layer) => {
        const crop = characterCrops.find((entry) => entry.id === layer.id);
        const image = layer.kind === 'male' ? imageAssets['emptiness-male-cutout']
          : layer.kind === 'female' ? imageAssets['emptiness-female-cutout'] : null;
        return (
          <div key={layer.id} data-node-id={layer.id} data-art-kind={layer.kind}
            className={image ? styles.character : styles.pixel}
            style={{
              left: `calc(var(--artwork-unit) * ${layer.x})`,
              top: `calc(var(--artwork-unit) * ${layer.y})`,
              width: `calc(var(--artwork-unit) * ${layer.width})`,
              height: `calc(var(--artwork-unit) * ${layer.height})`,
            }}>
            {image && crop && (
              <img src={image} alt="" style={{
                width: `calc(var(--artwork-unit) * ${layer.width / crop.matrix[0][0]})`,
                height: `calc(var(--artwork-unit) * ${layer.height / crop.matrix[1][1]})`,
                left: `calc(var(--artwork-unit) * ${-crop.matrix[0][2] * layer.width / crop.matrix[0][0]})`,
                top: `calc(var(--artwork-unit) * ${-crop.matrix[1][2] * layer.height / crop.matrix[1][1]})`,
              }} />
            )}
            {/* Union 10:875's source-only portrait is fully covered by 881/880/904.
                Only its yellow base is needed; never load/reveal that hidden fill. */}
          </div>
        );
      })}
    </div>
  );
}

export function EmptinessSection() {
  return (
    <section id="emptiness" aria-labelledby="emptiness-title" data-narrative-section data-section-surface className={styles.section}>
      <div className={styles.texture} data-section-texture data-node-id="10:839" aria-hidden="true"
        style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
      <div className={styles.canvas} data-section-canvas data-node-id="10:838">
        <h2 id="emptiness-title" tabIndex={-1} className={styles.title} data-node-id="10:840">Мозг не любит</h2>
        <p className={styles.banner} data-node-id="10:841"><span data-node-id="10:842">Пустоту</span></p>
        <p className={styles.copy} data-node-id="10:843">В области слепого пятна глаза нет светочувствительных клеток. Но обычно ты не видишь «дыру»: восприятие достраивает окружающую картину</p>
        <div className={styles.artFrame} data-node-id="10:844">
          <p className={styles.artLabel} data-node-id="10:845"><span>Слова знакомы</span></p>
          <EmptinessArtwork />
          <p className={`${styles.artLabel} ${styles.lastLabel}`} data-node-id="10:907"><span>Сюжет продолжается</span></p>
        </div>
      </div>
    </section>
  );
}
