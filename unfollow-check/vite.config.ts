import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    port: 3000,
    host: true
  },
  define: {
    'process.env.VITE_GITHUB_TOKEN': JSON.stringify(process.env.VITE_GITHUB_TOKEN)
  }
})
