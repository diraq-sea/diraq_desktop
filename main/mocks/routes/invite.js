import mockStore from '../../store/mock.store'
import { create } from '../models/invite'

export default {
  get: () => mockStore.get('invite'),
  post: ({ email, roomId, token }) => mockStore.add('invite', create({ email, roomId, token })),
}
