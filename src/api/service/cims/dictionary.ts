import { json } from '@/api/config'
import request from './request'

/**
 * 所有物料组
 */
export const AllMaterialGroups = () =>
  request.post('/dictionary/getDictionary', { nameCode: 'material-materialGroup' }, { ...json })

/**
 * 所有物料类型
 */
export const AllMaterialTypes = () =>
  request.post('/dictionary/getDictionary', { nameCode: 'material-materialType' }, { ...json })

/**
 * 所有物料单位
 */
export const AllMaterialUnits = () =>
  request.post('/dictionary/getDictionary', { nameCode: 'material-materialUnit' }, { ...json })
