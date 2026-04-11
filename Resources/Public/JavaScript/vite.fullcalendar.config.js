import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/fullcalendar/index.js'),
      name: 'FullCalendar',
      fileName: () => 'fullcalendar.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'fullcalendar.css';
          return assetInfo.name;
        },
      },
    },
  },
});
