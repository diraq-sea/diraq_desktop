const {
  PRELOGIN,
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
  GET_USER_INFO,
  GET_AUTH_EMAIL,
  INVITE,
  FETCH_ROOMS,
  CREATE_ROOM,
} = require('../../../common/ipcTypes')
const axios = require('../../utils/axios')
const authStore = require('../../store/auth.store')

module.exports = {
  [PRELOGIN]: email => {
    authStore.email = email
    return axios.post('/auth/prelogin', { email })
  },

  [CHECK_LOGIN]: () => authStore.isLogin,

  [LOGIN]: async loginToken => {
    const { data } = await axios.post('/auth/login', null, {
      headers: { Authorization: `Bearer ${loginToken}` },
    })
    authStore.token = data.token
  },

  [LOGOUT]: () => (authStore.token = null),

  [GET_USER_INFO]: async () => (await axios.get('/users')).data,

  [GET_AUTH_EMAIL]: () => ({ email: authStore.email }),

  [INVITE]: async () => (await axios.post('/auth/invite')).data.token,

  [FETCH_ROOMS]: async () => (await axios.get('/rooms')).data,

  [CREATE_ROOM]: name => axios.post('/rooms', { name, published: false }),
}
