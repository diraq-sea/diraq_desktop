const rooms = [{ id: 0, name: 'test1' }]

export default {
  get: () => [...rooms],
  post({ name }) {
    const room = { name, id: rooms.length }
    rooms.push(room)
    return room
  },
}
