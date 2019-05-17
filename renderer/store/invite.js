import { GET_USER_INFO, GET_INVITE_TOKEN, SAVE_INVITE_INFO } from '~~/common/ipcTypes'

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
    const userInfo = (await this.$ipc(GET_USER_INFO)).email
    if (email === userInfo) {
      console.log('既にDiraQユーザーなので、roomIdを招待者に追加して、通知') // eslint-disable-line
    } else {
      const token = await this.$ipc(GET_INVITE_TOKEN)
      await this.$ipc(SAVE_INVITE_INFO, { email, roomId, token })
      // roomからメンバーを追加するときはsignin処理とroomへのメンバー追加が必要
    }
    commit('setUserInfo', userInfo)
    return '招待しました'
  },
}
