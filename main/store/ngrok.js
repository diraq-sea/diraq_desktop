const ngrok = require('ngrok')

let proxyUrl = null
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('authStore is not initialized')
}
module.exports = {
  async init() {
    proxyUrl = await ngrok.connect(9000)
    isInit = true
  },
  get proxyUrl() {
    checkInit()
    return proxyUrl
  },
}
