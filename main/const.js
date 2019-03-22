const path = require('path')
const HOME_DIR = require('os').homedir()
const CONFIG_DIR = path.join(HOME_DIR, '.diraq_study')

module.exports = {
  CONFIG_DIR,
  AUTH_FILE: path.join(CONFIG_DIR, 'auth.json'),
  CONFIG_FILE: path.join(CONFIG_DIR, 'config.json'),
  TMP_FILE: path.join(CONFIG_DIR, 'tmp.json'),
  MOCK_FILE: path.join(CONFIG_DIR, 'mock.json'),
  INSTANT_FILE: path.join(CONFIG_DIR, 'instant.json'), // 仮のJSONフォルダ
  TMP_FILES_DIR: path.join(CONFIG_DIR, 'tmpfiles'),
  WINDOW_ORIGIN: 'http://localhost:3000',
  API_BASE_URL: 'http://localhost:8080/v1',
  PLATFORM: { win32: 'win', darwin: 'mac', linux: 'linux' }[process.platform],
}
