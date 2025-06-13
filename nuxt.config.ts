// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxt/eslint', '@nuxt/ui-pro', '@vite-pwa/nuxt', 'nuxt-gtag'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/index.html': { prerender: true },
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  gtag: {
    id: 'G-PZNEM6LPD6'
  },

  pwa: {
    /* PWA options */
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    manifest: {
      name: 'Mass Guid Converter',
      short_name: 'Guid Converter',
      description: 'Converts and generates GUIDs and UUIDs allows you to convert between different formats.',
      theme_color: '#bfdbfe',
      icons: [
        {
          src: 'icons/1024.png',
          sizes: '1024x1024',
          type: 'image/png'
        },
        {
          src: 'icons/512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'icons/256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: 'icons/144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/64.png',
          sizes: '64x64',
          type: 'image/png'
        },
      ],
      screenshots: [
        {
          src: 'screenshots/1.png',
          sizes: '1080x1920',
          type: 'image/png'
        },
        {
          src: 'screenshots/wide.png',
          sizes: '640x377',
          type: 'image/png',
          form_factor: 'wide'
        },
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
})
