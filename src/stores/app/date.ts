import { useDateFormat, useNow } from '@vueuse/core'
import { computed } from 'vue'
import { useAppInstance } from '@/stores/app/instance'

export function useDate() {
  const { isChildApp, mainApp } = useAppInstance()

  // FIXME 系统时间应该取服务器时间, 当作为独立应用时, 需获取服务器时间
  /** 当前系统时间 */
  const serverTime = computed<string>(() =>
    isChildApp.value
      ? mainApp.value.$store.getters.serverTime
      : useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value
  )

  return {
    /** 当前系统时间 */
    serverTime
  }
}
