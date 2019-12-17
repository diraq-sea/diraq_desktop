import mockStore from '../../../../../../../../../store/mock.store'
import { create } from '../../../../../../../../models/comment'

export default {
  get: ({ commitId }) => mockStore.filterByKey('comment', 'commitId', commitId),
  post: ({ userId, comment }, { commitId }) =>
    mockStore.add('comment', create({ userId, commitId, comment })),
}
