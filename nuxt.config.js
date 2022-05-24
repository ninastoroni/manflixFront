export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'manflix',
    htmlAttrs: {
      lang: 'pt_br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      '@/layouts/scss/reset.scss',
      'primeflex/primeflex.css',
      '@/layouts/scss/generalVariables.scss',
      '@/layouts/scss/generalStyle.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  modules: [
    'primevue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    "@nuxtjs/google-fonts"
  ],

  primevue:{
    theme: "saga-orange",
    ripple: false,
    components: [
      "Button",
      "Password",
      "Toast"
    ]
  },

  auth:{
    strategies:{
      local:{
        endpoints:{
          login:{
            url:  process.env.BASE_URL + '/api/v1/auth/token/login/',
            method: "POST",
            propertyName: "auth_token"
          },
          logout:{
            url: process.env.BASE_URL + '/api/v1/auth/token/logout/',
            method: "POST",
            propertyName: "auth_token"
          },
          user:{
            url: process.env.BASE_URL + '/api/v1/users/me/',
            method: "GET",
            propertyName: false
          },
        },
        tokenType: "Token",
        tokenName: "Authorization",
      }
    },
    redirect:{
      login: "/",
      home: "/home"
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue'],
  }
}
