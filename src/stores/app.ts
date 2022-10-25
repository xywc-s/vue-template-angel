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

  /**
   * 当前系统时间
   */
  const serverTime = computed<string>(() =>
    isChildApp.value
      ? rootInstance.value.$store.getters.serverTime
      : useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
  )

  /**
   * 当前系统语言
   */
  const language = computed(() =>
    isChildApp.value ? rootInstance.value.$store.getters.language : locale.value
  )

  /**
   * 当前是否在移动端
   */
  const isMobile = computed(() => breakpoints.isSmaller('md'))

  /**
   * 更新主应用中当前路由的标签名
   * @param path 路由fullpath
   * @param value 标题内容
   */
  function updateTag(path: string, value: string) {
    if (isChildApp.value) rootInstance.value.$updateTagTitle(path, value)
  }

  /**
   * 清理(主应用中)当前路由缓存, 主应用再次访问当前页面时数据会刷新(不会删标签)
   */
  function clearTagCache() {
    if (isChildApp.value) {
      rootInstance.value.$store.commit(
        'tagsView/DEL_CACHED_CHILD_APP_VIEW',
        rootInstance.value.$route.fullPath
      )
    }
  }

  /**
   * TODO: 订阅language， 当改变时， 修改全局语言配置
   */
  function setLanguage(lang: string) {
    i18n.global.locale = lang
  }

  /**
   * 断言当前语言环境
   * @param lang 断言的语言值
   */
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
    clearTagCache,
    setLanguage,
    isLanguage
  }
})
