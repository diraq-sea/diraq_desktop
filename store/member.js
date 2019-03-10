import { ROLE_TYPES } from '~/common/roleTypes'
import { FETCH_MEMBERS } from '~/common/ipcTypes'

export const state = () => ({
  members: null,
})

export const getters = {
  sortedMembers(state) {
    return [...state.members].sort((a, b) => +b.online - a.online)
  },
  roleLabel() {
    return roleId => ROLE_TYPES.find(role => role.id === roleId).label
  },
}

export const mutations = {
  setMembers(state, members) {
    state.members = members
  },
}

export const actions = {
  async fetchMembers({ commit }, roomId) {
    commit('setMembers', await this.$ipc(FETCH_MEMBERS, roomId))
  },
}
