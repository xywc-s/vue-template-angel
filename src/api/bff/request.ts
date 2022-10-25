import axios from 'axios'
import { Interceptor } from '@/utils/request'

const BFF = axios.create({
  baseURL: import.meta.env.VITE_API_BFF,
  timeout: 10000
})

BFF.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

BFF.interceptors.response.use(Interceptor.response.bff.success, Interceptor.response.bff.error)

export default BFF
