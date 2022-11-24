import { ElMessage } from 'element-plus'
import { isRef } from 'vue'
import type { FetchOptions, FetchLoading } from '@/types/custom'
import type { AngelResponse } from '@/types/request'

/**
 * 接口调用处理函数
 */
export function useFetch<T = AngelResponse, P = unknown>(options: FetchOptions<T, P>) {
  checkAndToggleLoading(options.loading, true)
  options
    .fn(options.params)
    .then((res) => {
      const { success, message } = res
      if (success) {
        message && ElMessage.success(message)
        if (options.hooks.success) options.hooks.success(res)
      } else {
        message && ElMessage.error(message)
      }
    })
    .catch(() => {})
    .finally(() => {
      checkAndToggleLoading(options.loading, false)
    })
}

function checkAndToggleLoading(loading: FetchLoading, value: boolean) {
  if (!loading) return
  if (isRef<boolean>(loading)) loading.value = value
  else loading(value)
}
