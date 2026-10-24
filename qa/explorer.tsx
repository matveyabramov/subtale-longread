// Separate build entry. Never imported by the normal application.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BlindZonesExplorer } from '../src/sections/blind-zones/BlindZonesExplorer';
import { explorerCategories } from '../src/sections/blind-zones/model';
import type { MeaningState } from '../src/sections/blind-zones/model';
import '../src/styles/fonts.css';
import '../src/styles/tokens.css';
import '../src/styles/reset.css';
import '../src/styles/global.css';

const fixture = document.documentElement.dataset.explorerFixture;
const category = explorerCategories.find((entry) => fixture === `${entry.id}-A` || fixture === `${entry.id}-B`);
const root = document.getElementById('root');
if (!category || !root) throw new Error('Invalid Explorer fixture');
const meaning: MeaningState = fixture === `${category.id}-B` ? 'B' : 'A';

createRoot(root).render(
  <StrictMode>
    <BlindZonesExplorer category={category.id} meaning={meaning} />
  </StrictMode>,
);
