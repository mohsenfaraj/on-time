import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({registerType: 'autoUpdate',
    includeAssets: ['ontime-192x192.png', 'ontime-512x512.png'],
      manifest: {
        name: 'On-Time Bus time Tracker',
        short_name: 'On-Time',
        description: 'track the next bus arriving time with on time.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'ontime-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'ontime-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
  })
  ] , 
  base : '/on-time/'
})
