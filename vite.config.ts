import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import ElectronPlugin from './plugins/vite-plugin-electron';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // electron([
    //   {
    //     entry: 'electron/main.ts'
    //   },
    //   {
    //     entry: 'electron/preload.ts'
    //   }
    // ])
    ElectronPlugin({
      output: 'dist',
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
