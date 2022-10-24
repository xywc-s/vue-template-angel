import axios from 'axios'
import { useNotify } from '@/repositories'

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

BFF.interceptors.response.use(
  (response) => {
    const { success, message } = response.data
    /**
     * fullReturn 是否全量返回结果; 如果为false, 则只返回response.data
     * autoNotify 是否由拦截器代理消息提示
     */
    const { fullReturn = false, autoNotify = true } = response.config
    if (message && autoNotify) useNotify(message, success ? 'success' : 'error')
    return Promise.resolve(fullReturn ? response : response.data)
  },
  (error) => {
    console.error('response error', error)
    useNotify(error.message, 'error')
    return Promise.resolve({
      success: false,
      message: error.message
    })
  }
)

export default BFF
