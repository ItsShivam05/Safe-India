import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { contentCheck } from './scripts/checkContent.ts'
import { prerenderPages } from './scripts/prerender.ts'

// https://vite.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: (file) => (file.endsWith('.woff2') || file.endsWith('.woff') ? false : undefined),
  },
  plugins: [
    react(),
    contentCheck(),
    prerenderPages(),
    // Saves the site on the phone after the first visit, so guides, helplines and tools work offline
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'SafeIndia — Know what to do when it matters',
        short_name: 'SafeIndia',
        description: 'Emergency steps, helplines and safety tools for India. Works offline.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#F7F2EA',
        theme_color: '#211D35',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['index.html', 'assets/**/*.{js,css,woff2}', 'illustrations/*.jpg', 'images/safeindia-emblem.png', 'icons/*.png', 'favicon*.png'],
        // Fonts for languages the site doesn't use are left out
        globIgnores: ['**/*cyrillic*', '**/*vietnamese*', '**/*greek*'],
        navigateFallback: '/index.html',
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
