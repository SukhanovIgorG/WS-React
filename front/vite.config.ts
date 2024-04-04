import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3030', // URL вашего backend-сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'ws://localhost:3030',
        ws: true,
      },
    }
  }
})
