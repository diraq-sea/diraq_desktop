import { CHECK_LOGIN, LOGOUT, PRELOGIN, LOGIN, GET_AUTH_EMAIL } from '../common/ipcTypes'

export const state = () => ({
  email: null,
})

export const mutations = {
  setEmail(state, email) {
    state.email = email
  },
}

export const actions = {
  async getAuthEmail({ commit }) {
    const { email } = await this.$ipc(GET_AUTH_EMAIL)
    commit('setEmail', email)
  },
  checkLogin() {
    return this.$ipc(CHECK_LOGIN)
  },
  logout() {
    return this.$ipc(LOGOUT)
  },
  prelogin(store, email) {
    return this.$ipc(PRELOGIN, email)
  },
  login(store, loginToken) {
    return this.$ipc(LOGIN, loginToken)
  },
}
