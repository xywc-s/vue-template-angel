import { generateEntityFromModel } from '@/models/fn'
import type { Pager } from '@/types/request'

export const user = {
  code: {
    name: '用户编号',
    default: ''
  },
  departmentCode: {
    name: '部门编号',
    default: ''
  },
  departmentId: {
    name: '部门ID',
    default: ''
  },
  departmentName: {
    name: '部门名称',
    default: ''
  },
  email: {
    name: '邮箱',
    default: ''
  },
  id: {
    name: '用户ID',
    default: ''
  },
  name: {
    name: '用户名',
    default: ''
  },
  phone: {
    name: '电话',
    default: ''
  },
  qq: {
    name: 'QQ',
    default: ''
  },
  status: {
    name: '状态',
    default: ''
  },
  thumb_avatar: {
    name: '头像',
    default: ''
  },
  username: {
    name: 'UUID',
    default: ''
  },
  wechatId: {
    name: '微信ID',
    default: ''
  }
}

const entity = generateEntityFromModel(user)
export type User = typeof entity
export type FuzzySearchParams = {
  /**
   * 模糊匹配关键字
   */
  data: string
}
export type UserListParams = Partial<Pager & FuzzySearchParams>
