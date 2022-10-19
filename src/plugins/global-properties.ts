import { useClipboard, useDateFormat } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { unref } from 'vue'
import VueScrollTo from 'vue-scrollto'
import { useUser } from '@/stores/user'
import i18n from '@/plugins/i18n'
import type { App } from 'vue'

const { copy } = useClipboard()

export default {
  install: (app: App) => {
    app.config.globalProperties.$dateFormater = (val: string, format = 'YYYY-MM-DD HH:mm:ss') => {
      if (!val) return val
      return unref(useDateFormat(val, format))
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
