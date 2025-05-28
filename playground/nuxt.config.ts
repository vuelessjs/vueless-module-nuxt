export default defineNuxtConfig({
  modules: ['../src/module.ts'],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-09-13',
  vueless: {
    mirrorCacheDir: 'playground/node_modules/.cache/vueless',
  },
})
