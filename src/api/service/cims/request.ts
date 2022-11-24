import axios from 'axios'
import * as Interceptor from '@/api/interceptors'
import * as Config from '@/api/config'
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
export default request
