import { FETCH_ROOMS, CREATE_ROOM } from '../common/ipcTypes'

export const state = () => ({
  rooms: [],
  currentRoom: null,
})

export const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setCurrentRoom(state, id) {
    state.currentRoom = state.rooms.find(room => room.id === id)
  },
}

export const actions = {
  async fetchRooms({ commit }) {
    const rooms = await this.$ipc(FETCH_ROOMS)
    commit('setRooms', rooms)
    commit('setCurrentRoom', rooms[rooms.length - 1].id)
  },

  async createRoom({ dispatch }, name) {
    await this.$ipc(CREATE_ROOM, name)
    await dispatch('fetchRooms')
  },
}
