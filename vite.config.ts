// modules
import { defineConfig } from 'vite';

// overwrite configs
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['url', 'express', 'puppeteer'],
      input: {
        app: '/src/app.ts',
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
      },
    },
  },
});
