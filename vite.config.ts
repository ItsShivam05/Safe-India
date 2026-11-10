import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { contentCheck } from './scripts/checkContent.ts'
import { prerenderPages } from './scripts/prerender.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contentCheck(), prerenderPages()],
})
