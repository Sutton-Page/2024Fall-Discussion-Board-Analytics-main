import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.SPRING_PORT}`,  // Spring Boot server
        changeOrigin: true,
        secure: false,
      },
      '/flask': {
        target: `http://localhost:${process.env.FLASK_PORT}`,  // Flask server
        changeOrigin: true,
        secure: false,
      },
      '/data': {
        target: `http://localhost:${process.env.BACKEND_PORT}`,  // Node server (server.cjs)
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
