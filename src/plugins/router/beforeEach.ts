import { useDev, usePermission, useToken, useUser } from '@angelyeast/micro-frontend'
import { useAppStore } from '@/stores/app'
import type { NavigationGuardWithThis } from 'vue-router'

const beforeEach: NavigationGuardWithThis<unknown> = async (to, from, next) => {
  if (to.meta.whiteList) return next()

  const isLogin = await useToken().checkLoginState()
  if (!isLogin) {
    useUser().setUser()
    const { hasDevToken, devLogin } = useDev({
      code: import.meta.env.VITE_USER_CODE,
      token: import.meta.env.VITE_USER_TOKEN
    })
    if (!hasDevToken()) {
      // 没有配置开发token, 记录访问路由, 并跳转鉴权地址
      useAppStore().rewrite = to.fullPath
      return next('/')
    }
    // 使用开发配置登录
    await devLogin()
  }

  // 权限路由按条件访问
  if (!usePermission().hasPermission(to?.meta?.permission)) return next('denied')
  return next()
}
export default beforeEach
