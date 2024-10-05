import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import config from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwind, autoprefixer],
    },
  },
  server: {
    port: config.PORT,
    origin: config.ORIGIN,
  },
});
