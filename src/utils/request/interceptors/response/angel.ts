import { useApp } from '@/stores/app'
import type { AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'

export interface angelRes<D = any, T = any> {
  success: boolean
  message: string | null
  rows: D[]
  object: T | null
  total: number
  code: number
  footer: any[]
}

export default {
  success: (response: AxiosResponse<angelRes>) => {
    const { success, message } = response.data
    const { notify = true } = response.config
    const appStore = useApp()
    if (appStore.loading) {
      appStore.loading.close()
      appStore.loading = null
    }
    if (notify) {
      if (success) {
        message &&
          ElNotification.success({
            message,
            duration: 2500
          })
      } else {
        message &&
          ElNotification.error({
            message,
            duration: 2500
          })
      }
    }
    return Promise.resolve(response.data)
  },
  error: (error) => {
    const { message } = error
    const appStore = useApp()
    if (appStore.loading) {
      appStore.loading.close()
      appStore.loading = null
    }
    ElNotification.error({
      message,
      duration: 2500
    })
    console.log('response error: ', error)
    return Promise.resolve({
      success: false
    })
  }
}
