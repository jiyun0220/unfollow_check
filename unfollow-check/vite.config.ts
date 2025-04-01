import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // .env 파일 로드
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'process.env.VITE_GITHUB_TOKEN': JSON.stringify(env.VITE_GITHUB_TOKEN),
    },
    plugins: [react()],
    base: './',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true
    }
  }
})
