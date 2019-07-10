import mockStore from '../../store/mock.store'
import { create } from '../models/invite'

export default {
  get: () => mockStore.get('invite'),
  post: ({ email, roomId }) => mockStore.add('invite', create({ email, roomId })),
}
