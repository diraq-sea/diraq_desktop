const fs = require('fs')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { CONFIG_FILE } = require('../const')
let config = {
  windowSize: {
    width: 1000,
    height: 750,
  },
  tabs: [],
  currentTabId: null,
}
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('configStore is not initialized')
}

module.exports = {
  init() {
    writeFileIfNotExists(CONFIG_FILE, config)
    config = {
      ...config,
      ...JSON.parse(fs.readFileSync(CONFIG_FILE)),
    }

    isInit = true
  },
  get(key) {
    checkInit()
    return config[key]
  },
  set(key, val) {
    checkInit()
    config = {
      ...config,
      [key]: val,
    }

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config))
  },
}
