// import { ROLE_TYPES } from '~~/common/roleTypes'
// import { FETCH_MEMBERS } from '~~/common/ipcTypes'

// export const state = () => ({
//   membersList: {},
// })

// export const getters = {
//   members: state => roomId => state.membersList[roomId],
//   sortedMembers: (state, getters) => roomId =>
//     [...getters.members(roomId)].sort((a, b) => +b.online - a.online),
//   roleLabel: () => roleId => ROLE_TYPES.find(role => role.id === roleId).label,
// }

// export const mutations = {
//   setMembers(state, { roomId, members }) {
//     state.membersList = {
//       ...state.membersList,
//       [roomId]: members,
//     }
//   },
// }

// export const actions = {
//   async fetchMembers({ commit }, roomId) {
//     commit('setMembers', {
//       roomId,
//       members: await this.$ipc(FETCH_MEMBERS, roomId),
//     })
//   },
// }
