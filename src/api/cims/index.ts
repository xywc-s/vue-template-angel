import { json } from '@/utils/request/config'
import request from './request'

export default class CIMS {
  /**
   * 所有物料组
   */
  static AllMaterialGroups = () =>
    request.post('/dictionary/getDictionary', { nameCode: 'material-materialGroup' }, { ...json })

  /**
   * 所有物料类型
   */
  static AllMaterialTypes = () =>
    request.post('/dictionary/getDictionary', { nameCode: 'material-materialType' }, { ...json })

  /**
   * 所有物料单位
   */
  static AllMaterialUnits = () =>
    request.post('/dictionary/getDictionary', { nameCode: 'material-materialUnit' }, { ...json })
}
