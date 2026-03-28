import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_SOCKET': JSON.stringify(env.REACT_SOCKET)
    },
    plugins: [react()],
  }
})
