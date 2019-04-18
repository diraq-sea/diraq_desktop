const path = require('path')
const HOME_DIR = require('os').homedir()
const CONFIG_DIR = path.join(HOME_DIR, '.diraq_study')

module.exports = {
  CONFIG_DIR,
  AUTH_FILE: path.join(CONFIG_DIR, 'auth.json'),
  CONFIG_FILE: path.join(CONFIG_DIR, 'config.json'),
  TMP_FILE: path.join(CONFIG_DIR, 'tmp.json'),
  MOCK_FILE: path.join(CONFIG_DIR, 'mock.json'),
  CONFIG_VERSION: 0,
  MOCK_VERSION: 1,
  MOCK_FILES_DIR: path.join(__dirname, '../renderer/static/mocks'),
  MOCK_FILES_PATH: 'mocks',
  DEFAULT_FILES_PATH_CHUNK: 'defaults/default',
  FIRST_CREATED_MESSAGE: name => `「${name}」を新規作成しました。`,
  FIRST_DROPPED_MESSAGE: name => `「${name}」をアップロードしました。`,
  TMP_FILES_DIR: path.join(CONFIG_DIR, 'tmpfiles'),
  WINDOW_ORIGIN:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `file://${__dirname}/index.html`,
  API_BASE_URL: 'http://localhost:8080/v1',
  PLATFORM: { win32: 'win', darwin: 'mac', linux: 'linux' }[process.platform],
}
