import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/photoswipe/index.js'),
      name: 'PhotoSwipe',
      fileName: () => 'photoswipe.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'photoswipe.css';
          return assetInfo.name;
        },
      },
    },
  },
});
