const menuList = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    icon: 'fa-home',
  },
]

export const state = () => ({
  menuPath: menuList[0],
})

export const getters = {
  menuList: () => menuList,
}
