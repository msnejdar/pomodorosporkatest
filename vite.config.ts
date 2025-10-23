import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion', '@tsparticles/react', '@tsparticles/slim'],
          'audio-vendor': ['howler']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})
