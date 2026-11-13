import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// The widget loads these files at runtime; they are shipped locally next to cap.js.
const runtimeAssets = [
  ['node_modules/@cap.js/wasm/browser/cap_wasm_bg.wasm', 'cap_wasm_bg.wasm'],
  ['node_modules/@cap.js/wasm/browser/hashwx.wasm', 'hashwx.wasm'],
  ['node_modules/pako/dist/pako_inflate.min.js', 'pako_inflate.min.js'],
];

export default defineConfig({
  plugins: [
    {
      name: 'copy-cap-runtime-assets',
      closeBundle() {
        const target = resolve(__dirname, 'dist/cap');
        mkdirSync(target, { recursive: true });
        runtimeAssets.forEach(([from, to]) => copyFileSync(resolve(__dirname, from), resolve(target, to)));
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/cap/index.js'),
      name: 'maiCaptcha',
      fileName: () => 'cap.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: false,
  },
});
