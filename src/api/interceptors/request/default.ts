import { useUserStore } from '@/stores/user'
import type { AxiosRequestConfig } from 'axios'

export default {
  success: (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      Authorization: useUserStore().token
    }
    return config
  },
  error: (error) => {
    return Promise.reject(error)
  }
}
