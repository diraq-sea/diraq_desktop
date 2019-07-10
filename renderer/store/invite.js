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
    if (userId) {
      const params = { userId, roomId, role: ROLE_TYPES[1].id }
      await this.$ipc(ADD_MEMBERS, params)
      console.log('既にDiraQユーザーなので、roomIdを招待者に追加して、通知') // eslint-disable-line
    } else {
      await this.$ipc(SAVE_INVITE_INFO, { email, roomId })
      // eslint-disable-next-line
      console.log('招待する')
    }
    commit('setUserInfo', email)
    return '招待しました'
  },
}
