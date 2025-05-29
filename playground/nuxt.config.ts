import path from 'node:path'
import { cwd } from 'node:process'

const playgroundNuxtDirs = [
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
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ua', name: 'Українська', file: 'ua.json' },
    ],
  },
  vueless: {
    include: playgroundNuxtDirs as never[],
    mirrorCacheDir: 'playground/node_modules/.cache/vueless',
  },
})
