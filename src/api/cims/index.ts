import axios from 'axios'
import { Config, Interceptor } from '@/utils/request/index'

const json = Config.json
const request = axios.create({
  baseURL: import.meta.env.VITE_API_CIMS,
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
