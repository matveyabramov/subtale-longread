import { explorerCategories } from './model';

export function BlindZonesExplorer() {
  return (
    <section id="blind-zones" aria-labelledby="blind-zones-title" data-narrative-section
      data-category-count={explorerCategories.length}>
      <h2 id="blind-zones-title" tabIndex={-1}>Blind Zones Explorer</h2>
    </section>
  );
}
