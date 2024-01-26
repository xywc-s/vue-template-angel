import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useAppInstance } from '@/stores/app/instance'

// FIXME JWT 类型
const userStorage = useStorage<Partial<JWT>>('user', {})
export function useUser() {
  const { mainApp } = useAppInstance()

  /** 系统当前登录的用户 */
  const user = computed(() => mainApp.value?.$store?.getters?.user ?? userStorage.value)

  function setUser(obj: Partial<JWT>) {
    userStorage.value = obj
  }

  return {
    /** 系统当前登录的用户 */
    user,
    setUser
  }
}
