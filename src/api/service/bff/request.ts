import axios from 'axios'
import BFFResponseIntercertor from '@/api/interceptors/response/bff'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BFF,
  timeout: 10000
})

request.interceptors.response.use(BFFResponseIntercertor.success, BFFResponseIntercertor.error)

export default request
