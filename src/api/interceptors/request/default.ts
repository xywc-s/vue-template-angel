import qs from 'qs'
import { useUser } from '@/stores/user'
import { ContentTypes } from '@/api/config'
import type { AxiosRequestConfig } from 'axios'

export default {
  success: (config: AxiosRequestConfig) => {
    const contentType = config.headers['Content-Type']
    if (contentType.includes(ContentTypes.FORM)) {
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
