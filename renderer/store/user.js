import { GET_USER_INFO, NEW_USER_INFO } from '~~/common/ipcTypes'

export const state = () => ({
  name: null,
  email: null,
  icon: null,
})

export const mutations = {
  setUserInfo(state, { name, email, icon }) {
    state.name = name
    state.email = email
    state.icon = icon
  },
  clearUserInfo(state) {
    state.name = null
    state.email = null
    state.icon = null
  },
}

export const actions = {
  async getUserInfo({ commit }) {
    const userInfo = await this.$ipc(GET_USER_INFO)
    commit('setUserInfo', userInfo)
  },
  async newUserInfo({ commit }, { name, email }) {
    await this.$ipc(NEW_USER_INFO, { name, email })
    const icon = '/images/user2.png'
    const userInfo = { name, email, icon }
    commit('setUserInfo', userInfo)
  },
}
