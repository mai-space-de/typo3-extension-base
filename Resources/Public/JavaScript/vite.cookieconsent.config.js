import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/cookieconsent/index.js'),
      name: 'CookieConsent',
      fileName: () => 'cookieconsent.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'cookieconsent.css';
          return assetInfo.name;
        },
      },
    },
  },
});
