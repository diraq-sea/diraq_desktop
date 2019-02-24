import { FETCH_ROOMS, CREATE_ROOM } from '../common/ipcTypes'

export const state = () => ({
  rooms: [],
  currentRoom: null,
  openingList: [],
})

export const getters = {
  isOpening(state) {
    return id => state.openingList.includes(id)
  },
}

export const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setCurrentRoom(state, id) {
    state.currentRoom = state.rooms.find(room => room.id === id)
  },
  toggleOpening(state, id) {
    if (state.openingList.includes(id)) {
      state.openingList = state.openingList.filter(e => e !== id)
    } else {
      state.openingList = [...state.openingList, id]
    }
  },
}

export const actions = {
  async fetchRooms({ commit }) {
    const rooms = (await this.$ipc(FETCH_ROOMS)).reverse()
    commit('setRooms', rooms)
    if (rooms.length) commit('setCurrentRoom', rooms[0].id)
  },

  async createRoom({ dispatch }, name) {
    await this.$ipc(CREATE_ROOM, name)
    await dispatch('fetchRooms')
  },
}
