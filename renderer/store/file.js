import {
  FETCH_FILE,
  EDIT_FILE,
  ADD_COMMENT,
  ADD_COMMIT,
  SAVE_COMMIT_FILE,
  SAVE_COMMIT_ID,
  FETCH_COMMIT_ID,
} from '~~/common/ipcTypes'

const fs = require('fs')
const platform = require('../../common/platform')

export const state = () => ({
  fileList: {},
  currentCommitIdList: {},
})

export const getters = {
  file: state => fileId => state.fileList[fileId],
  currentCommitId: state => fileId => state.currentCommitIdList[fileId],
  currentCommit: (state, getters) => fileId =>
    getters.file(fileId).commits.find(commit => commit.id === getters.currentCommitId(fileId)),
}

export const mutations = {
  setFile(state, file) {
    state.fileList = {
      ...state.fileList,
      [file.id]: file,
    }
  },
  setCurrentCommitId(state, { fileId, id }) {
    state.currentCommitIdList = {
      ...state.currentCommitIdList,
      [fileId]: id,
    }
  },
}

export const actions = {
  async fetchFile({ commit }, { roomId, fileId }) {
    const file = await this.$ipc(FETCH_FILE, { roomId, fileId })
    commit('setFile', file)
    commit('setCurrentCommitId', {
      fileId: file.id,
      id: file.commits[file.commits.length - 1].id,
    })
  },
  async editFile(store, params) {
    await this.$ipc(EDIT_FILE, params)
  },
  async addComment(store, { roomId, fileId, commitId, comment }) {
    await this.$ipc(ADD_COMMENT, { roomId, fileId, commitId, comment })
  },
  async addCommit(store, { roomId, fileId, id, message }) {
    await this.$ipc(ADD_COMMIT, { roomId, fileId, id, message })
  },
  async viewFile({ commit }, { roomId, fileId, commitId }) {
    const file = await this.$ipc(FETCH_FILE, { roomId, fileId })
    commit('setFile', file)
    commit('setCurrentCommitId', {
      fileId,
      id: commitId,
    })
  },
  async saveCommitFile(store, { roomId, fileId, extname }) {
    const commitId = await this.$ipc(FETCH_COMMIT_ID, fileId)
    const newcommitId = await this.$ipc(SAVE_COMMIT_FILE, { roomId, fileId, commitId, extname })
    return newcommitId
  },
  async saveCommitId(store, { commitpanel, fileId, commitId }) {
    const result = await this.$ipc(SAVE_COMMIT_ID, { commitpanel, fileId, commitId })
    return result
  },
  checkOpenedFile(store, { TMP_FILES_DIR, fileId }) {
    const paths = fs.readdirSync(TMP_FILES_DIR)
    let flag = false
    const slash = { win: '\\', mac: '/', linux: '/' }[platform.default]
    paths.forEach(function(path) {
      const filepath = TMP_FILES_DIR + slash + path
      try {
        fs.renameSync(filepath, filepath)
      } catch (err) {
        const id_ = String(path.match(/id.*_/))
        if (id_.slice(2, -1) === String(fileId)) {
          flag = true
        }
        // flag = true
      }
    })
    flag = false
    return flag
  },
}
