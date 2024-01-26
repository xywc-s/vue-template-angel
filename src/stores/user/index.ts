import { defineStore } from 'pinia'
import { usePermission } from '@/stores/user/permission'
import { useToken } from '@/stores/user/token'
import { useUser } from '@/stores/user/user'

export const useUserStore = defineStore('user', () => {
  return {
    ...useUser(),
    ...useToken(),
    ...usePermission()
  }
})
