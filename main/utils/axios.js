const { API_BASE_URL } = require('../const')
const axios = require('axios').create({
  baseURL: API_BASE_URL,
})
const authStore = require('../store/auth.store')

axios.interceptors.request.use(config => {
  if (authStore.isLogin) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

module.exports = axios
