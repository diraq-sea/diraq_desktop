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
  FETCH_ROOM_INFO,
  FETCH_MEMBERS,
  CREATE_ROOM,
  CREATE_NEW,
  DROP_FILE,
  FETCH_FILE,
  EDIT_FILE,
  CLOSE_WIN,
  MAX_WIN,
  UNMAX_WIN,
  MIN_WIN,
  GET_TABS,
  CHANGE_CURRENT_TAB,
  ADD_NEW_TAB,
  REMOVE_TAB,
  CHANGE_TAB_TYPE,
} = require('../../../common/ipcTypes')
const axios = require('../../utils/axios').default
const authStore = require('../../store/auth.store')
const configStore = require('../../store/config.store')
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

  [GET_USER_INFO]: async () => (await axios.get('/user')).data,

  [GET_AUTH_EMAIL]: () => ({ email: authStore.email }),

  [INVITE]: async () => (await axios.post('/auth/invite')).data.token,

  [FETCH_ROOMS]: async () => (await axios.get('/rooms')).data,

  [FETCH_ROOM_INFO]: async roomId => (await axios.get(`/room/${roomId}`)).data,

  [FETCH_MEMBERS]: async roomId => (await axios.get(`/room/${roomId}/members`)).data,

  [CREATE_ROOM]: async name => (await axios.post('/rooms', { name })).data,

  [CREATE_NEW]: async ({ roomId, ...params }) =>
    (await axios.post(`/room/${roomId}/files`, params)).data,

  [DROP_FILE]: async ({ roomId, ...params }) =>
    (await axios.post(`/room/${roomId}/files`, params)).data,

  [FETCH_FILE]: async fileId => (await axios.get(`/file/${fileId}`)).data,

  [EDIT_FILE]: async ({ extname, commit }) => {
    const filepath = path.join(TMP_FILES_DIR, `${commit.id}.${extname}`)
    if (!fs.existsSync(filepath)) await fetchAndSaveFile(commit.url, filepath)
    await open(filepath)
  },

  [CLOSE_WIN]: () => windowStore.close(),

  [MAX_WIN]: () => windowStore.maximize(),

  [UNMAX_WIN]: () => windowStore.unmaximize(),

  [MIN_WIN]: () => windowStore.minimize(),

  [GET_TABS]: () => ({
    tabs: configStore.get('tabs'),
    currentTabId: configStore.get('currentTabId'),
  }),

  [CHANGE_CURRENT_TAB]: tabId => configStore.set('currentTabId', tabId),

  [ADD_NEW_TAB]: type => {
    const tabs = configStore.get('tabs')
    const id = tabs.length ? tabs[tabs.length - 1].id + 1 : 0
    configStore.set('tabs', [...tabs, { id, type, values: null }])
    configStore.set('currentTabId', id)
  },

  [REMOVE_TAB]: id => {
    const tabs = configStore.get('tabs')
    const currentTabId = configStore.get('currentTabId')

    if (currentTabId === id) {
      if (tabs.length === 1) {
        configStore.set('currentTabId', null)
      } else {
        const index = tabs.findIndex(tab => tab.id === id)
        configStore.set('currentTabId', tabs[index === 0 ? 1 : index - 1].id)
      }
    }

    configStore.set('tabs', tabs.filter(tab => tab.id !== id))
  },

  [CHANGE_TAB_TYPE]: ({ id, type, values }) => {
    const tabs = [...configStore.get('tabs')]
    const index = tabs.findIndex(tab => tab.id === id)
    tabs[index] = { ...tabs[index], type, values }
    configStore.set('tabs', tabs)
  },
}
