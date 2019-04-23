import {
  FETCH_FILE,
  EDIT_FILE,
  ADD_COMMENT,
  ADD_COMMIT,
  SAVE_COMMIT_FILE,
  SAVE_COMMIT_ID,
  FETCH_COMMIT_ID,
} from '~~/common/ipcTypes'

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
  async fetchFile({ commit }, id) {
    const file = await this.$ipc(FETCH_FILE, id)
    commit('setFile', file)
    commit('setCurrentCommitId', {
      fileId: file.id,
      id: file.commits[file.commits.length - 1].id,
    })
  },
  async editFile(store, params) {
    await this.$ipc(EDIT_FILE, params)
  },
  async addComment(store, { commitId, comment }) {
    await this.$ipc(ADD_COMMENT, { commitId, comment })
  },
  async addCommit(store, { fileId, message }) {
    await this.$ipc(ADD_COMMIT, { fileId, message })
  },
  async viewFile({ commit }, { fileId, commitId }) {
    const file = await this.$ipc(FETCH_FILE, fileId)
    commit('setFile', file)
    commit('setCurrentCommitId', {
      fileId,
      id: commitId,
    })
  },
  async saveCommitFile(store, { fileId, extname }) {
    const commitId = await this.$ipc(FETCH_COMMIT_ID, fileId)
    await this.$ipc(SAVE_COMMIT_FILE, { fileId, commitId, extname })
  },
  async saveCommitId(store, { fileId, commitId }) {
    await this.$ipc(SAVE_COMMIT_ID, { fileId, commitId })
  },
}
