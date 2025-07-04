// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/demo-stack-modal/',
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/test-utils', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  nitro: {
    preset: 'static'
  },
})