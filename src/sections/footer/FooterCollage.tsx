import { imageAssets } from '../../assets/generated';
import { images, pixels } from './artworkData';
import styles from './FooterSection.module.css';

type ImageLayer = (typeof images)[number];

export function FooterPixels({ parent }: { parent: string }) {
  return pixels.filter(pixel => pixel.parent === parent).map(pixel => (
    <div key={pixel.id} className={styles.pixel} data-node-id={pixel.id} style={{ left: pixel.x, top: pixel.y, width: pixel.width, height: pixel.height }} />
  ));
}

export function FooterImage({ id }: { id: ImageLayer['id'] }) {
  const layer = images.find(image => image.id === id);
  if (!layer) return null;
  const [[a, c, tx], [b, d, ty]] = layer.matrix;
  const crop = layer.crop;
  return (
    <div className={styles.imageLayer} data-node-id={id} data-filtered={id === '10:1145'} style={{
      width: layer.width, height: layer.height, transform: `matrix(${a},${b},${c},${d},${tx},${ty})`,
    }}>
      <img src={imageAssets[layer.asset]} alt={id === '10:1162' ? 'HSE ART AND DESIGN SCHOOL' : ''} style={crop ? {
        width: layer.width / crop[0][0], height: layer.height / crop[1][1],
        left: -crop[0][2] * layer.width / crop[0][0], top: -crop[1][2] * layer.height / crop[1][1],
      } : undefined} />
    </div>
  );
}

export function FooterCollage() {
  return (
    <div className={styles.collage} data-node-id="10:1019" aria-hidden="true">
      <div className={styles.middleClip} data-node-id="10:1020"><FooterPixels parent="10:1020" /></div>
      <FooterPixels parent="10:1019" />
      {/* The source portrait starts below the outer clip. Keep its bounds, not its hidden bitmap. */}
      <div className={styles.clippedPortrait} data-node-id="10:1073" />
      <div className={styles.upperClip} data-node-id="10:1103">
        <FooterPixels parent="10:1103" />
        <FooterImage id="10:1142" />
        <FooterImage id="10:1143" />
      </div>
      <FooterImage id="10:1144" />
      <FooterImage id="10:1145" />
    </div>
  );
}
