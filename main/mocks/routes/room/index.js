import mockStore from '../../../store/mock.store'
import { create } from '../../models/room'

export default {
  get: () => mockStore.get('room'),
  post: ({ name }) => mockStore.add('room', create({ name })),
}
