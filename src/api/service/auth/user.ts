import { merge } from 'lodash-es'
import { json } from '@/api/config'
import request from './request'
import type { User, UserListParams } from '@/models'
import type { AngelResponse } from '@/types/request'

/**
 * @desc: 根据唯一键（id、code、phone、userid）查用户
 */
export const findByUnique = (unique: string) =>
  request.post<unknown, AngelResponse<unknown, User>>('/user/findByUnique', { unique })

/**
 * 通过codes批量查询用户
 * @param codes 要查询的用户编号集合
 */
export const findUserByCodes = (codes: string[]) =>
  request.post<unknown, AngelResponse<User>>('/user/findByCodes', { codes }, json)

/**
 * 查询用户
 */
export const findUserList = (data: UserListParams = {}) =>
  request.post<unknown, AngelResponse<User>>(
    '/user/findUserList',
    merge({ page: 1, rows: 10 }, data)
  )
