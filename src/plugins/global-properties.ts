import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import { envjudge } from '@/utils'
import { useClipboard, useDateFormat } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { encode } from 'js-base64'
import { unref } from 'vue'
import VueScrollTo from 'vue-scrollto'
import i18n from './i18n'

const { copy, copied } = useClipboard()

export default {
  install: (app) => {
    app.config.globalProperties.$dateFormater = (val: string, format = 'YYYY-MM-DD HH:mm:ss') => {
      if (!val) return val
      return unref(useDateFormat(val, format))
    }
    app.config.globalProperties.$previewFile = (url: string) => {
      const appStore = useApp()
      //如果是企业微信手机端预览文件则直接打开文件
      if ('com-wx-mobile' === envjudge()) {
        return window.open(appStore.minioPath + url)
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
    app.config.globalProperties.$hasPermission = (permissions: string | string[]) => {
      return useUser().hasPermission(permissions)
    }
    app.config.globalProperties.$copyText = (text: string) => {
      copy(text)
      ElMessage.success(i18n.global.t('Copy successful'))
    }

    // 添加$scrollTo到全局属性
    app.use(VueScrollTo)
  }
}
