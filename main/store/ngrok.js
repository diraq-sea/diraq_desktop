const ngrok = require('ngrok')
const { WINDOW_ORIGIN } = require('../const')

let proxyUrl = null
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('authStore is not initialized')
}
module.exports = {
  async init() {
    proxyUrl = await ngrok.connect(+WINDOW_ORIGIN.replace(/^.+?:(\d+)\/?.*$/, '$1'))
    isInit = true
  },
  get proxyUrl() {
    checkInit()
    return proxyUrl
  },
}
