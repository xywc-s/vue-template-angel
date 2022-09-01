import { breakpointsTailwind, useBreakpoints, useDateFormat, useNow } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import i18n from '@/plugins/i18n'
import app from '@/main'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const breakpoints = useBreakpoints(breakpointsTailwind)
export const useApp = defineStore('app', () => {
  const minioPath = import.meta.env.VITE_MINIO_PATH
  const locale = ref(navigator.language)
  const isChildApp = ref(Boolean(parent !== self))
  const loading = ref<LoadingInstance | null>(null)

  const rootInstance = computed(() => parent.app)
  const route = computed(() =>
    isChildApp.value ? rootInstance.value.$route : app.config.globalProperties.$route
  )
  const router = computed(() =>
    isChildApp.value ? rootInstance.value.$router : app.config.globalProperties.$router
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

// {
//   state: () => ({
//     isChildApp: Boolean(parent !== self),
//     minioPath: import.meta.env.VITE_MINIO_PATH,
//     locale: navigator.language,
//     loading: null
//   }),
//   getters: {
//     rootInstance: (state) => (state.isChildApp ? parent.app : app),
//     route() {
//       return this.isChildApp ? this.rootInstance.$route : app.config.globalProperties.$route
//     },
//     router(state) {
//       return state.isChildApp ? this.rootInstance.$router : app.config.globalProperties.$router
//     },
//     serverTime(state) {
//       return state.isChildApp
//         ? this.rootInstance.$store.getters.serverTime
//         : unref(useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'))
//     },
//     language(): string {
//       return this.isChildApp ? this.rootInstance.$store.getters.language : this.locale
//     },
//     device: () => (breakpoints.smaller('md').value ? 'mobile' : 'desktop'),
//     isMobile: () => breakpoints.isSmaller('md')
//   },
//   actions: {
//     updateTag(path: string, value: string) {
//       if (this.isChildApp) {
//         this.rootInstance.$updateTagTitle(path, value)
//       }
//     },
//     /**
//      * TODO: 订阅language， 当改变时， 修改全局语言配置
//      */
//     setLanguage(lang: string) {
//       i18n.global.locale = lang
//     },
//     isLanguage(lang: string): boolean {
//       if (this.language.length >= lang.length) {
//         return this.language.toLowerCase().indexOf(lang.toLowerCase()) > -1
//       } else {
//         return lang.toLowerCase().indexOf(this.language.toLowerCase()) > -1
//       }
//     }
//   }
// }
