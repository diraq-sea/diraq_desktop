let rooms = [{ id: 0, name: 'test1', owner: 0 }]

export default {
  get: () => rooms,
  post({ name }) {
    const room = { id: rooms.length, name, owner: 0 }
    rooms.push(room)
    return room
  },
  getAll: () => rooms,
  setAll: value => (rooms = value),
}
