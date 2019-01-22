export const state = () => ({
  login_user: false,
})

export const mutations = {
  login_true(state) {
    state.login_user = true
  },
  login_false(state) {
    state.login_user = false
  },
}

export const getters = {
  login_state(state) {
    return state.login_user
  },
}

export const actions = {
  make_login_true(context) {
    context.commit('login_true')
  },
  make_login_false(context) {
    context.commit('login_false')
  },
}
