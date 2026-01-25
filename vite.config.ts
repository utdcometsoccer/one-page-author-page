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
        manualChunks(id: string) {
          // React core libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Material UI icons
          if (id.includes('@mui/icons-material/')) {
            return 'mui-icons';
          }
          // Application Insights
          if (id.includes('@microsoft/applicationinsights')) {
            return 'insights';
          }
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
