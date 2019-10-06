import mockStore from '~/store/mock.store'
import { ROLE_TYPES } from '~~/common/roleTypes'

export function defaultValues() {
  return [
    {
      id: 0,
      userId: 0,
      roomId: 0,
      role: ROLE_TYPES[0].id,
    },
    {
      id: 1,
      userId: 1,
      roomId: 0,
      role: ROLE_TYPES[1].id,
    },
    {
      id: 2,
      userId: 2,
      roomId: 0,
      role: ROLE_TYPES[2].id,
    },
    {
      id: 3,
      userId: 3,
      roomId: 0,
      role: ROLE_TYPES[1].id,
    },
    {
      id: 4,
      userId: 4,
      roomId: 0,
      role: ROLE_TYPES[3].id,
    },
  ]
}

export function create({ userId, roomId, role }) {
  return {
    id: mockStore.get('member').length,
    userId,
    roomId,
    role,
  }
}

export default { defaultValues, create }
