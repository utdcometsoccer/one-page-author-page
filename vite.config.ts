/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification for production builds (esbuild is faster than terser)
    minify: 'esbuild',
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'mui-icons': ['@mui/icons-material/Facebook', '@mui/icons-material/Twitter', '@mui/icons-material/Instagram', '@mui/icons-material/LinkedIn', '@mui/icons-material/YouTube', '@mui/icons-material/GitHub', '@mui/icons-material/MusicNote'],
          'insights': ['@microsoft/applicationinsights-react-js', '@microsoft/applicationinsights-web']
        }
      }
    },
    // Warn on large chunks (500kb threshold)
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize source maps for production
    sourcemap: false
  },
  test: {
    globals: true,
    setupFiles: './setupTests.ts',
    environment: 'jsdom',
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
