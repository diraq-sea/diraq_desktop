import { FETCH_ROOMS, FETCH_ROOM_INFO, CREATE_ROOM } from '~/common/ipcTypes'

export const state = () => ({
  rooms: null,
  roomInfo: null,
})

export const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setRoomInfo(state, roomInfo) {
    state.roomInfo = roomInfo
  },
}

export const actions = {
  async fetchRooms({ commit }) {
    const rooms = (await this.$ipc(FETCH_ROOMS)).reverse()
    commit('setRooms', rooms)
  },

  async fetchRoomInfo({ commit }, roomId) {
    commit('setRoomInfo', await this.$ipc(FETCH_ROOM_INFO, roomId))
  },

  async createRoom({ dispatch }, name) {
    const room = await this.$ipc(CREATE_ROOM, name)
    await dispatch('fetchRooms')
    return room
  },
}
