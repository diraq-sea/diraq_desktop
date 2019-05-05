import mockStore from '../../store/mock.store'
import inviteModel from '../models/invite'

export default {
  get: () => mockStore.get('invite'),
  post: ({ email, roomId, token }) =>
    mockStore.add('invite', inviteModel.create({ email, roomId, token })),
}
