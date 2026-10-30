import { milestone } from '../../analytics/metrica';
import { useLayoutEffect, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { imageAssets, vectorAssets } from '../../assets/generated';
import type { ReadingAnchorId, ReadingHref } from '../../shared/navigation';
import { experimentSteps, type ExperimentOutcome } from './model';
import { useExperimentHelp } from './useExperimentHelp';
import type { useExperimentNavigation } from './useExperimentNavigation';
import helpStyles from './ExperimentHelp.module.css';
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
    <a className={styles.nextLink} href={href} data-node-id={link}
      onClick={href === '#experiment-result' ? () => milestone('experiment_attempt') : undefined}>
      <span className={styles.nextLabel} style={{ width: textWidth }} data-node-id={text}>{label}</span>
      <span className={styles.arrowBox} data-node-id={box}>
        <img src={vectorAssets['hero-cta-arrow']} alt="" data-node-id={arrow} />
      </span>
    </a>
  );
}

function BackLink({ href, nodeId }: { href: ReadingHref; nodeId: string }) {
  return (
    <a className={styles.backLink} href={href} data-back-link data-node-id={nodeId}>
      <span className={styles.backArrow} aria-hidden="true">
        <span>
          <picture>
            <source media="(max-width: 600px)" srcSet={vectorAssets['experiment-back-arrow-mobile']} />
            <img src={vectorAssets['experiment-back-arrow']} alt="" />
          </picture>
        </span>
      </span>
      <span className={styles.backLabel}>Назад</span>
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

function DistanceInstruction({ hidden = false }: { hidden?: boolean }) {
  return (
    <p id="experiment-distance-instruction" className={hidden ? styles.targetDescription : `${styles.copy} ${styles.distanceInstruction}`} data-node-id="10:724">
      Не
      {' отводя взгляд от крестика, медленно приближайся к экрану или отдаляйся от него, пока точка не исчезнет'}
    </p>
  );
}

function Instructions() {
  return (
    <section id={experimentSteps[0].anchor} className={styles.screen}
      aria-labelledby="experiment-instructions-title" data-node-id={experimentSteps[0].frame}>
      <Mosaic nodeId="10:719" />
      <BackLink href="#hero" nodeId="153:6" />
      <div className={styles.instructionBody}>
        <h2 id="experiment-instructions-title" className={styles.instructionTitle} data-node-id="10:720" tabIndex={-1}>Закрой левый глаз</h2>
        <p className={styles.instructionBanner} data-node-id="10:721">
          <span data-node-id="10:722">Правым смотри только на крестик</span>
        </p>
        <div className={styles.instructionCopy}>
          <p className={`${styles.copy} ${styles.scrollInstruction}`} data-node-id="10:723">Прокрути вниз — на следующем экране появятся крестик и точка</p>
          <DistanceInstruction />
        </div>
      </div>
      <div className={styles.screenFooter}>
        <div className={styles.forwardActions}>
          <a className={styles.bottomLink} href="#emptiness" onClick={() => milestone('experiment_skip')} data-node-id="10:729">Пропустить эксперимент</a>
          <NextScreenLink href="#experiment-target" label="К крестику и точке" textWidth={194}
            nodes={['10:725', '10:726', '10:727', '10:728']} />
        </div>
      </div>
    </section>
  );
}

function Target({ help }: { help: ReturnType<typeof useExperimentHelp> }) {
  return (
    <section id={experimentSteps[1].anchor} className={`${styles.screen} ${styles.targetScreen}`}
      aria-label="Крестик и точка" aria-describedby="experiment-distance-instruction"
      tabIndex={-1} data-node-id={experimentSteps[1].frame}>
      <Mosaic nodeId="10:731" />
      <DistanceInstruction hidden />
      <BackLink href="#experiment-instructions" nodeId="153:2" />
      <div className={styles.targetStage}>
        <svg className={styles.cross} width="100" height="100" viewBox="0 0 100 100"
          data-node-id="10:732" aria-hidden="true">
          <path d="M 0 0 L 100 0" transform="translate(0 50.666015625)"
            stroke="#fff" strokeWidth="10" strokeLinecap="butt" fill="none" data-node-id="10:733" />
          <path d="M 0 0 L 100 0"
            transform="matrix(-0.00000004371138828673793 1 -1 -0.00000004371138828673793 50.0068359375 0)"
            stroke="#fff" strokeWidth="10" strokeLinecap="butt" fill="none" data-node-id="10:734" />
        </svg>
        <div className={styles.targetDot} data-node-id="10:735" aria-hidden="true" />
      </div>
      <div className={styles.screenFooter}>
        <div className={styles.forwardActions}>
          <button ref={help.triggerRef} type="button" className={styles.bottomLink} data-node-id="10:736"
            aria-haspopup="dialog" aria-controls="experiment-help" aria-expanded={help.helpOpen}
            onClick={help.open}>Не получается?</button>
          <NextScreenLink href="#experiment-result" label="Я попробовал" textWidth={143}
            nodes={['10:742', '10:743', '10:744', '10:745']} />
        </div>
      </div>
      {createPortal(
        <dialog id="experiment-help" ref={help.dialogRef} className={helpStyles.dialog}
          aria-labelledby="experiment-help-title" onCancel={(event) => { event.preventDefault(); help.close(); }} onClose={help.onClose}
          onPointerDown={help.onPointerDown} onPointerCancel={help.onPointerCancel} onClick={help.onBackdropClick}>
          <div className={helpStyles.interior}>
            <div className={helpStyles.header}>
              <h3 id="experiment-help-title" className={helpStyles.title}><span>Не получается?</span></h3>
              <button type="button" className={helpStyles.close} aria-label="Закрыть инструкцию" onClick={() => help.close()}><span aria-hidden="true">×</span></button>
            </div>
            <ol className={helpStyles.list}>
              <li>Держи левый глаз закрытым и не переводи взгляд с крестика.</li>{'\n'}
              <li>Медленно меняй расстояние до экрана. Эффект зависит от размера дисплея и дистанции просмотра.</li>{'\n'}
              <li>Если не сработало — можно <a href="#emptiness" onClick={() => milestone('experiment_skip')}>пропустить</a>.</li>
            </ol>
          </div>
        </dialog>, document.body,
      )}
    </section>
  );
}

function ResultVisual() {
  return (
    <>
      <Mosaic nodeId="10:761" result />
      <div className={styles.resultBody}>
        <div className={styles.resultHeading}>
          <h2 id="experiment-result-title" className={styles.resultTitle} data-node-id="10:766" tabIndex={-1}>Она не мигнула.</h2>
          <p className={styles.resultSecondLine} data-node-id="10:767">Не потускнела.</p>
          <p className={styles.resultBanner} data-node-id="10:762"><span data-node-id="10:763">Просто исчезла.</span></p>
        </div>
        <p className={`${styles.copy} ${styles.resultNote}`} data-node-id="10:765">{'Не увидел исчезновения?\nЭто нормально: результат зависит от расстояния и условий просмотра'}</p>
        <div className={styles.resultStimulus}>
          <div className={styles.resultDot} data-node-id="10:768" aria-hidden="true" />
          <p className={`${styles.copy} ${styles.dotExplanation}`} data-node-id="10:764">Точка всё это время оставалась на экране</p>
        </div>
      </div>
    </>
  );
}

function Result() {
  return (
    <section id={experimentSteps[2].anchor} className={`${styles.screen} ${styles.resultScreen}`}
      aria-labelledby="experiment-result-title" data-node-id={experimentSteps[2].frame}>
      <BackLink href="#experiment-target" nodeId="153:10" />
      <ResultVisual />
      <div className={styles.screenFooter}>
        <div className={styles.forwardActions}>
          <span className={styles.secondaryPlaceholder} aria-hidden="true" />
          <NextScreenLink href="#emptiness" label="Что это значит?" textWidth={163}
            nodes={['10:769', '10:770', '10:771', '10:772']} />
        </div>
      </div>
    </section>
  );
}

export function ExperimentSection({ navigation }: { navigation: ReturnType<typeof useExperimentNavigation> }) {
  const help = useExperimentHelp();
  const [outcome, setOutcome] = useState<ExperimentOutcome>('unattempted');
  const { step } = navigation;
  useLayoutEffect(() => { help.close(false); }, [step, help.close]);
  const navigate = (event: MouseEvent<HTMLElement>) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    if (!anchor) return;
    const id = anchor.hash.slice(1);
    event.preventDefault();
    help.close(false);
    if (id === 'experiment-result') setOutcome('attempted');
    else if (id === 'emptiness' && !anchor.closest('#experiment-result')) setOutcome('skipped');
    navigation.navigate(id as ReadingAnchorId);
  };
  return createPortal(
    <section id="experiment" data-document-layer={navigation.documentLayer || undefined} aria-label="Эксперимент" data-narrative-section data-outcome={outcome}
      data-active-step={step ? experimentSteps.find((item) => item.id === step)?.anchor : undefined}
      className={styles.experiment} hidden={!step} inert={!step}>
      {step && (
        <div id="experiment-layer" role="dialog" aria-modal="true" aria-label="Эксперимент"
          className={styles.layer} onClick={navigate}>
          {step === 'instructions' && <Instructions />}
          {step === 'target' && <Target help={help} />}
          {step === 'result' && <Result />}
        </div>
      )}
    </section>, document.body,
  );
}
