import path from 'node:path'
import { cwd } from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

const playgroundNuxtDirs = [
  path.join(cwd(), 'playground', 'app'),
  path.join(cwd(), 'playground', 'composables'),
  path.join(cwd(), 'playground', 'components'),
  path.join(cwd(), 'playground', 'layouts'),
  path.join(cwd(), 'playground', 'pages'),
  path.join(cwd(), 'playground', 'plugins'),
  path.join(cwd(), 'playground', 'utils'),
  path.join(cwd(), 'playground', 'Error.vue'),
  path.join(cwd(), 'playground', 'App.vue'),
  path.join(cwd(), 'playground', 'Error.vue'),
  path.join(cwd(), 'playground', 'app.vue'),
  path.join(cwd(), 'playground', 'error.vue'),
]

export default defineNuxtConfig({
  modules: ['../src/module.ts', '@nuxtjs/i18n'],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-09-13',
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },
  // @ts-expect-error: i18n does not exist in type
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ua', name: 'Українська', file: 'ua.json' },
    ],
  },
  vueless: {
    srcDir: 'playground',
    include: playgroundNuxtDirs as never[],
    mirrorCacheDir: 'playground/node_modules/.cache/vueless',
  },
})
