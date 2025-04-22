import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],

  vuetify: {
    moduleOptions: {
      styles: true,
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'pixelGrayTheme',
        themes: {
          pixelGrayTheme: {
            dark: false,
            colors: {
              background: '#CCCCCC',
              surface: '#E0E0E0',
              primary: '#616161',
              secondary: '#757575',
              error: '#B71C1C',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FB8C00',
            },
          },
        },
      },
    }
  },
})
