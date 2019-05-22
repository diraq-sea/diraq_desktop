import mockStore from '../../../../store/mock.store'

export default {
  get: ({ roomId }) =>
    mockStore
      .filterByKeyFromArray('member', 'roomIds', roomId)
      .map(member => ({ ...member, online: member.id === 0 || Math.random() > 0.5 })),
  post({ ...params }, { roomId }) {
    for (const id of params.memberIds) {
      const user = mockStore.findById('member', id)
      user.roomIds.push(roomId)
      mockStore.update('member', user)
    }
  },
}
