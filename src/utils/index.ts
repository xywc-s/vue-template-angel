import { isEmpty, isNaN, isNil, isObject, isPlainObject, isString, omitBy } from 'lodash-es'

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function uuid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function imageUrlToThumbnail(url, size = 200) {
  var arr = url.split('.')
  var suffix = arr.pop()
  return arr.join('.') + '_thumbnail_' + size + '.' + suffix
}

export function envjudge() {
  var isMobile = window.navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ) // 是否手机端
  var isWx = /micromessenger/i.test(navigator.userAgent) // 是否微信
  var isComWx = /wxwork/i.test(navigator.userAgent) // 是否企业微信

  if (isComWx && isMobile) {
    //手机端企业微信
    return 'com-wx-mobile'
  } else if (isComWx && !isMobile) {
    //PC端企业微信
    return 'com-wx-pc'
  } else if (isWx && isMobile) {
    // 手机端微信
    return 'wx-mobile'
  } else if (isWx && !isMobile) {
    // PC端微信
    return 'wx-pc'
  } else {
    return 'other'
  }
}

export function generateHandsontableKey(pKey, days) {
  //生成指定长度的随机16进制码
  var g = function (len, s) {
    s = s || ''
    var rev = []
    for (var i = s.length; i < len; i++) {
      rev.push(Math.floor(Math.random() * 16).toString(16))
    }
    return s + rev.join('')
  }

  //校验Key中指定区间字符串，并生成校验码替换
  var e = function (str, s, len, vlen) {
    var j = '00'
    var j2 = parseInt(j, 16).toString()
    var j3 = parseInt(str.substr(s, len), 16) + j2.padStart(2, '0')
    var j4 = parseInt(j3, 10)
    var key = (97 - (j4 % 97) + 1).toString(16).padStart(2, '0')
    var rev = str.substr(0, len + s) + key + str.substr(s + len + vlen)
    return rev
  }

  //注册天数
  days = days || 10
  pKey = pKey && pKey.replace(/-/g, '')
  if (!pKey || pKey.length !== 25) {
    pKey = g(25)
  }

  //生成days天有效期
  var p = parseInt(pKey.substr(1, 1), 16) //时间变量（随机）
  var dayKey = ((p || 9) * (days + Math.floor(Date.now() / 8.64e7))).toString(16).padStart(5, 0) //days*p 得出key
  var pKey = pKey.substr(0, 18) + dayKey + pKey.substr(23) //替换Key

  //'\x42\x3C\x48\x34\x50\x2B';//"B<H4P+"; [1,-5,7,-13,15,-22]
  var i = [1, -5, 7, -13, 15, -22]

  pKey = e(pKey, 0, 6, 2) //生成0-5位的校验码，并替换6-7位
  pKey = e(pKey, 6, 8, 2) //生成6-14位的校验码，并替换14-15位
  pKey = e(pKey, 14, 9, 2) //生成14-23位校验码，并替换23-24位

  return [
    pKey.substr(0, 5),
    pKey.substr(5, 5),
    pKey.substr(10, 5),
    pKey.substr(15, 5),
    pKey.substr(20, 5)
  ].join('-')
}

export function validParams(params) {
  if (!isPlainObject(params)) return params
  return omitBy(params, (value) => {
    if (isNil(value)) return true
    if (isNaN(value)) return true
    if (isObject(value) && isEmpty(value)) return true
    if (isString(value) && !value) return true
    return false
  })
}
