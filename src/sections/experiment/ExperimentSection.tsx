import { imageAssets, vectorAssets } from '../../assets/generated';
import type { ReadingHref } from '../../shared/navigation';
import { experimentSteps } from './model';
import styles from './ExperimentSection.module.css';

interface NextScreenLinkProps {
  href: ReadingHref;
  label: string;
  textWidth: number;
  nodes: readonly [string, string, string, string];
}

function NextScreenLink({ href, label, textWidth, nodes }: NextScreenLinkProps) {
  const [link, text, box, arrow] = nodes;
  return (
    <a className={styles.nextLink} href={href} data-node-id={link}>
      <span className={styles.nextLabel} style={{ width: textWidth }} data-node-id={text}>{label}</span>
      <span className={styles.arrowBox} data-node-id={box}>
        <img src={vectorAssets['hero-cta-arrow']} alt="" data-node-id={arrow} />
      </span>
    </a>
  );
}

function Mosaic({ nodeId, result = false }: { nodeId: string; result?: boolean }) {
  return (
    <div className={`${styles.texture} ${result ? styles.resultTexture : ''}`}
      data-node-id={nodeId} aria-hidden="true"
      style={{ backgroundImage: `url("${imageAssets['mosaic-texture']}")` }} />
  );
}

function Instructions() {
  return (
    <section id={experimentSteps[0].anchor} className={styles.screen}
      aria-labelledby="experiment-instructions-title" data-node-id={experimentSteps[0].frame}>
      <Mosaic nodeId="10:719" />
      <h2 id="experiment-instructions-title" className={styles.instructionTitle} data-node-id="10:720" tabIndex={-1}>Закрой левый глаз</h2>
      <p className={styles.instructionBanner} data-node-id="10:721">
        <span data-node-id="10:722">Правым смотри только на крестик</span>
      </p>
      <p className={`${styles.copy} ${styles.scrollInstruction}`} data-node-id="10:723">Прокрути вниз — на следующем экране появятся крестик и точка</p>
      <p className={`${styles.copy} ${styles.distanceInstruction}`} data-node-id="10:724">Не отводя взгляд от крестика, медленно приближайся к экрану или отдаляйся от него, пока точка не исчезнет</p>
      <NextScreenLink href="#experiment-target" label="К крестику и точке" textWidth={194}
        nodes={['10:725', '10:726', '10:727', '10:728']} />
      <a className={`${styles.bottomLink} ${styles.skipLink}`} href="#emptiness" data-node-id="10:729">Пропустить эксперимент</a>
    </section>
  );
}

function Target() {
  return (
    <section id={experimentSteps[1].anchor} className={styles.screen}
      aria-label="Крестик и точка" data-node-id={experimentSteps[1].frame}>
      <Mosaic nodeId="10:731" />
      <svg className={styles.cross} width="100" height="100" viewBox="0 0 100 100"
        data-node-id="10:732" aria-hidden="true">
        <path d="M 0 0 L 100 0" transform="translate(0 50.666015625)"
          stroke="#fff" strokeWidth="10" strokeLinecap="butt" fill="none" data-node-id="10:733" />
        <path d="M 0 0 L 100 0"
          transform="matrix(-0.00000004371138828673793 1 -1 -0.00000004371138828673793 50.0068359375 0)"
          stroke="#fff" strokeWidth="10" strokeLinecap="butt" fill="none" data-node-id="10:734" />
      </svg>
      <div className={styles.targetDot} data-node-id="10:735" aria-hidden="true" />
      <button type="button" className={`${styles.bottomLink} ${styles.helpTrigger}`} data-node-id="10:736">Не получается?</button>
      {/* Static Figma reference state. Disclosure behavior belongs to Stage 3. */}
      <aside id="experiment-help" className={styles.help} data-node-id="10:737" aria-labelledby="experiment-help-title">
        <div className={styles.helpInterior} data-node-id="10:738">
          <div className={styles.helpContent} data-node-id="10:739">
            <h3 id="experiment-help-title" className={styles.helpTitle} data-node-id="10:740"><span>Не получается?</span></h3>
            <ol className={styles.helpList} data-node-id="10:741">
              <li>Держи левый глаз закрытым и не переводи взгляд с крестика.</li>{'\n'}
              <li>Медленно меняй расстояние до экрана. Эффект зависит от размера дисплея и дистанции просмотра.</li>{'\n'}
              <li>Если не сработало — можно <a href="#emptiness">пропустить</a>.</li>
            </ol>
          </div>
        </div>
      </aside>
      <NextScreenLink href="#experiment-result" label="Я попробовал" textWidth={143}
        nodes={['10:742', '10:743', '10:744', '10:745']} />
    </section>
  );
}

function Result() {
  return (
    <section id={experimentSteps[2].anchor} className={styles.screen}
      aria-labelledby="experiment-result-title" data-node-id={experimentSteps[2].frame}>
      <Mosaic nodeId="10:761" result />
      <p className={styles.resultBanner} data-node-id="10:762"><span data-node-id="10:763">Просто исчезла.</span></p>
      <p className={`${styles.copy} ${styles.dotExplanation}`} data-node-id="10:764">Точка всё это время оставалась на экране</p>
      <p className={`${styles.copy} ${styles.resultNote}`} data-node-id="10:765">{'Не увидел исчезновения?\nЭто нормально: результат зависит от расстояния и условий просмотра'}</p>
      <h2 id="experiment-result-title" className={styles.resultTitle} data-node-id="10:766" tabIndex={-1}>Она не мигнула.</h2>
      <p className={styles.resultSecondLine} data-node-id="10:767">Не потускнела.</p>
      <div className={styles.resultDot} data-node-id="10:768" aria-hidden="true" />
      <NextScreenLink href="#emptiness" label="Что это значит?" textWidth={163}
        nodes={['10:769', '10:770', '10:771', '10:772']} />
    </section>
  );
}

export function ExperimentSection() {
  return (
    <section id="experiment" aria-labelledby="experiment-instructions-title"
      data-narrative-section className={styles.experiment}>
      <Instructions />
      <Target />
      <Result />
    </section>
  );
}
