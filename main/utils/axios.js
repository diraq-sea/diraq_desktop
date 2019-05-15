import axios from 'axios'
import { API_BASE_URL } from '../const'
import authStore from '../store/auth.store'
import setupMock from '../mocks/setup'

const client = axios.create({
  baseURL: API_BASE_URL,
})

client.interceptors.request.use(config => {
  if (authStore.isLogin) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export async function setupAxiosMock() {
  await setupMock(client)
}

export default client
