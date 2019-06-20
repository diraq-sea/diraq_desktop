import {
  FETCH_ROOMS,
  FETCH_ROOM_INFO,
  CREATE_ROOM,
  CREATE_NEW,
  DROP_FILE,
  ADD_MEMBERS,
} from '~~/common/ipcTypes'
import { DELETE_FILE_IN_ROOM } from '../../common/ipcTypes'

export const state = () => ({
  rooms: null,
  roomInfoList: {},
  roomId: null,
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
  setRoomId(state, roomId) {
    state.roomId = roomId
  },
}

export const actions = {
  async fetchRooms({ commit }) {
    const rooms = [...(await this.$ipc(FETCH_ROOMS))].reverse()
    commit('setRooms', rooms)
  },

  async fetchRoomInfo({ commit }, roomId) {
    commit('setRoomInfo', await this.$ipc(FETCH_ROOM_INFO, roomId))
  },

  async createRoom({ dispatch }, name) {
    const room = await this.$ipc(CREATE_ROOM, name)
    await dispatch('fetchRooms')
    const params = { roomId: room.id, memberIds: [room.owner] }
    await this.$ipc(ADD_MEMBERS, params)
    return room
  },

  async createNew({ dispatch }, params) {
    const item = await this.$ipc(CREATE_NEW, params)
    await dispatch('fetchRoomInfo', params.roomId)
    return item
  },

  async dropFile({ dispatch }, params) {
    const item = await this.$ipc(DROP_FILE, params)
    await dispatch('fetchRoomInfo', params.roomId)
    return item
  },

  getRoomId({ commit }, roomId) {
    commit('setRoomId', roomId)
  },
  async deleteFileInRoom(state, { roomId, fileId }) {
    await this.$ipc(DELETE_FILE_IN_ROOM, { roomId, fileId })
  },
}
