import { computed } from 'vue'
import { decode } from 'js-base64'
import dayjs from 'dayjs'
import { useAppInstance } from '@/stores/app/instance'
import { useUser } from '@/stores/user/user'
import { userCodeLoginForDev } from '@/api/service/dev'
import { useNotify } from '@/repositories'

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
    // FIXME 客户端时间进行判断不准确, 需要替换成服务器时间
    return exp ? dayjs.unix(exp).isAfter(dayjs()) : false
  }

  /** 是否配置了开发token */
  function hasDevToken() {
    return Boolean(import.meta.env.VITE_USER_TOKEN && import.meta.env.VITE_USER_CODE)
  }

  /** 使用开发token登录 */
  async function devLogin() {
    // FIXME userCodeLoginForDev替换成通用包接口
    const { data } = await userCodeLoginForDev()
    if (data.object) setUser(JSON.parse(data.object))
    else useNotify(data.message, 'error')
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
