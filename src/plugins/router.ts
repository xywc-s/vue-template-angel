import { createRouter, createWebHashHistory } from 'vue-router'
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'
import { useUser } from '@/stores/user'
import { useApp } from '@/stores/app'
import type { Permission } from '@/types/custom'

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(generatedRoutes)
})

router.beforeEach(async (to, from, next) => {
  const appStore = useApp()
  const userStore = useUser()
  // 不是作为中台子应用打开
  if (!appStore.isChildApp) {
    if (to.path.includes('login')) return next()
    // 当前没登录
    if (!userStore.token) {
      if (userStore.hasDevToken()) {
        // 配置了开发token
        await userStore.devLogin()
      } else {
        // 没配置开发token跳转到登录页登录
        return next({ name: 'login', params: { rewrite: btoa(to.path) } })
      }
    } else {
      // 登录了
      if (!userStore.checkTokenIsValid()) {
        // token过期
        if (userStore.hasDevToken()) {
          // 配置了开发token
          await userStore.devLogin()
        } else {
          // 没配置开发token跳转到登录页登录
          userStore.setUser({})
          return next({ name: 'login', params: { rewrite: btoa(to.path) } })
        }
      }
    }
  } else {
    // 中台内打开应用跳应用登录页, 直接重定向到应用主页
    if (to.path.includes('login')) return next('/')
  }

  if (to.meta.permission) {
    if (userStore.hasPermission(to.meta.permission as Permission)) {
      next()
    } else {
      next('denied')
    }
  } else {
    next()
  }
})

export default router
