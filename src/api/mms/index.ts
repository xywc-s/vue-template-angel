import { json } from '@/utils/request/config'
import request from './request'

export class MMS {
  /**
   * 搜索物料
   * @param {*} data
   */
  static searchByCondition = (data = {}) =>
    request.post('/material/searchByCondition', data, { ...json })
}
