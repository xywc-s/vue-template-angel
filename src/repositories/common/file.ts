import { isWorkWechat } from '@xywc-s/utils'
import { encode } from 'js-base64'
import { useApp } from '@/stores/app'

export const previewFile = (url: string) => {
  const appStore = useApp()
  // 如果是企业微信手机端预览文件则直接打开文件
  if (isWorkWechat() && appStore.isMobile) {
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
