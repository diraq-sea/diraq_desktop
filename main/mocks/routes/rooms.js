import mockStore from '../../store/mock.store'
import roomModel from '../models/room'

export default {
  get: () => mockStore.get('room'),
  post: ({ name }) => mockStore.add('room', roomModel.create({ name })),
}
