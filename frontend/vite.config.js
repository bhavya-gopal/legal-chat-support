import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get repo name from environment or default to empty (for root deployment)
// If deploying to GitHub Pages, set this to your repo name
// For example: GITHUB_REPO_NAME=legal-support-chat npm run build
const repoName = process.env.GITHUB_REPO_NAME || import.meta.env.VITE_REPO_NAME || ''

export default defineConfig({
  base: repoName ? `/${repoName}/` : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})

