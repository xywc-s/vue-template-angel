import { merge } from 'lodash-es'
import request from './request'
import type { User } from '@/models/user'
import type { AngelRes, Pager } from '@/types/request'

type UserListData = Partial<
  Pager & {
    /**
     * 模糊匹配关键字
     */
    data: string
  }
>
export default class SecurityServer {
  /**
   * @desc: 根据唯一键（id、code、phone、userid）查用户
   */
  static findByUnique = (unique: string) => request.post('/user/findByUnique', { unique })

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
