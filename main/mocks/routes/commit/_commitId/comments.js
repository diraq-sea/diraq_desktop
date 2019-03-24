import mockStore from '../../../../store/mock.store'

export default {
  get: ({ commitId }) => mockStore.filterByKey('comment', 'commitId', commitId),
  post: ({ comment }, { commitId }) => mockStore.add('comment', { commitId, comment }),
}
