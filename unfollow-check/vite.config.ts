import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.VITE_GITHUB_TOKEN': JSON.stringify(process.env.VITE_GITHUB_TOKEN)
  },
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
