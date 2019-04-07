const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '@fortawesome/fontawesome-free/css/all.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/ipc',
    '@/plugins/moment',
    '@/plugins/platform',
    '@/plugins/fileIcon',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      config.target = 'electron-renderer'
      config.output.globalObject = 'this' // for WebWorker of pdf.js
    },
  },
}
