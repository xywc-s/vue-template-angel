import request from './request'
import * as User from './user'
import * as Permission from './permission'
import * as Department from './department'

export class Auth {
  /**
   * 企业微信登录验证
   * @param {string} data.code 企业微信登录code
   */
  static loginWithWeChatCode = (data: { code: string }) =>
    request.post('/authorization/workWeChatApplicationLoginMiddle', data)

  static User = User
  static Permission = Permission
  static Department = Department
}
