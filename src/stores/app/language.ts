import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import i18n from '@/plugins/i18n'
import { useAppInstance } from '@/stores/app/instance'

/** 系统可指定的语言 */
type Language = 'zh' | 'en'
const languageStorage = useStorage('language', navigator.language)

export const useLanguage = () => {
  const { isChildApp, mainApp } = useAppInstance()

  /** 当前系统语言 */
  const language = computed(() =>
    isChildApp.value ? mainApp.value.$store.getters.language : languageStorage.value
  )

  /**
   * 断言当前语言环境
   * @param lang 断言的语言值
   * @example 'zh-CN','zh','en'...
   */
  function isLanguage(lang: string) {
    if (language.value.length >= lang.length) {
      return language.value.toLowerCase().indexOf(lang.toLowerCase()) > -1
    } else {
      return lang.toLowerCase().indexOf(language.value.toLowerCase()) > -1
    }
  }

  /** 修改全局语言 */
  function setLanguage(lang: Language) {
    languageStorage.value = lang
    i18n.global.locale.value = lang
    // 组件库和其他需要多语言配置的相关设置
  }

  return {
    language,
    isLanguage,
    setLanguage
  }
}
