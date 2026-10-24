import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Explicit opt-in build, separate output. Normal vite build has no fixture entry or routes.
export default defineConfig({
  build: {
    outDir: 'dist-explorer-qa',
    rolldownOptions: {
      input: {
        app: fileURLToPath(new URL('./index.html', import.meta.url)),
        explorer: fileURLToPath(new URL('./qa/explorer.html', import.meta.url)),
      },
    },
  },
  plugins: [react(), {
    name: 'explorer-visual-fixtures',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const template = bundle['qa/explorer.html'];
      if (!template || template.type !== 'asset' || typeof template.source !== 'string') {
        this.error('Explorer fixture HTML was not emitted');
      }
      for (const category of ['idiom', 'pun', 'doubleMeaning', 'reference']) {
        for (const meaning of ['A', 'B']) {
          const fixture = `${category}-${meaning}`;
          this.emitFile({
            type: 'asset',
            fileName: `qa/${fixture}.html`,
            source: template.source.replace('data-explorer-fixture="idiom-A"', `data-explorer-fixture="${fixture}"`),
          });
        }
      }
      delete bundle['qa/explorer.html'];
    },
  }],
});
