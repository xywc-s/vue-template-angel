import axios from 'axios'

/**
 * 开发登录
 */
export const userCodeLoginForDev = () =>
  axios.post(`/authorization/userCodeLogin?userCode=${import.meta.env.VITE_USER_CODE}`, null, {
    baseURL: import.meta.env.VITE_API_SECURITY,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      authorization: import.meta.env.VITE_USER_TOKEN
    }
  })
