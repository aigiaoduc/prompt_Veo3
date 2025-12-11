import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  // QUAN TRỌNG: Lấy API Key từ file .env HOẶC từ biến môi trường hệ thống (Vercel Setting)
  const apiKey = env.API_KEY || process.env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Expose API_KEY to the client-side code securely
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Define process.env to prevent "process is not defined" errors if accessed directly
      'process.env': {} 
    }
  }
})