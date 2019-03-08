const path = require('path')
const fs = require('fs')

const {
  PRELOGIN,
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
  GET_USER_INFO,
  GET_AUTH_EMAIL,
  INVITE,
  FETCH_ROOMS,
  CREATE_ROOM,
  EDIT_FILE,
  CLOSE_WIN,
  MAX_WIN,
  UNMAX_WIN,
  MIN_WIN,
} = require('../../../common/ipcTypes')
const axios = require('../../utils/axios').default
const authStore = require('../../store/auth.store')
const windowStore = require('../../store/window.store')
const { TMP_FILES_DIR } = require('../../const')
const fetchAndSaveFile = require('../../utils/fetchAndSaveFile')
const open = require('../../utils/open')

module.exports = {
  [PRELOGIN]: email => {
    authStore.email = email
    return axios.post('/auth/prelogin', { email })
  },

  [CHECK_LOGIN]: () => authStore.isLogin,

  [LOGIN]: async loginToken => {
    const { data } = await axios.post('/auth/login', null, {
      headers: { Authorization: `Bearer ${loginToken}` },
    })
    authStore.token = data.token
  },

  [LOGOUT]: () => (authStore.token = null),

  [GET_USER_INFO]: async () => (await axios.get('/users')).data,

  [GET_AUTH_EMAIL]: () => ({ email: authStore.email }),

  [INVITE]: async () => (await axios.post('/auth/invite')).data.token,

  [FETCH_ROOMS]: async () => (await axios.get('/rooms')).data,

  [CREATE_ROOM]: name => axios.post('/rooms', { name, published: false }),

  [EDIT_FILE]: async ({ name, commit }) => {
    const filepath = path.join(TMP_FILES_DIR, `${commit.id}${path.extname(name)}`)
    if (!fs.existsSync(filepath)) await fetchAndSaveFile(commit.url, filepath)
    await open(filepath)
  },

  [CLOSE_WIN]: () => windowStore.close(),

  [MAX_WIN]: () => windowStore.maximize(),

  [UNMAX_WIN]: () => windowStore.unmaximize(),

  [MIN_WIN]: () => windowStore.minimize(),
}
