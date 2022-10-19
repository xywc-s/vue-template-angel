import { ElLoading, ElMessageBox, ElNotification, notificationTypes } from 'element-plus'
import { isObject, isString, merge } from 'lodash-es'
import { encode } from 'js-base64'
import i18n from '@/plugins/i18n'
import { isWorkWeChat } from '@/utils'
import { useApp } from '@/stores/app'

import type {
  ElMessageBoxOptions,
  LoadingOptionsResolved,
  MessageBoxData,
  NotificationParams
} from 'element-plus'

/**
 * 创建一个在响应失败时会自动取消的loading实例, 也可以通过返回的实例来手动取消loading
 */
export function useLoading(
  options?: Partial<
    Omit<LoadingOptionsResolved, 'target' | 'parent'> & {
      target: string | HTMLElement
      body: boolean
    }
  >
) {
  const loading = ElLoading.service(options)
  // @ts-ignore
  useApp().loading = loading
  return loading
}

/**
 * 创建一个带有默认参数的notify实例, 也可以通过返回的实例来手动取消notify
 * 默认执行过度时间2500ms
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

/**
 * 复用确认对话框
 */
export function useConfirm(
  handle: (data: MessageBoxData) => any,
  errorHandle: (err: any) => any,
  options?: ElMessageBoxOptions
) {
  if (!errorHandle) errorHandle = () => {}
  ElMessageBox.confirm(
    i18n.global.t('Are you sure to delete it?') +
      i18n.global.t('Once deleted, the data cannot be recovered.'),
    i18n.global.t('Tip'),
    {
      confirmButtonText: i18n.global.t('Confirm'),
      cancelButtonText: i18n.global.t('Cancel'),
      type: 'warning',
      ...(options ?? {})
    }
  )
    .then(handle)
    .catch(errorHandle)
}

export function useProgressColors() {
  return [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 50 },
    { color: '#1989fa', percentage: 99.99 },
    { color: '#5cb87a', percentage: 100 }
  ]
}

export const previewFile = (url: string) => {
  const appStore = useApp()
  // 如果是企业微信手机端预览文件则直接打开文件
  if (isWorkWeChat() && appStore.isMobile) {
    window.open(appStore.minioPath + url)
  } else {
    if (/^\/middle\/.*/.test(url)) {
      url = appStore.minioPath + url
    }
    const path =
      import.meta.env.VITE_PREVIEW_URL +
      '/onlinePreview?url=' +
      encodeURIComponent(encode(url)) +
      '&officePreviewType=pdf'
    window.open(path)
  }
}
