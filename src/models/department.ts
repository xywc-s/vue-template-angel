import { generateEntityFromModel } from '@/models/fn'

export const department = {
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
  levelNumber: {
    name: '级别',
    default: 0
  },
  parentCode: {
    name: '上级部门编号',
    default: ''
  }
}

const entity = generateEntityFromModel(department)
export type Department = typeof entity
