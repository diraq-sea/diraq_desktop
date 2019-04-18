export default ({ store }) =>
  Promise.all([
    store.dispatch('tab/getTabs'),
    store.dispatch('user/getUserInfo'),
    store.dispatch('fetchTmpInfo'),
  ])
