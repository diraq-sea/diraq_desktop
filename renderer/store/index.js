import { ipcRenderer } from 'electron'
import { TMPFILE_OBSERVING, ON_MAXIMIZE, ON_UNMAXIMIZE } from '~~/common/ipcToWindowTypes'
import { FETCH_TMP_INFO, DELETE_TMP_INFO, FETCH_COMMIT_ID } from '~~/common/ipcTypes'
import { TMPFILE_STATES } from '~~/common/chokidarTypes'

export const state = () => ({
  isMaximized: false,
  committed: {},
})

export const mutations = {
  setIsMaximized(state, bool) {
    state.isMaximized = bool
  },
  setCommitted(state, file) {
    state.committed = file
  },
}

export const actions = {
  async fetchTmpInfo({ commit }) {
    const tmpInfo = await this.$ipc(FETCH_TMP_INFO)
    commit('setCommitted', tmpInfo)
  },
  async deleteTmpInfo({ commit }, { fileId, extname }) {
    const commitId = await this.$ipc(FETCH_COMMIT_ID, fileId)
    const tmpInfo = await this.$ipc(DELETE_TMP_INFO, { commitId, extname })
    commit('setCommitted', tmpInfo)
  },
}

export const plugins = [
  store => {
    ipcRenderer.on(TMPFILE_OBSERVING, (event, arg) => {
      console.log(arg) // eslint-disable-line
      if (arg === TMPFILE_STATES.CHANGED) {
        store.dispatch('fetchTmpInfo')
      }
    })

    ipcRenderer.on(ON_MAXIMIZE, () => {
      store.commit('setIsMaximized', true)
    })

    ipcRenderer.on(ON_UNMAXIMIZE, () => {
      store.commit('setIsMaximized', false)
    })
  },
]
