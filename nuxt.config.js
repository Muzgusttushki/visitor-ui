const DEBUG = false;

export default {
  server: {
    port: 3000
  },

  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Visitor',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://use.fontawesome.com/31280c935a.css'}
    ],

    script: [
      {
        src: 'https://www.google.com/recaptcha/api.js?render=6LeNarYUAAAAAKOEIIh4xnQ7jt1BB7zloMq6CErs'
      },
      {
        src: 'https://use.fontawesome.com/31280c935a.js'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '@/components/loading',

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    {src: '@/styles/_bootstrap.scss', lang: 'scss'}
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/apex',
    '@/plugins/awesome',
    '@/plugins/loading-animation',
    '@/plugins/times',
    '@/plugins/requestHandler',
    '@/plugins/ux-dropdown',
    '@/plugins/localStorage.js'

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},

  strict: false,


  // http://84.201.153.133:3303
  env: {
    address: DEBUG ? 'http://127.0.0.1:3303'
      : 'http://84.201.153.133:3303'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
