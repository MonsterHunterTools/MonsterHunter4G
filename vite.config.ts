import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElectronPlugin from './plugins/vite-plugin-electron';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue(),
    ElectronPlugin({
      output: 'docs',
      entry: [
        {
          entry: 'src/electron/main.ts',
          output: ''
        },
        {
          entry: 'src/electron/preload.ts',
          output: ''
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
