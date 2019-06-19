import mockStore from '../../store/mock.store'
import { create } from '../models/user'
import { ROLE_TYPES } from '~~/common/roleTypes'
const user = {
  name: 'user1',
  email: 'aaa@test.com',
  icon: '/images/user1.png',
}

export default {
  get: () => user,
  post: ({ name, email, password }) => {
    mockStore.add('user', create({ name, email, password })) // 本来は招待者のみユーザー登録できるので消すべき
    if (mockStore.findByKey('invite', 'email', email).email === email) {
      // mockStore.add('user', create({ name, email, password }))
      mockStore.deleteByKey('invite', 'email', email)
      const userId = mockStore.findByKey('user', 'email', email).id
      const roomId = mockStore.findByKey('invite', 'email', email).roomId
      const role = ROLE_TYPES[1].id
      mockStore.add('member', create({ userId, roomId, role }))
    }
  },
}
