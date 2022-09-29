import {
  isArray,
  isEmpty,
  isNaN,
  isNil,
  isObject,
  isPlainObject,
  isString,
  omitBy
} from 'lodash-es'

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function uuid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export function isWorkWeChat() {
  return /wxwork/i.test(navigator.userAgent)
}

export function isWeChat() {
  return /micromessenger/i.test(navigator.userAgent)
}

export function validParams(params: Record<string, any>) {
  if (!isPlainObject(params)) return params
  return omitBy(params, (value) => {
    if (isNil(value)) return true
    if (isNaN(value)) return true
    if (isObject(value) && isEmpty(value)) return true
    if (isArray(value) && !value.length) return true
    if (isString(value) && !value) return true
    return false
  })
}
