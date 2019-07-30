import mockStore from '../../../../../../../store/mock.store'
import { create } from '../../../../../../models/commit'
import commitRoute from './_commitId'

export default {
  get: ({ fileId }) =>
    mockStore
      .filterByKey('commit', 'fileId', fileId)
      .map(({ id }) => commitRoute.get({ commitId: id })),
  post: ({ id, message }, { fileId }) => mockStore.add('commit', create({ id, fileId, message })),
}
