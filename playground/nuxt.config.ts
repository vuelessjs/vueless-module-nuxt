export default defineNuxtConfig({
  compatibilityDate: '2024-09-13',
  modules: ['@vueless/module-nuxt'],
  devtools: { enabled: true },
  tailwindcss: {
    config: {
      content: ['../node_modules/vueless/**/*.{js,ts,vue}'],
    },
  },
})
