import mockStore from '../../../../store/mock.store'
import commitRoute from '../../commit/_commitId'
import commitModel from '../../../models/commit'

export default {
  get: ({ fileId }) =>
    mockStore
      .filterByKey('commit', 'fileId', fileId)
      .map(({ id }) => commitRoute.get({ commitId: id })),
  post: ({ fileId, commitComment }) =>
    mockStore.add('commit', commitModel.create({ fileId, commitComment })),
}
