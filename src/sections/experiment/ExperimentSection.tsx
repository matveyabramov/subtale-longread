import { experimentSteps } from './model';

export function ExperimentSection() {
  return (
    <section id="experiment" aria-labelledby="experiment-title" data-narrative-section>
      <h2 id="experiment-title" tabIndex={-1}>Experiment</h2>
      {experimentSteps.map((step) => (
        <section key={step.id} id={step.anchor} aria-labelledby={`${step.anchor}-title`}>
          <h3 id={`${step.anchor}-title`} tabIndex={-1}>{step.id}</h3>
        </section>
      ))}
    </section>
  );
}
