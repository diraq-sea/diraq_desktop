import mockStore from '../../../../../../../../../../store/mock.store'

export default {
  get: ({ commentId }) => mockStore.filterById('comment', commentId),
  post: ({ userId }, { commentId }) => {
    const comment = mockStore.findById('comment', commentId)
    if (!comment.watchedBy.includes(userId)) {
      comment.watchedBy = [...comment.watchedBy, userId]
    }
    mockStore.update('comment', comment)
  },
}
