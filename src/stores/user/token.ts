import { computed } from 'vue'
import { decode } from 'js-base64'
import dayjs from 'dayjs'
import { useService } from '@angelyeast/service'
import { useNotify } from '@angelyeast/repository'
import { useAppInstance } from '@/stores/app/instance'
import { useUser } from '@/stores/user/user'
import { useDate } from '@/stores/app/date'

export function useToken() {
  const { mainApp } = useAppInstance()
  const { user, setUser } = useUser()
  const accessToken = computed(
    () => mainApp.value?.$store?.getters?.token ?? user.value?.access_token
  )

  /** 检查accessToken是否有效 */
  function checkTokenValid() {
    if (!accessToken.value) return false
    const exp = JSON.parse(decode(accessToken.value.split('.')[1])).exp
    return exp ? dayjs.unix(exp).isAfter(useDate().serverTime.value) : false
  }

  /** 是否配置了开发token */
  function hasDevToken() {
    return Boolean(import.meta.env.VITE_USER_TOKEN && import.meta.env.VITE_USER_CODE)
  }

  /** 使用开发token登录 */
  async function devLogin() {
    const { object, message } = await useService('Auth').loginForDev({
      code: import.meta.env.VITE_USER_CODE,
      token: import.meta.env.VITE_USER_TOKEN
    })
    if (object) setUser(JSON.parse(object))
    else useNotify(message, 'error')
  }

  return {
    accessToken,
    /** 检查accessToken是否有效 */
    checkTokenValid,
    /** 是否配置了开发token */
    hasDevToken,
    /** 使用开发token登录 */
    devLogin
  }
}
