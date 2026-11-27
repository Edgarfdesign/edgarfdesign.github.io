export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: true,
  // GitHub Pages sirve desde /docs en la rama main: sin CI, sin ramas extra.
  nitro: {
    output: { publicDir: 'docs' },
    prerender: { routes: ['/'], crawlLinks: true, failOnError: false }
  },
  css: ['~/assets/css/style.css'],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'theme-color', content: '#0b0b0e' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/Isotipo1.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600&display=swap' }
      ]
    }
  }
})
