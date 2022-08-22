import DefaultRequest from './request/default'
import AngelResponse from './response/angel'
import DefaultResponse from './response/default'

export const request = {
  default: DefaultRequest
}

export const response = {
  default: DefaultResponse,
  angel: AngelResponse
}
