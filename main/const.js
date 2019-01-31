const path = require('path')
const HOME_DIR = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const CONFIG_DIR = path.join(HOME_DIR, '.diraq_study')

module.exports = {
  CONFIG_DIR,
  AUTH_FILE: path.join(CONFIG_DIR, 'auth.json'),
  CONFIG_FILE: path.join(CONFIG_DIR, 'config.json'),
  WINDOW_ORIGIN: 'http://localhost:3000',
  API_BASE_URL: 'http://localhost:8080/v1',
}
