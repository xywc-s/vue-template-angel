import { useNotify } from '@/repositories'
import { useApp } from '@/stores/app'
import type { AxiosResponse } from 'axios'

export default {
  success: (response: AxiosResponse) => {
    const appStore = useApp()
    if (appStore.loading?.close) {
      appStore.loading.close()
      appStore.loading = null
    }
    /**
     * fullReturn 是否全量返回结果; 如果为false, 则只返回response.data
     * autoNotify 是否由拦截器代理消息提示
     */
    const { fullReturn = false, autoNotify = true } = response.config
    const { success, message } = response.data
    if (autoNotify && message) useNotify(message, success ? 'success' : 'error')
    return Promise.resolve(fullReturn ? response : response.data)
  },
  error: (error) => {
    const appStore = useApp()
    if (appStore.loading?.close) {
      appStore.loading.close()
      appStore.loading = null
    }
    const { message } = error
    useNotify(message, 'error')
    return Promise.resolve({
      success: false,
      message
    })
  }
}
