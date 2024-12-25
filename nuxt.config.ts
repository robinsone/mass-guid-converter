// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  target: 'static',
  ssr: false,

  modules: ['@nuxt/fonts', '@nuxt/image', // 'nuxt-og-image',
  '@nuxt/ui', '@pinia/nuxt', '@nuxthq/studio', '@vueuse/nuxt', '@nuxt/eslint', "nuxt-gtag", "@vite-pwa/nuxt", '@nuxtjs/sitemap', '@nuxtjs/robots'],

  imports: {
    dirs: ['types/*.ts', 'store/*.ts', 'types/**/*.ts'],
  },

  hooks: {
    'prerender:routes' ({ routes }) {
      routes.clear() // Do not generate any routes (except the defaults)
    }
  },

  gtag: {
    id: 'G-PZNEM6LPD6'
  },

  pwa: {
    /* PWA options */
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
      navigateFallback: '/index.html',
    },
    devOptions: {
      enabled: true,
      type: 'module'
    },
  },

  site: {
    // production URL
    url: 'https://robinsone.github.io/mass-guid-converter/',
  },

  ui: {
    icons: ['heroicons', 'simple-icons', 'streamline', 'ep'],
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },

  router: {
    base: '/',
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    strict: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: '2024-07-11',
})
