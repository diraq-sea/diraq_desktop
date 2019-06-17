import { SIGNUP } from '~~/common/ipcTypes'

export const actions = {
  signup(store, { name, email, password }) {
    this.$ipc(SIGNUP, { name, email, password })
  },
}
