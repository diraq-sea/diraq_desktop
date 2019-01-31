const fs = require('fs')
const mkdirIfNotExists = require('../utils/mkdirIfNotExists')
const writeFileIfNotExists = require('../utils/writeFileIfNotExists')
const { CONFIG_DIR, AUTH_FILE } = require('../const')
let auth = null
let isInit = false

function checkInit() {
  if (!isInit) throw new Error('authStore is not initialized')
}

function save() {
  fs.writeFileSync(AUTH_FILE, JSON.stringify(auth))
}

module.exports = {
  init() {
    mkdirIfNotExists(CONFIG_DIR)
    writeFileIfNotExists(AUTH_FILE, {
      _: "This is your DiraQ credentials file. DON'T SHARE!",
      email: null,
      credentials: [
        {
          type: 'login',
          token: null,
        },
      ],
    })

    auth = JSON.parse(fs.readFileSync(AUTH_FILE))
    isInit = true
  },
  get email() {
    checkInit()
    return auth.email
  },
  set email(email) {
    checkInit()
    auth.email = email
    save()
  },
  get isLogin() {
    checkInit()
    return !!auth.credentials[0].token
  },
  get token() {
    checkInit()
    return auth.credentials[0].token
  },
  set token(token) {
    checkInit()
    auth.credentials[0].token = token
    save()
  },
}
