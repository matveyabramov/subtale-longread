import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, isPreview }) => ({
  // Enable the repository prefix only for GitHub Pages builds and previews.
  base: process.env.GITHUB_PAGES === 'true' && (command === 'build' || isPreview)
    ? '/subtale-longread/'
    : '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
}));
