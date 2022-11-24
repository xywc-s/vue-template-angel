import { useApp } from '@/stores/app'
import type { AxiosResponse } from 'axios'

export default {
  success: (response: AxiosResponse) => {
    const appStore = useApp()
    if (appStore.loading?.close) {
      appStore.loading.close()
      appStore.loading = null
    }
    return Promise.resolve(response.data)
  },
  error: (error) => {
    const appStore = useApp()
    if (appStore.loading?.close) {
      appStore.loading.close()
      appStore.loading = null
    }
    return Promise.resolve({
      success: false,
      message: error
    })
  }
}
