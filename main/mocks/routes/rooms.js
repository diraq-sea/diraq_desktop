const rooms = [{ id: 0, name: 'test1', owner: 0 }]

export default {
  get: () => [...rooms],
  post({ name }) {
    const room = { name, id: rooms.length, owner: 0 }
    rooms.push(room)
    return room
  },
}
