import { generateEntityFromModel } from '@/models/fn'

export const attachment = {
  createUserCode: {
    name: '用户编号',
    default: ''
  },
  createUserId: {
    name: '用户ID',
    default: ''
  },
  expireDate: {
    name: '过期时间',
    default: ''
  },
  id: {
    name: 'ID',
    default: ''
  },
  location: {
    name: '文件URL',
    default: ''
  },
  name: {
    name: '文件名',
    default: ''
  },
  remark: {
    name: '备注',
    default: ''
  },
  size: {
    name: '文件大小',
    default: ''
  },
  status: {
    name: '文件状态',
    default: '有效'
  },
  suffix: {
    name: '扩展名',
    default: ''
  },
  insertDate: {
    name: '创建时间',
    default: ''
  },
  updateDate: {
    name: '更新时间',
    default: ''
  }
}

const entity = generateEntityFromModel(attachment)
export type Attachment = typeof entity
