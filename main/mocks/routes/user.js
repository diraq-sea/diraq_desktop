import mockStore from '../../store/mock.store'
import { create } from '../models/user'

const user = {
  name: 'user1',
  email: 'aaa@test.com',
  icon: '/images/user1.png',
}

export default {
  get: () => user,
  post: ({ name, email }) => {
    if (mockStore.findByKey('invite', 'email', email).email === email) {
      mockStore.add('user', create({ name, email }))
      mockStore.delete('invite', 'email', email)
    }
  },
}
