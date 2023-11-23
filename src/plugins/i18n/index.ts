import { createI18n } from 'vue-i18n'
import messages from './messages'

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
