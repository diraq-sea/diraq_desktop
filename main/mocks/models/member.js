import mockStore from '~/store/mock.store'
import { ROLE_TYPES } from '~~/common/roleTypes'

export function defaultValues() {
  return [
    {
      id: 0,
      name: 'mitsuhide',
      icon: '/images/user1.png',
      role: ROLE_TYPES[0].id,
      roomIds: [0],
    },
    {
      id: 1,
      name: 'kento',
      icon: '/images/user2.png',
      role: ROLE_TYPES[1].id,
      roomIds: [0],
    },
    {
      id: 2,
      name: 'hisanori',
      icon: '/images/user3.png',
      role: ROLE_TYPES[2].id,
      roomIds: [0],
    },
    {
      id: 3,
      name: 'ryoko',
      icon: '/images/user4.jpg',
      role: ROLE_TYPES[2].id,
      roomIds: [0],
    },
    {
      id: 4,
      name: 'taichi',
      icon: '/images/user5.png',
      role: ROLE_TYPES[3].id,
      roomIds: [0],
    },
  ]
}

export function create({ name, icon, role, roomId }) {
  return {
    id: mockStore.get('member').length,
    name,
    icon,
    role,
    roomIds: [roomId],
  }
}

export default { defaultValues, create }
