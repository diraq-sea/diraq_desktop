import { ipcRenderer } from 'electron'
import { TMPFILE_OBSERVING, ON_MAXIMIZE, ON_UNMAXIMIZE } from '~/common/ipcToWindowTypes'
import { FETCH_TMP_INFO } from '~/common/ipcTypes'

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
}

export const plugins = [
  store => {
    ipcRenderer.on(TMPFILE_OBSERVING, (event, arg) => {
      console.log(arg) // eslint-disable-line
      if (arg.indexOf('修正') === 0) {
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
