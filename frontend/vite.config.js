// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/process':'http://localhost:3001',
      '/parse':'http://localhost:3001',
    },
  },
  plugins: [],
});
