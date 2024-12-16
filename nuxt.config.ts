// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  ssr: false,

  modules: [// '@nuxt/content',
    '@nuxt/fonts', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt', // 'nuxt-og-image',
    '@nuxthq/studio', '@vueuse/nuxt', '@nuxtjs/supabase', '@unlok-co/nuxt-stripe', '@nuxt/eslint', "nuxt-gtag", "@vite-pwa/nuxt"],

  imports: {
    dirs: ['types/*.ts', 'store/*.ts', 'types/**/*.ts'],
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c =>
        ['UButton'].includes(c.pascalName),
      )

      globals.forEach(c => (c.global = true))
    },
  },

  gtag: {
    id: 'G-PZNEM6LPD6'
  },

  pwa: {
    /* PWA options */
    manifest: {
      name: 'WarcraftStats',
      short_name: 'WowStats',
      description: 'World of Warcraft statistics and tools',
      theme_color: '#bfdbfe',
      icons: [
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
          src: 'screenshots/1.jpg',
          sizes: '1080x1920',
          type: 'image/jpg'
        },
        {
          src: 'screenshots/2.jpg',
          sizes: '1080x1920',
          type: 'image/jpg'
        },
        {
          src: 'screenshots/3.jpg',
          sizes: '1080x1920',
          type: 'image/jpg'
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

  stripe: {
    client: {
      key: '',
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'],
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: '2024-07-11',
})
