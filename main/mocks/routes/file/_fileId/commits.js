import mockStore from '../../../../store/mock.store'
import commitRoute from '../../commit/_commitId'

export default {
  get: ({ fileId }) =>
    mockStore
      .filterByKey('commit', 'fileId', fileId)
      .map(({ id }) => commitRoute.get({ commitId: id })),
  post: ({ message }, { fileId }) => mockStore.add('commit', { fileId, message }),
}
