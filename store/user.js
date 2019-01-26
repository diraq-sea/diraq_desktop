import { ipcRenderer } from 'electron'
export const state = () => ({
  name: 'hjjh',
})

export const mutations = {
  get_user_name(state) {
    state.name = new Promise(resolve => {
      ipcRenderer.once('user-name-reply', (event, arg) => {
        resolve({ arg })
      })
      ipcRenderer.send('user-name-request')
    })
  },
}

export const getters = {
  user_name(state) {
    return state.name
  },
}

export const actions = {
  get_name(context) {
    context.commit('get_user_name')
  },
}
