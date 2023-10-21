import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    proxy: {
      '/persons': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
