import { useDateFormat, useNow } from '@vueuse/core'
import { computed } from 'vue'
import { useAppInstance } from '@/stores/app/instance'

export function useDate() {
  const { isChildApp, mainApp } = useAppInstance()
  /** 当前系统时间 */
  const serverTime = computed<string>(() =>
    isChildApp.value
      ? mainApp.value.$store.getters.serverTime
      : useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
  )

  return {
    /** 当前系统时间 */
    serverTime
  }
}
