import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    VitePWA({  
      registerType: 'prompt',  
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],  
      manifest: {  
         name: 'websitename',  
        short_name: 'websitename',  
        description: 'Website description(Could be same with index.html file)',  
        theme_color: '#ffffff',  
        start_url: '/',  
        icons: [  
        {  
          src: 'logo192.png',  
          sizes: '192x192',  
          type: 'image/png',  
        },  
        {  
          src: 'logo512.png',  
          sizes: '512x512',  
          type: 'image/png',  
        },  
        {  
          src: 'logo512.png',  
          sizes: '512x512',  
          type: 'image/png',  
          purpose: 'any maskable',  
        }],  
      },  
    })
  ],
})
