import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'vite.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Fitter - Workout App',
        short_name: 'Fitter',
        description: 'Your personal workout companion',
        theme_color: '#242424',
        background_color: '#242424',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/fitter/',
        start_url: '/fitter/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,jpg}'],
        navigateFallback: '/fitter/index.html',
        navigateFallbackDenylist: [/^\/api\//]
      }
    })
  ],
  base: '/fitter/',
})
