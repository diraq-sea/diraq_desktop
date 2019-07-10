const path = require('path')
const fs = require('fs')

const {
  PRELOGIN,
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
  GET_USER_INFO,
  GET_AUTH_EMAIL,
  FETCH_ROOMS,
  FETCH_ROOM_INFO,
  FETCH_MEMBERS,
  ADD_MEMBERS,
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
  ADD_COMMENT,
  ADD_COMMIT,
  FETCH_TMP_INFO,
  SAVE_COMMIT_FILE,
  SAVE_COMMIT_ID,
  FETCH_COMMIT_ID,
  DELETE_TMP_INFO,
  SAVE_INVITE_INFO,
  DELETE_FILE_IN_ROOM,
  SIGNUP,
  GET_INVITE_USER_INFO,
} = require('../../../common/ipcTypes')
const axios = require('../../utils/axios').default
const authStore = require('../../store/auth.store')
const configStore = require('../../store/config.store')
const windowStore = require('../../store/window.store')
const tmpStore = require('../../store/tmpfile.store')
const commitStore = require('../../store/commit.store')
const corrStore = require('../../store/corr.store')
const { TMP_FILES_DIR, TMP_FILE, MOCK_FILES_DIR } = require('../../const')
const fetchAndSaveFile = require('../../utils/fetchAndSaveFile')
const open = require('../../utils/open')

module.exports = {
  [PRELOGIN]: email => {
    authStore.email = email
    return axios.post('/auth/prelogin', { email })
  },

  [CHECK_LOGIN]: () => authStore.isLogin,

  [LOGIN]: async ({ email, password }) => {
    // eslint-disable-next-line
    console.log(email, password, 'tokenをGET')
    const loginToken =
      'qawfawgagahatgaaaghahahata.gawtawgawaga.hatawfagagahagafafggsgsegrsgsgeseshsehesgesgesgsegreshsehserbsebsgeghstehehsrtjrsnsbnesghsdherbnesbesbesbesbnhhsdgagagrafewafwafeafwagwagagahahahahahagafgag' // JWTでtoken返す
    const { data } = await axios.post('/auth/login', null, {
      headers: { Authorization: `Bearer ${loginToken}` },
    })
    authStore.token = data.token
  },

  [LOGOUT]: () => (authStore.token = null),

  [GET_USER_INFO]: async () => (await axios.get('/user')).data,

  [GET_AUTH_EMAIL]: () => ({ email: authStore.email }),

  [FETCH_ROOMS]: async () => (await axios.get('/rooms')).data,

  [FETCH_ROOM_INFO]: async roomId => (await axios.get(`/room/${roomId}`)).data,

  [FETCH_MEMBERS]: async roomId => (await axios.get(`/room/${roomId}/members`)).data,

  [ADD_MEMBERS]: async ({ roomId, ...params }) =>
    (await axios.post(`/room/${roomId}/members`, params)).data,

  [CREATE_ROOM]: async name => (await axios.post('/rooms', { name })).data,

  [CREATE_NEW]: async ({ roomId, ...params }) =>
    (await axios.post(`/room/${roomId}/file`, params)).data,

  [DROP_FILE]: async ({ roomId, ...params }) =>
    (await axios.post(`/room/${roomId}/file`, params)).data,

  [FETCH_FILE]: async ({ roomId, fileId }) =>
    (await axios.get(`room/${roomId}/file/${fileId}`)).data,

  [EDIT_FILE]: async ({ extname, commit, result }) => {
    let filename = corrStore.hashToFilename(commit.id)
    const filepath = path.join(TMP_FILES_DIR, `${filename}.${extname}`).replace(/ /g, '\\ ')
    const mockpath = path.join(MOCK_FILES_DIR, `${commit.id}.${extname}`)
    if (result === 'initialCommit') {
      if (!fs.existsSync(filepath)) {
        console.log('初コミット') // eslint-disable-line
        await fetchAndSaveFile(commit.url, filepath) // ここのif文の意図？
      }
      await open(filepath)
    } else if (result === 'mustCommit') {
      console.log('commitしてから') // eslint-disable-line
    } else if (result === 'anotherFileCommit') {
      console.log('置き換え', filename) // eslint-disable-line
      filename = `${Date.now()}_${commit.id}`
      const newfilepath = path.join(TMP_FILES_DIR, `${filename}.${extname}`)
      corrStore.writeFileInfo(filename, commit.id)
      fs.copyFileSync(mockpath, newfilepath)
      await open(newfilepath) // fileがないとき追加通知のみで開かれない
    } else {
      console.log('そのまま', filepath) // eslint-disable-line
      await open(filepath)
    }
  },

  [SAVE_COMMIT_FILE]: async ({ roomId, fileId, commitId, extname }) => {
    const filename = corrStore.hashToFilename(commitId)
    const filePath = path.join(TMP_FILES_DIR, `${filename}.${extname}`)
    // prettier-ignore
    const newcommitId = (await axios.post(`room/${roomId}/file/${fileId}`, { filePath, extname })).data
    corrStore.replaceFileInfo(commitId, newcommitId)
  },

  [SAVE_COMMIT_ID]: ({ commitpanel, fileId, commitId }) =>
    commitStore.writeInfo({ commitpanel, fileId, commitId }),

  [FETCH_COMMIT_ID]: fileId => commitStore.readInfo(fileId),

  [ADD_COMMENT]: async ({ roomId, fileId, commitId, comment }) =>
    // prettier-ignore
    (await axios.post(`room/${roomId}/file/${fileId}/commit/${commitId}/comment`, { comment })).data,

  [ADD_COMMIT]: async ({ roomId, fileId, message }) =>
    (await axios.post(`room/${roomId}/file/${fileId}/commit`, { message })).data,

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

  [FETCH_TMP_INFO]: () => {
    if (fs.existsSync(TMP_FILE)) return tmpStore.readFileInfo()
  },
  [DELETE_TMP_INFO]: extname => {
    if (fs.existsSync(TMP_FILE)) return tmpStore.deleteFileInfo(extname)
  },

  [SAVE_INVITE_INFO]: async ({ email, roomId }) => {
    await axios.post(`/invite`, { email, roomId })
  },
  [DELETE_FILE_IN_ROOM]: async ({ roomId, fileId }) => {
    await axios.delete(`/room/${roomId}/file`, { data: { fileId } })
  },
  [SIGNUP]: ({ name, email, password }) => {
    authStore.email = email
    axios.post('user', { name, email, password })
  },
  [GET_INVITE_USER_INFO]: async email => (await axios.post('/auth/invite', { email })).data,
}
