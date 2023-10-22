// vite.config.js
export default {
  server: {
    proxy: {
      '/process': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/process/, ''),
      },
      '/parse': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/process/, ''),
      },
    },
  },
};

