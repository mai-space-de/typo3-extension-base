import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/vanilla-marquee/index.js'),
      name: 'Marquee',
      fileName: () => 'vanilla-marquee.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
  },
});
