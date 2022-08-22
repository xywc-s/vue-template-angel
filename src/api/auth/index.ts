import { Config, Interceptor } from '@/utils/request/index'
import axios from 'axios'
import { merge } from 'lodash-es'

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
  constructor() {}

  /**
   * @desc: 根据唯一键（id、code、phone、userid）查用户
   */
  static findByUnique = (unique) => request.post('/user/findByUnique', { unique })

  static findUserList = (data = {}) =>
    request.post('/user/findUserList', merge({ page: 1, rows: 10 }, data))

  static findDepartmentAndAllParent = (code) =>
    request.post('/department/findDepartmentAndAllParent', { code })

  /**
   * 鉴权登录
   */
  static login = () =>
    request.post(`/authorization/userCodeLogin?userCode=${import.meta.env.VITE_USER_CODE}`)
}
