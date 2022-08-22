import { useUser } from '@/stores/user'
import type { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { CONTENT_TYPES } from '../../config'

export default {
  success: (config: AxiosRequestConfig) => {
    const contentType = config.headers['Content-Type']
    if (contentType.includes(CONTENT_TYPES.FORM)) {
      config.data = qs.stringify(config.data)
    }
    config.headers = {
      ...config.headers,
      Authorization: useUser().token
    }
    return config
  },
  error: (error) => {
    return Promise.reject(error)
  }
}
