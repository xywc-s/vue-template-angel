import axios from 'axios'
import { Interceptor } from '@/utils/request'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BFF,
  timeout: 10000
})

request.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(Interceptor.response.bff.success, Interceptor.response.bff.error)

export default request
