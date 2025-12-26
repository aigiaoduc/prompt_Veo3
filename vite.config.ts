
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Không cần define API_KEY từ env nữa vì đã được nhúng an toàn trong code
    'process.env': {}
  }
})
