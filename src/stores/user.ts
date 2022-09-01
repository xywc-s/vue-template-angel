import { defineStore } from 'pinia'
import { isArray, isString } from 'lodash-es'
import { useStorage } from '@vueuse/core'
import { decode } from 'js-base64'
import dayjs from 'dayjs'
import { computed } from 'vue'
import Auth from '@/api/auth'
import { useNotify } from '@/repositories'
import { useApp } from './app'

const userStorage = useStorage<Record<string, any>>('user', {}, sessionStorage)

export const useUser = defineStore('user', () => {
  const appStore = useApp()
  const user = computed<Record<string, any>>(
    () => appStore.rootInstance?.$store?.getters?.user ?? userStorage.value
  )
  const token = computed<string | undefined>(
    () => appStore.rootInstance?.$store?.getters?.token ?? userStorage.value?.access_token
  )
  const permissionList = computed<[] | string[]>(
    () =>
      appStore.rootInstance?.$store?.getters?.permissionList ??
      userStorage.value?.permissionList ??
      []
  )

  function setUser(obj: Record<string, any>) {
    userStorage.value = obj
  }
  async function devLogin() {
    const { data } = await Auth.login()
    if (data.object) setUser(JSON.parse(data.object))
    else useNotify(data.message, 'error')
  }

  function checkTokenIsValid() {
    const exp = JSON.parse(decode((token.value as string).split('.')[1])).exp
    return exp ? dayjs.unix(exp).isAfter(dayjs()) : false
  }
  function hasDevToken() {
    return Boolean(import.meta.env.VITE_USER_TOKEN && import.meta.env.VITE_USER_CODE)
  }
  function hasPermission(permission: string | string[] | undefined) {
    if (isString(permission)) return permissionList.value.findIndex((v) => permission === v) > -1
    if (isArray(permission)) return permissionList.value.some((v: string) => permission.includes(v))
    return false
  }

  return {
    user,
    token,
    permissionList,
    setUser,
    devLogin,
    checkTokenIsValid,
    hasDevToken,
    hasPermission
  }
})
