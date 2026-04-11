import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/micromodal/index.js'),
      name: 'MicroModal',
      fileName: () => 'micromodal.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
  },
});
