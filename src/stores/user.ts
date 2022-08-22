import Auth from '@/api/auth'
import { isArray, isString } from 'lodash-es'
import { defineStore } from 'pinia'
import { useApp } from './app'

export const useUser = defineStore('user', {
  state: () => ({
    dev_token: import.meta.env.VITE_USER_TOKEN,
    dev_user: {},
    permissions: []
  }),
  getters: {
    user(state) {
      return useApp().root?.$store?.getters?.user ?? state.dev_user
    },
    token(state) {
      return useApp().root?.$store?.getters?.token ?? state.dev_token
    },
    permissionList(state): any[] {
      return useApp().root?.$store?.getters?.permissionList ?? state.permissions
    }
  },
  actions: {
    async userLogin() {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        this.dev_user = user
        this.dev_token = user.access_token
        this.permissions = user.permissionList
      } else {
        const { object } = await Auth.login()
        if (object) {
          const user = JSON.parse(object)
          this.dev_user = user
          this.dev_token = user.access_token
          this.permissions = user.permissionList
        }
      }
    },
    hasPermission(permission: string | string[]) {
      if (isString(permission)) return this.permissionList.includes(permission)
      if (isArray(permission)) return this.permissionList.some((v) => permission.includes(v))
      return false
    }
  }
})
