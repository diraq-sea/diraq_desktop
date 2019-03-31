import mockStore from '../../../../store/mock.store'
import commentModel from '../../../models/comment'

export default {
  get: ({ commitId }) => mockStore.filterByKey('comment', 'commitId', commitId),
  post: ({ comment }, { commitId }) =>
    mockStore.add('comment', commentModel.create({ commitId, comment })),
}
