import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import i18n from './i18n'
import { useUser } from '@/stores/user'
import { useApp } from '@/stores/app'

const routeI18n = (route) => {
  if (route?.meta?.title) route.meta.title = i18n.global.t(route.meta.title)
  if (route.children && route.children.length > 0) {
    route.children = Array.from(route.children).map(routeI18n)
  }
  return route
}

const routes = Array.from(setupLayouts(generatedRoutes)).map(routeI18n)
console.log('layouts:', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const appStore = useApp()
  const userStore = useUser()
  if (!appStore.isChildApp && userStore.permissionList.length === 0) {
    await userStore.userLogin()
  }

  if (to.meta.permission) {
    // TODO: 没有权限到404
    if (userStore.hasPermission(to.meta.permission)) {
      next()
    } else {
      next('/404') //404
    }
  } else {
    next()
  }
})

export default router
