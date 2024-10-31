// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@nuxt/ui",
    "nuxt-security",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxt/image",
  ],
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseAuthToken: process.env.DATABASE_AUTH_TOKEN,
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "https://avatars.githubusercontent.com/",
          "'self'",
          "data:",
        ],
      },
    },
  },

  // ignorePrefix: "_",
});
