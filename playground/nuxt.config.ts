export default defineNuxtConfig({
  compatibilityDate: '2024-09-13',
  modules: ['../src/module.ts'],
  css: ['~/assets/css/main.css'],
  vueless: {
    mirrorCacheDir: 'playground/node_modules/.cache/vueless',
  },
  devtools: {
    enabled: true,
  },
})
