import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/masonry/index.js'),
      name: 'Masonry',
      fileName: () => 'masonry.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
  },
});
