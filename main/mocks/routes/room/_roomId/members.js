import mockStore from '../../../../store/mock.store'
import { create } from '../../../models/member'

export default {
  get: ({ roomId }) => {
    const usersList = []
    const members = mockStore.filterByKey('member', 'roomId', roomId)
    for (const member in members) {
      usersList.push(mockStore.findByKey('user', 'id', members[member].userId))
    }
    const sampleUsersList = usersList.map(user => ({
      ...user,
      online: user.id === 0 || Math.random() > 0.5,
    }))
    return sampleUsersList
  }, // has_many, belong_to がないのでとりあえずの処置, このリレーションは一位である必要あり、バックエンドで調整
  post({ userId, role }, { roomId }) {
    mockStore.add('member', create({ userId, roomId, role }))
  },
}
