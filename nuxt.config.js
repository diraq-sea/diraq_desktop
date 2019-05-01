import pkg from './package'

export default {
  mode: 'spa',
  srcDir: 'renderer/',
  router: { mode: 'hash' },
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: false,
  css: ['element-ui/lib/theme-chalk/index.css', '@fortawesome/fontawesome-free/css/all.css'],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/ipc',
    '@/plugins/moment',
    '@/plugins/platform',
    '@/plugins/fileIcon',
  ],
  modules: [],
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: { cache: true, fix: true },
        })
      }

      config.output.globalObject = 'this' // for WebWorker of pdf.js
      config.output.publicPath = './_nuxt/'
      config.target = 'electron-renderer'
    },
  },
}
