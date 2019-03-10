import { ROLE_TYPES } from '../../../../common/roleTypes'

const userIcons = [
  '/imgs/user1.png',
  '/imgs/user2.png',
  '/imgs/user3.png',
  '/imgs/user4.jpg',
  '/imgs/user5.png',
]

const membersList = {
  0: [
    {
      id: 0,
      name: 'mitsuhide',
      icon: userIcons[0],
      role: ROLE_TYPES[0].id,
      online: true,
    },
    {
      id: 1,
      name: 'kento',
      icon: userIcons[1],
      role: ROLE_TYPES[1].id,
      online: Math.random() > 0.5,
    },
    {
      id: 2,
      name: 'hisanori',
      icon: userIcons[2],
      role: ROLE_TYPES[2].id,
      online: Math.random() > 0.5,
    },
    {
      id: 3,
      name: 'ryoko',
      icon: userIcons[3],
      role: ROLE_TYPES[2].id,
      online: Math.random() > 0.5,
    },
    {
      id: 4,
      name: 'taichi',
      icon: userIcons[4],
      role: ROLE_TYPES[3].id,
      online: Math.random() > 0.5,
    },
  ],
}

export default {
  get({ roomId }) {
    if (!membersList[roomId]) membersList[roomId] = []

    return membersList[roomId]
  },
}
