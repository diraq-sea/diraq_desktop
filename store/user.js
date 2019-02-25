import { GET_USER_INFO } from '~/common/ipcTypes'

export const state = () => ({
  name: null,
  email: null,
})

export const mutations = {
  setUserInfo(state, { name, email }) {
    state.name = name
    state.email = email
  },
  clearUserInfo(state) {
    state.name = null
    state.email = null
  },
}

export const actions = {
  async getUserInfo({ commit }) {
    const userInfo = await this.$ipc(GET_USER_INFO)
    commit('setUserInfo', userInfo)
  },
}
