import { json } from '@/utils/request/config'
import request from './request'
import type { Permission, User } from '@/models'
import type { AngelRes } from '@/types/request'

type RolePermission = Pick<Permission, 'permissionId' | 'permissionName' | 'permissionValue'>

/**
 * 获取角色权限
 * @param {string} roleId 角色id
 */
export const findRolePermissions = (roleId: string) =>
  request.post<unknown, AngelRes<RolePermission>>('/role/findRolePermission', { roleId })

/**
 * 查询用户权限
 * @param userId 用户id
 */
export const findUserPermissions = (userId: string) =>
  request.post<unknown, AngelRes<Permission>>('/permission/getPermissionList', { userId })

/**
 * 更新用户权限
 */
export const updateUserPermissions = (data: {
  /**
   * 用户id
   */
  userId: string
  /**
   * 逗号分隔的权限id
   */
  permissionIds: string
}) => request.post<unknown, AngelRes>('/userPermission/addUserPermissions', data)

type PermissionChecked = {
  id: string
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
/**
 * 查询当前用户是否具备指定权限
 */
export const checkPermissions = (data: {
  /**
   * 用户编号集合
   */
  userCodes: string[]
  /**
   * 权限编号集合
   */
  permissionCodes: string[]
}) =>
  request.post<unknown, AngelRes<UserPermissionCheckResult>>(
    '/userPermission/checkUserPermissions',
    data,
    json
  )
