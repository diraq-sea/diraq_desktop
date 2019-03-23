import mockStore from '../../../../store/mock.store'

export default {
  get: ({ roomId }) => ({
    ...mockStore.findById('room', roomId),
    items: mockStore.filterByKey('file', 'roomId', roomId),
  }),
}
