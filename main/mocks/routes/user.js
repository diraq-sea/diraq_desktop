import mockStore from '../../store/mock.store'
import userModel from '../models/user'

const user = {
  name: 'user1',
  email: 'aaa@test.com',
  icon: '/images/user1.png',
}

export default {
  get: () => user,
  post: ({ name, email }) => mockStore.add('user', userModel.create({ name, email })),
}
