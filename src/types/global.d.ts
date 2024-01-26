/* eslint no-unused-vars: 0 */
import { PermissionCode, User } from '@angelyeast/model'
import { VueInstance } from '@vueuse/core'
import type { App } from 'vue'

// TODO 放在通用文件内
declare global {
  // TODO 放在通用文件内
  interface JWT extends Pick<User, ['id', 'code', 'email', 'name', 'phone', 'userName']> {
    permissionList: PermissionCode[]
    access_token: string
    refresh_token: string
    token_type: string
    scope: string
    expires_in: number
    jti: string
  }
  interface ParentApp extends VueInstance {
    $store: {
      state: any
      getters: Record<string, unknown> & {
        language: string
        token?: string
        permissionList?: PermissionCode[]
        user: JWT
      }
      [k: string]: any
    }
    $updateTagTitle: (title: string, fullPath?: string) => void
  }
  interface Window {
    app: App | ParentApp
  }
}
