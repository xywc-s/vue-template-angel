import { breakpointsTailwind, useBreakpoints, useDateFormat, useNow } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import i18n from '@/plugins/i18n'
import type { parentApp } from '@/types/global'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const breakpoints = useBreakpoints(breakpointsTailwind)
export const useApp = defineStore('app', () => {
  const minioPath = import.meta.env.VITE_MINIO_PATH
  const locale = ref(navigator.language)
  const isChildApp = ref(Boolean(parent !== self))
  const loading = ref<LoadingInstance | boolean | null>(null)

  const rootInstance = computed(() => parent.app as parentApp)
  const currentInstance = computed(() => window.app)
  const route = computed(() =>
    isChildApp.value
      ? rootInstance.value.$route
      : currentInstance.value.config.globalProperties.$route
  )
  const router = computed(() =>
    isChildApp.value
      ? rootInstance.value.$router
      : currentInstance.value.config.globalProperties.$router
  )
  const serverTime = computed(() =>
    isChildApp.value
      ? rootInstance.value.$store.getters.serverTime
      : useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
  )
  const language = computed(() =>
    isChildApp.value ? rootInstance.value.$store.getters.language : locale.value
  )
  const isMobile = computed(() => breakpoints.isSmaller('md'))

  function updateTag(path: string, value: string) {
    if (isChildApp.value) rootInstance.value.$updateTagTitle(path, value)
  }
  /**
   * TODO: 订阅language， 当改变时， 修改全局语言配置
   */
  function setLanguage(lang: string) {
    i18n.global.locale = lang
  }
  function isLanguage(lang: string): boolean {
    if (language.value.length >= lang.length) {
      return language.value.toLowerCase().indexOf(lang.toLowerCase()) > -1
    } else {
      return lang.toLowerCase().indexOf(language.value.toLowerCase()) > -1
    }
  }

  return {
    isChildApp,
    minioPath,
    loading,
    rootInstance,
    route,
    router,
    serverTime,
    isMobile,
    updateTag,
    setLanguage,
    isLanguage
  }
})
