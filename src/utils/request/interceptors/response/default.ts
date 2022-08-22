import type { AxiosResponse } from 'axios'

export default {
  success: (response: AxiosResponse) => {
    return Promise.resolve(response.data)
  },
  error: (error) => {
    console.log('response error', error)
    return Promise.resolve({
      success: false,
      message: error
    })
  }
}
