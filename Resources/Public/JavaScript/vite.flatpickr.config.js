import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/flatpickr/index.js'),
      name: 'flatpickr',
      fileName: () => 'flatpickr.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'flatpickr.css';
          return assetInfo.name;
        },
      },
    },
  },
});
