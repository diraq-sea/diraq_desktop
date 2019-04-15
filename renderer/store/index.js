import { ipcRenderer } from 'electron'
import { TMPFILE_OBSERVING, ON_MAXIMIZE, ON_UNMAXIMIZE } from '~~/common/ipcToWindowTypes'

export const state = () => ({
  isMaximized: false,
})

export const mutations = {
  setIsMaximized(state, bool) {
    state.isMaximized = bool
  },
}

export const plugins = [
  store => {
    ipcRenderer.on(TMPFILE_OBSERVING, (event, arg) => {
      console.log(arg) // eslint-disable-line
    })

    ipcRenderer.on(ON_MAXIMIZE, () => {
      store.commit('setIsMaximized', true)
    })

    ipcRenderer.on(ON_UNMAXIMIZE, () => {
      store.commit('setIsMaximized', false)
    })
  },
]
