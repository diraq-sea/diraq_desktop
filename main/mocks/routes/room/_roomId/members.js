import mockStore from '../../../../store/mock.store'

export default {
  get: ({ roomId }) =>
    mockStore
      .filterByKeyFromArray('member', 'roomIds', roomId)
      .map(member => ({ ...member, online: member.id === 0 || Math.random() > 0.5 })),
}
