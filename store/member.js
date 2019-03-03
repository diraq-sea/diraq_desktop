import { ROLE_TYPES } from '~/common/roleTypes'
import userIcon from '~/assets/imgs/user1.png'

export const state = () => ({
  membersList: [
    {
      id: 1,
      roomId: 1,
      members: [
        { id: 1, name: 'member1', icon: userIcon, role: ROLE_TYPES[0].id, online: true },
        { id: 2, name: 'member2', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 3, name: 'member3', icon: userIcon, role: ROLE_TYPES[2].id, online: false },
        { id: 4, name: 'member4', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 5, name: 'member5', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
        { id: 6, name: 'member6', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 7, name: 'member7', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 8, name: 'member8', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
      ],
    },
    {
      id: 2,
      roomId: 2,
      members: [
        { id: 1, name: 'member1', icon: userIcon, role: ROLE_TYPES[0].id, online: true },
        { id: 2, name: 'member2', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 3, name: 'member3', icon: userIcon, role: ROLE_TYPES[2].id, online: false },
        { id: 4, name: 'member4', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 5, name: 'member5', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
        { id: 6, name: 'member6', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 7, name: 'member7', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 8, name: 'member8', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
      ],
    },
    {
      id: 3,
      roomId: 3,
      members: [
        { id: 1, name: 'member1', icon: userIcon, role: ROLE_TYPES[0].id, online: true },
        { id: 2, name: 'member2', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 3, name: 'member3', icon: userIcon, role: ROLE_TYPES[2].id, online: false },
        { id: 4, name: 'member4', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 5, name: 'member5', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
        { id: 6, name: 'member6', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 7, name: 'member7', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 8, name: 'member8', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
      ],
    },
    {
      id: 4,
      roomId: 4,
      members: [
        { id: 1, name: 'member1', icon: userIcon, role: ROLE_TYPES[0].id, online: true },
        { id: 2, name: 'member2', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 3, name: 'member3', icon: userIcon, role: ROLE_TYPES[2].id, online: false },
        { id: 4, name: 'member4', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 5, name: 'member5', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
        { id: 6, name: 'member6', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 7, name: 'member7', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 8, name: 'member8', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
      ],
    },
    {
      id: 5,
      roomId: 5,
      members: [
        { id: 1, name: 'member1', icon: userIcon, role: ROLE_TYPES[0].id, online: true },
        { id: 2, name: 'member2', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 3, name: 'member3', icon: userIcon, role: ROLE_TYPES[2].id, online: false },
        { id: 4, name: 'member4', icon: userIcon, role: ROLE_TYPES[1].id, online: true },
        { id: 5, name: 'member5', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
        { id: 6, name: 'member6', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 7, name: 'member7', icon: userIcon, role: ROLE_TYPES[1].id, online: false },
        { id: 8, name: 'member8', icon: userIcon, role: ROLE_TYPES[2].id, online: true },
      ],
    },
  ],
})

export const getters = {
  members(state, getters, rootState) {
    return [
      ...state.membersList.find(m => m.roomId === rootState.room.currentRoom.id).members,
    ].sort((a, b) => +b.online - a.online)
  },
  roleLabel() {
    return roleId => ROLE_TYPES.find(role => role.id === roleId).label
  },
}
