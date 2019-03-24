import mockStore from '../../../../store/mock.store'

export default {
  get: ({ commitId }) => ({
    ...mockStore.findById('commit', commitId),
    comments: mockStore.filterByKey('comment', 'commitId', commitId),
  }),
}
