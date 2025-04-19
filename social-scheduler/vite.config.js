import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/social-scheduler',
  server: {
    allowedHosts: [
      'e606-2401-4900-1c17-8abd-40c6-6ea5-1551-d76c.ngrok-free.app'
    ]
  },
  build: {
    outDir: '../Backend/public', // ← builds into backend folder directly
    emptyOutDir: true
  }
})
