import { FETCH_ROOMS, FETCH_ROOM_INFO, CREATE_ROOM, CREATE_FOLDER } from '~/common/ipcTypes'

export const state = () => ({
  rooms: null,
  roomInfoList: {},
})

export const getters = {
  roomInfo: state => roomId => state.roomInfoList[roomId],
}

export const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setRoomInfo(state, roomInfo) {
    state.roomInfoList = {
      ...state.roomInfoList,
      [roomInfo.id]: roomInfo,
    }
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

  async createFolder({ dispatch }, params) {
    await this.$ipc(CREATE_FOLDER, params)
    await dispatch('fetchRoomInfo', params.roomId)
  },
}
