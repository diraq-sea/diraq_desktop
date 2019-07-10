import mockStore from '../../../store/mock.store'

export default {
  post: ({ email }) => mockStore.findByKey('user', 'email', email).id,
}
