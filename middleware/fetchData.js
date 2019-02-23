export default ({ store }) =>
  Promise.all([store.dispatch('room/fetchRooms'), store.dispatch('user/getUserInfo')])
