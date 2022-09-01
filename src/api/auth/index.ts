import axios from 'axios'
import { merge } from 'lodash-es'
import { Config, Interceptor } from '@/utils/request/index'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_SECURITY,
  ...Config.common,
  ...Config.form
})
request.interceptors.request.use(
  Interceptor.request.default.success,
  Interceptor.request.default.error
)
request.interceptors.response.use(
  Interceptor.response.default.success,
  Interceptor.response.default.error
)

export default class SecurityServer {
  /**
   * @desc: 根据唯一键（id、code、phone、userid）查用户
   */
  static findByUnique = (unique: string) => request.post('/user/findByUnique', { unique })

  static findUserList = (data = {}) =>
    request.post('/user/findUserList', merge({ page: 1, rows: 10 }, data))

  static findDepartmentAndAllParent = (code: string) =>
    request.post('/department/findDepartmentAndAllParent', { code })

  /**
   * 鉴权登录
   */
  static login = () =>
    axios.post(`/authorization/userCodeLogin?userCode=${import.meta.env.VITE_USER_CODE}`, null, {
      baseURL: import.meta.env.VITE_API_SECURITY,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: import.meta.env.VITE_USER_TOKEN
      }
    })

  /**
   * 企业微信登录验证
   * @param {string} data.code 企业微信登录code
   */
  static loginWithWeChatCode = (data: { code: string }) =>
    request.post('/authorization/workWeChatApplicationLoginMiddle', data)
}
