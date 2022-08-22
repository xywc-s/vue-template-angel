import i18n from '@/plugins/i18n'
import { breakpointsTailwind, useBreakpoints, useDateFormat, useNow } from '@vueuse/core'
import { defineStore } from 'pinia'
import { unref } from 'vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

export const useApp = defineStore('app', {
  state: () => ({
    isChildApp: Boolean(parent !== self),
    minioPath: import.meta.env.VITE_MINIO_PATH,
    locale: navigator.language,
    loading: null
  }),
  getters: {
    root: (state) => (state.isChildApp ? parent.app : null),
    route() {
      return this.isChildApp ? this.root.$route : app.config.globalProperties.$route
    },
    router() {
      return this.isChildApp ? this.root.$router : app.config.globalProperties.$router
    },
    serverTime() {
      return this.isChildApp
        ? this.root.$store.getters.serverTime
        : unref(useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'))
    },
    language() {
      return this.isChildApp ? this.root.$store.getters.language : this.locale
    },
    device() {
      return breakpoints.smaller('md').value ? 'mobile' : 'desktop'
    },
    isMobile() {
      return breakpoints.isSmaller('md')
    }
  },
  actions: {
    routerPush(options) {
      this.router.push(options)
    },
    updateTag(path, value) {
      if (this.isChildApp) {
        console.log('current route:', this.route)
        this.root.$updateTagTitle(path, value)
      }
    },
    /**
     * TODO: 订阅language， 当改变时， 修改全局语言配置
     */
    setLanguage(lang: string) {
      i18n.global.locale = lang
    },
    isLanguage(lang: string) {
      if (this.language.length >= lang.length) {
        return this.language.toLowerCase().indexOf(lang.toLowerCase()) > -1
      } else {
        return lang.toLowerCase().indexOf(this.language.toLowerCase()) > -1
      }
    }
  }
})
