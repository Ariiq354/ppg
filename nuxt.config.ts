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

  icon: {
    serverBundle: "local",
  },

  ignorePrefix: "_",
});
