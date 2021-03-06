const DEBUG = true;

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
    '@/plugins/times',
    '@/plugins/requestHandler',
    '@/plugins/localStorage.js',
    '@/plugins/formatDate',
    '@/plugins/vue-loading-overlay',
    '@/plugins/utils'
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
    'cookie-universal-nuxt',
    ['nuxt-i18n', {
        locales: [
          {
            name: 'Russian',
            code: 'ru',
            iso: 'ru-RU',
            file: 'ru-RU.js'
          }, {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'ru'
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},

  strict: false,


  // http://84.201.153.133:3303
  env: {
    test: true,
    address: DEBUG ? 'http://127.0.0.1:3303'
      : 'https://services.weekendagency.ru'
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
