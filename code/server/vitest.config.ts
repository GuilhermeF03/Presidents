import tsconfigPaths from 'vite-tsconfig-paths';
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Configuration options can go here
    globals: true,
    environment: 'jsdom', // or 'node' depending on your testing needs
  },
});
