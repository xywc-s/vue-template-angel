import type { User } from './user'

export type Permission = {
  ascriptionCode: string
  ascriptionId: string
  ascriptionName: string
  permissionId: string
  permissionName: string
  permissionParentId: string
  permissionValue: string
}

export type PermissionCode = string | string[] | undefined

type PermissionChecked = {
  /**
   * 权限id
   */
  id: string
  /**
   * 权限编码
   */
  code: string
}
export type UserPermissionCheckResult = {
  /**
   * 该用户没有的权限
   */
  exclude: PermissionChecked[]
  /**
   * 该用户已有的权限
   */
  include: PermissionChecked[]
  /**
   * 查询的用户
   */
  user: User
}
