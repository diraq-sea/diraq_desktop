import mockStore from '../../store/mock.store'
import { ROLE_TYPES } from '../../../common/roleTypes'

export default {
  defaultValues: () => [
    {
      id: 0,
      name: 'mitsuhide',
      icon: '/imgs/user1.png',
      role: ROLE_TYPES[0].id,
      roomIds: [0],
    },
    {
      id: 1,
      name: 'kento',
      icon: '/imgs/user2.png',
      role: ROLE_TYPES[1].id,
      roomIds: [0],
    },
    {
      id: 2,
      name: 'hisanori',
      icon: '/imgs/user3.png',
      role: ROLE_TYPES[2].id,
      roomIds: [0],
    },
    {
      id: 3,
      name: 'ryoko',
      icon: '/imgs/user4.jpg',
      role: ROLE_TYPES[2].id,
      roomIds: [0],
    },
    {
      id: 4,
      name: 'taichi',
      icon: '/imgs/user5.png',
      role: ROLE_TYPES[3].id,
      roomIds: [0],
    },
  ],
  create: ({ name, icon, role, roomId }) => ({
    id: mockStore.get('member').length,
    name,
    icon,
    role,
    roomIds: [roomId],
  }),
}
