import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { prepareReloadNavigation } from './shared/reloadNavigation';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/global.css';

const root = document.getElementById('root');

if (!root) throw new Error('SUBTALE root element is missing.');

prepareReloadNavigation();

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
