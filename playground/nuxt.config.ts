export default defineNuxtConfig({
  compatibilityDate: '2024-09-13',
  modules: ['../src/module.ts'],
  vueless: {
    mirrorCacheDir: 'playground/node_modules/.cache/vueless',
  },
  devtools: { enabled: true },
  tailwindcss: {
    config: {
      content: ['../node_modules/vueless/**/*.{js,ts,vue}'],
    },
  },
})
