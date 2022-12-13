import { createI18n } from 'vue-i18n'
import { merge } from 'lodash-es'
import customMessages from '@intlify/vite-plugin-vue-i18n/messages'
import vxeEn from 'vxe-table/es/locale/lang/en-US'
import vxeZh from 'vxe-table/es/locale/lang/zh-CN'
import elementEn from 'element-plus/dist/locale/en.mjs'
import elementZh from 'element-plus/dist/locale/zh-cn.mjs'

const messages = merge(
  {},
  {
    en: {
      ...vxeEn,
      ...elementEn
    },
    zh: {
      ...vxeZh,
      ...elementZh
    }
  },
  customMessages
)

const i18n = createI18n({
  locale: navigator.language,
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  formatFallbackMessages: false,
  messages,
  allowComposition: true,
  globalInjection: true,
  /**
   * 翻译失败时的处理函数
   */
  missing: (locale, key, vm, values) => {}
})

export default i18n
