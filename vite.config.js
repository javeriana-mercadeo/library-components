import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@library': path.resolve(__dirname, './src/ui/library'),
      '@library-institutional': path.resolve(__dirname, './src/ui/library/_institutional'),
      '@documentation': path.resolve(__dirname, './src/ui/doc'),
      '@constants': path.resolve(__dirname, './src/constants')
    }
  }
})
