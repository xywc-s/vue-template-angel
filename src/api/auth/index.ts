import { merge } from 'lodash-es'
import { json } from '@/utils/request/config'
import request from './request'
import type { User } from '@/models'
import type { AngelRes, Pager } from '@/types/request'

export type UserListData = Partial<
  Pager & {
    /**
     * 模糊匹配关键字
     */
    data: string
  }
>
export class Auth {
  /**
   * @desc: 根据唯一键（id、code、phone、userid）查用户
   */
  static findByUnique = (unique: string) => request.post('/user/findByUnique', { unique })

  /**
   * 通过codes批量查询用户
   * @param codes 要查询的用户编号集合
   */
  static findUserByCodes = (codes: string[]) =>
    request.post<unknown, AngelRes<User>>('/user/findByCodes', { codes }, json)

  /**
   * 查询用户
   */
  static findUserList = (data: UserListData = {}) =>
    request.post<unknown, AngelRes<User>>('/user/findUserList', merge({ page: 1, rows: 10 }, data))

  static findDepartmentAndAllParent = (code: string) =>
    request.post('/department/findDepartmentAndAllParent', { code })

  /**
   * 企业微信登录验证
   * @param {string} data.code 企业微信登录code
   */
  static loginWithWeChatCode = (data: { code: string }) =>
    request.post('/authorization/workWeChatApplicationLoginMiddle', data)
}
