import mockStore from '../../../../store/mock.store'
import commitRoute from '../../commit/_commitId'
import { create } from '../../../models/commit'

export default {
  get: ({ fileId }) =>
    mockStore
      .filterByKey('commit', 'fileId', fileId)
      .map(({ id }) => commitRoute.get({ commitId: id })),
  post: ({ message }, { fileId }) => mockStore.add('commit', create({ fileId, message })),
}
