import { Config, Interceptor } from '@/utils/request/index'
import axios from 'axios'

const json = Config.json
const request = axios.create({
  baseURL: import.meta.env.VITE_API_MMS,
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
export default class MMS {
  constructor() {}

  /**
   * 搜索物料
   * @param {*} data
   */
  static searchByCondition = (data = {}) =>
    request.post('/material/searchByCondition', data, { ...json })
}
