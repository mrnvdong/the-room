import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { presenceWebSocketPlugin } from './src/server/websocketPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), presenceWebSocketPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
})
