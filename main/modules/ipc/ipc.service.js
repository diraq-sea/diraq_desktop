const path = require('path')
const fs = require('fs')
const { autoUpdater } = require('electron-updater')
const FormData = require('form-data')
const mime = require('mime-types')

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
  WATCH_COMMENT,
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
  QUIT_AND_INSTALL,
} = require('../../../common/ipcTypes')
const axios = require('../../utils/axios').default
const authStore = require('../../store/auth.store')
const configStore = require('../../store/config.store')
const windowStore = require('../../store/window.store')
const tmpStore = require('../../store/tmpfile.store')
const commitStore = require('../../store/commit.store')
const corrStore = require('../../store/corr.store')
// const ngrok = require('../../store/ngrok')
const { TMP_FILES_DIR, TMP_FILE, S3_URL } = require('../../const')
const fetchAndSaveFile = require('../../utils/fetchAndSaveFile')
const open = require('../../utils/open')

module.exports = {
  [PRELOGIN]: email => {
    authStore.email = email
    return axios.post('/auth/prelogin', { email })
  },

  [CHECK_LOGIN]: () => authStore.isLogin,

  [LOGIN]: async ({ email, password }) => {
    const token = (await axios.post('/auth/login', { email, password })).data.access_token // mockに繋ぐ時はpropertyのaccess_token削除
    authStore.token = token
  },

  [LOGOUT]: () => (authStore.token = null),

  [GET_USER_INFO]: async () => (await axios.get('/user')).data,

  [GET_AUTH_EMAIL]: () => ({ email: authStore.email }),

  [FETCH_ROOMS]: async () => (await axios.get('/room')).data,

  [FETCH_ROOM_INFO]: async roomId => (await axios.get(`/room/${roomId}`)).data,

  [FETCH_MEMBERS]: async roomId => (await axios.get(`/room/${roomId}/members`)).data,

  [ADD_MEMBERS]: async ({ roomId, ...params }) =>
    (await axios.post(`/room/${roomId}/members`, params)).data,

  [CREATE_ROOM]: async name => (await axios.post('/room', { name })).data,

  [CREATE_NEW]: async ({ roomId, ...params }) => {
    // fs.copyFileSync(filePath, path.join(TMP_FILES_DIR, `${name}.${extname}`))
    // const type = params.extname
    // const form = new FormData()
    const fileandhash = (await axios.post(`/room/${roomId}/file`, params)).data
    return fileandhash
  },

  [DROP_FILE]: async ({ roomId, ...params }) => {
    const type = mime.lookup(params.path)
    const form = new FormData()
    const buffer = fs.readFileSync(params.path)
    form.append('file', buffer, {
      filename: params.name,
      contentType: type,
      knownLength: buffer.length,
    })
    form.append('extname', params.extname)
    form.append('folder', params.folder)
    form.append('name', params.name)
    form.append('path', params.path)
    form.append('type', type)
    const config = {
      headers: form.getHeaders(),
    }
    const fileandhash = (await axios.post(`/room/${roomId}/file`, form, config)).data
    if (fileandhash.hashname != null) {
      fs.copyFileSync(
        params.path,
        path.join(TMP_FILES_DIR, `${fileandhash.filename}.${params.extname}`),
      )
      corrStore.writeFileInfo(fileandhash.filename, fileandhash.commitId)
    }
    fileandhash.commit = (await axios.get(
      `/room/${roomId}/file/${fileandhash.file.id}/commit/${fileandhash.commitId}`,
    )).data
    return fileandhash
  },

  [FETCH_FILE]: async ({ roomId, fileId }) => {
    const filedata = (await axios.get(`room/${roomId}/file/${fileId}`)).data
    const url = S3_URL
    // const url = ngrok.proxyUrl
    // localhost用URL
    for (let i = 0; i < filedata.commits.length; i++) {
      filedata.commits[i].url = `${url}/${filedata.commits[i].url}`
    }
    return filedata
  },

  [EDIT_FILE]: async ({ extname, commit, result }) => {
    let filename = corrStore.commitIdToFilename(commit.id)
    const filepath = path.join(TMP_FILES_DIR, `${filename}.${extname}`)
    const remotepath = commit.url
    if (result === 'initialCommit') {
      if (!fs.existsSync(filepath)) {
        await fetchAndSaveFile(commit.url, filepath)
      }
      await open(filepath, commit.id, extname)
    } else if (result === 'mustCommit') {
      console.log('commitしてから') // eslint-disable-line
    } else if (result === 'anotherFileCommit') {
      console.log('置き換え', filename) // eslint-disable-line
      filename = `${Date.now()}_${commit.id}`
      const newfilepath = path.join(TMP_FILES_DIR, `${filename}.${extname}`)
      corrStore.writeFileInfo(filename, commit.id)
      fs.copyFileSync(remotepath, newfilepath)
      await open(newfilepath, commit.id, extname) // fileがないとき追加通知のみで開かれない
    } else {
      console.log('そのまま', filepath) // eslint-disable-line
      if (!fs.existsSync(filepath)) {
        await fetchAndSaveFile(commit.url, filepath)
      }
      await open(filepath, commit.id, extname)
    }
  },

  [SAVE_COMMIT_FILE]: async ({ roomId, fileId, commitId, extname }) => {
    const filename = corrStore.commitIdToFilename(commitId)
    const filePath = path.join(TMP_FILES_DIR, `${filename}.${extname}`)
    const type = mime.lookup(filePath)
    const form = new FormData()
    const buffer = fs.readFileSync(filePath)
    form.append('file', buffer, {
      filename,
      contentType: type,
      knownLength: buffer.length,
    })
    form.append('extname', extname)
    form.append('fileId', fileId)
    const config = {
      headers: form.getHeaders(),
    }
    config.headers['X-HTTP-Method-Override'] = 'PATCH'
    // prettier-ignore
    const newcommitId = (await axios.post(`room/${roomId}/file/${fileId}`, form, config)).data
    corrStore.replaceFileInfo(commitId, newcommitId)
    return newcommitId
  },

  [SAVE_COMMIT_ID]: ({ commitpanel, fileId, commitId }) => {
    return commitStore.writeInfo({ commitpanel, fileId, commitId })
  },

  [FETCH_COMMIT_ID]: fileId => commitStore.readInfo(fileId),

  [ADD_COMMENT]: async ({ roomId, fileId, commitId, comment }) =>
    // prettier-ignore
    (await axios.post(`room/${roomId}/file/${fileId}/commit/${commitId}/comment`, { comment })).data,

  [WATCH_COMMENT]: async ({ roomId, fileId, commitId, commentId }) =>
    // prettier-ignore
    (await axios.put(`room/${roomId}/file/${fileId}/commit/${commitId}/comment/${commentId}`)).data,

  [ADD_COMMIT]: async ({ roomId, fileId, id, message }) =>
    (await axios.post(`room/${roomId}/file/${fileId}/commit`, { id, message })).data,

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
    const commitIds = (await axios.delete(`/room/${roomId}/file/${fileId}`)).data
    for (const commitId of commitIds) {
      corrStore.deleteFileInfo(commitId)
    }
  },

  [SIGNUP]: ({ name, email, password }) => {
    authStore.email = email
    axios.post('/user', { name, email, password })
  },

  [GET_INVITE_USER_INFO]: async inviteMail => (await axios.get(`/invite/${inviteMail}`)).data,

  [QUIT_AND_INSTALL]: () => {
    autoUpdater.quitAndInstall()
  },
}
