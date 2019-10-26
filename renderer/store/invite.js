import { GET_INVITE_USER_INFO, SAVE_INVITE_INFO, ADD_MEMBERS } from '~~/common/ipcTypes'
import { ROLE_TYPES } from '~~/common/roleTypes'

export const state = () => ({
  email: null,
})

export const mutations = {
  setUserInfo(state, email) {
    state.email = email
  },
  clearUserInfo(state) {
    state.email = null
  },
}

export const actions = {
  async getUserInfo({ commit }, { email, roomId }) {
    const userId = await this.$ipc(GET_INVITE_USER_INFO, email)
    if (userId !== 'nothing') {
      const params = { userId, roomId, role: ROLE_TYPES[1].id }
      await this.$ipc(ADD_MEMBERS, params)
    } else {
      await this.$ipc(SAVE_INVITE_INFO, { email, roomId })
    }
    commit('setUserInfo', email)
    return '招待しました'
  },
}
