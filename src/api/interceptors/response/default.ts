import type { AxiosResponse } from 'axios'

export default {
  success: (response: AxiosResponse) => {
    return Promise.resolve(response.data)
  },
  error: (error: any) => {
    return Promise.resolve({
      success: false,
      message: error
    })
  }
}
