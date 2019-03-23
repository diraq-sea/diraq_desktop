import mockStore from '../../../../store/mock.store'

export default {
  get: ({ fileId }) =>
    mockStore.filterByKey('commit', 'fileId', fileId).map(commit => ({
      ...commit,
      comments: mockStore.filterByKey('comment', 'commitId', commit.id),
    })),
  post: ({ message }, { fileId }) => mockStore.add('commit', { fileId, message }),
}
