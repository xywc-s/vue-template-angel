import DefaultRequest from './request/default'
import DefaultResponse from './response/default'
import AngelResponse from './response/angel'
import BFFResponse from './response/bff'

export const request = {
  default: DefaultRequest
}

export const response = {
  default: DefaultResponse,
  angel: AngelResponse,
  bff: BFFResponse
}
