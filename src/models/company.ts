import { generateEntityFromModel } from '@/models/fn'

export const company = {
  id: {
    name: 'ID',
    default: ''
  },
  code: {
    name: '编号',
    default: ''
  },
  name: {
    name: '名称',
    default: ''
  },
  registerAddress: {
    name: '注册地址',
    default: ''
  },
  englishName: {
    name: '英文名称',
    default: ''
  },
  englishRegisterAddress: {
    name: '英文注册地址',
    default: ''
  },
  namePhoneticFull: {
    name: '全拼',
    default: ''
  },
  namePhoneticShort: {
    name: '简拼',
    default: ''
  },
  status: {
    name: '状态',
    default: '正常'
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

const entity = generateEntityFromModel(company)
export type Company = typeof entity
