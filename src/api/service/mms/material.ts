import { json } from '@/api/config'
import request from './request'

/**
 * 搜索物料
 * @param {*} data
 */
export const searchByCondition = (data = {}) =>
  request.post('/material/searchByCondition', data, { ...json })
