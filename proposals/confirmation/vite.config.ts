import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

// Los componentes del DS importan `../../assets/logo-chilis.svg`, pero en el repo el logo vive en /public.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  plugins: [react()],
  resolve: {
    alias: [{ find: /^.*\/assets\/logo-chilis\.svg$/, replacement: `${repoRoot}public/logo-chilis.svg` }],
  },
  server: { fs: { allow: [repoRoot] } },
  build: { outDir: 'dist', emptyOutDir: true, assetsInlineLimit: 100_000_000 },
});
