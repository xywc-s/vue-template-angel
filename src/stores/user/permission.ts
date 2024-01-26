import { computed } from 'vue'
import { isArray, isString } from 'lodash-es'
import { useAppInstance } from '@/stores/app/instance'
import { useUser } from '@/stores/user/user'
import type { PermissionCode } from '@/models'

// FIXME 更新权限码类型并检查此处
export function usePermission() {
  const { mainApp } = useAppInstance()
  const { user } = useUser()

  const permissionList = computed<PermissionCode[]>(
    () => mainApp.value?.$store?.getters?.permissionList ?? user.value?.permissionList ?? []
  )

  /** 当前用户是否有指定权限 */
  function hasPermission(permission?: PermissionCode | PermissionCode[]) {
    if (!permission) return true
    if (isString(permission)) return permissionList.value.findIndex((v) => permission === v) > -1
    if (isArray(permission)) return permissionList.value.some((v) => permission.includes(v))
    return true
  }

  return {
    permissionList,
    /** 当前用户是否有指定权限 */
    hasPermission
  }
}
