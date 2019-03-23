import mockStore from '../../../../store/mock.store'

export default {
  get: ({ roomId }) =>
    mockStore
      .filterByKeyFromArray('member', 'roomIds', roomId)
      .map(member => ({ ...member, online: Math.random() > 0.5 })),
}
