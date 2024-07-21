import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),  // Adjusted to be relative to root
        merch: resolve(__dirname, 'src/merch/merch.html'),  // Adjusted to be relative to root
        spotify: resolve(__dirname, 'src/spotify/index.html'),  // Adjusted to be relative to root
        tour: resolve(__dirname, 'src/tour/index.html'),  // Adjusted to be relative to root
        about: resolve(__dirname, 'src/about/index.html'),  // Adjusted to be relative to root
      },
    },
  },
});
