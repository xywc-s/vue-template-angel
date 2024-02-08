import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useAppInstance } from '@/stores/app/instance'
import type { JWT } from '@angelyeast/model'

interface User extends Partial<JWT> {
  [k: string]: any
}
const userStorage = useStorage<User>('user', {})
export function useUser() {
  const { mainApp } = useAppInstance()

  /** 系统当前登录的用户 */
  const user = computed(() => mainApp.value?.$store?.getters?.user ?? userStorage.value)

  function setUser(obj: User) {
    userStorage.value = obj
  }

  return {
    /** 系统当前登录的用户 */
    user,
    setUser
  }
}
