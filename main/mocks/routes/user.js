import mockStore from '../../store/mock.store'
import { create } from '../models/user'
import { ROLE_TYPES } from '~~/common/roleTypes'
const user = {
  id: 0,
  name: 'user1',
  email: 'aaa@test.com',
  icon: '/images/user2.png',
}

export default {
  get: () => user,
  post: ({ name, email, password }) => {
    mockStore.add('user', create({ name, email, password })) // 本来は招待者のみユーザー登録できるので消すべき
    if (mockStore.findByKey('invite', 'email', email).email === email) {
      // mockStore.add('user', create({ name, email, password }))
      const roomId = mockStore.findByKey('invite', 'email', email).roomId
      mockStore.deleteByKey('invite', 'email', email)
      const userId = mockStore.findByKey('user', 'email', email).id
      const role = ROLE_TYPES[1].id
      mockStore.add('member', create({ userId, roomId, role }))
    }
  },
}
