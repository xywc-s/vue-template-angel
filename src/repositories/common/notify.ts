import { ElNotification, notificationTypes } from 'element-plus'
import { isObject, isString, merge } from 'lodash-es'

import type { NotificationParams } from 'element-plus'

/**
 * 创建一个带有默认参数的notify实例, 也可以通过返回的实例来手动取消notify
 * 默认执行过度时间2500ms
 * @param options 选项
 * @param type 类型
 */
export function useNotify(options: NotificationParams, type?: typeof notificationTypes[number]) {
  const Params = {
    duration: 2500
  }
  if (isString(options)) {
    merge(Params, { message: options })
  } else if (isObject(options)) {
    merge(Params, options)
  }
  if (type) return ElNotification[type](Params)
  else return ElNotification(Params)
}
