import mockStore from '../../../../../../../../../../store/mock.store'

export default {
  get: ({ commentId }) => mockStore.filterById('comment', commentId),
}
