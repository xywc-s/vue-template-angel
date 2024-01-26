import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { accessWhiteList } from '@/plugins/router/config'
import type { PermissionCode } from '@/models'
import type { NavigationGuardWithThis } from 'vue-router/auto'

const beforeEach: NavigationGuardWithThis<undefined> = async (to, from, next) => {
  const appStore = useAppStore()
  const userStore = useUserStore()
  // 不是作为中台子应用打开
  if (!appStore.isChildApp) {
    console.log('应用路由:', to.fullPath) // LOG
    if (to.name && accessWhiteList.includes(to.name as string)) return next()
    // 当前没登录 或 登录了但是token已过期
    if (!userStore.accessToken || !userStore.checkTokenValid()) {
      userStore.setUser({})
      if (userStore.hasDevToken()) {
        // 配置了开发token
        await userStore.devLogin()
      } else {
        // 没配置开发token跳转鉴权路由
        appStore.rewrite = to.fullPath
        return next('/')
      }
    }
  }

  if (to.meta.permission) {
    if (userStore.hasPermission(to.meta.permission as PermissionCode | PermissionCode[])) {
      next()
    } else {
      next('denied')
    }
  } else {
    next()
  }
}
export default beforeEach
