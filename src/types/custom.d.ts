import type { RouteRecordRaw, RouteMeta } from 'vue-router/auto'
import type { Ref } from 'vue'

// TODO 放在通用文件内
export type CustomeRouteMeta = RouteMeta & {
  /** 是否显示菜单 */
  visible?: boolean
  /** 是否隐藏菜单 */
  hidden?: boolean
  /** 移动端是否可见 */
  mobile?: boolean
  /** svg图标的name */
  svg?: string
  /** 字符图标集中定义的class名字 */
  icon?: string
  /** 当前路由配置的权限 */
  permission?: string | string[]
}

export type CustomRoute = RouteRecordRaw & {
  /** 选中状态: 同步该路由 */
  checked?: boolean
  /** 隐藏状态: 该路由不显示在菜单上 */
  hidden?: boolean
  /** 元数据 */
  meta?: CustomeRouteMeta
}

export type FetchLoading = Ref<boolean> | ((b: boolean) => void)
export type FetchOptions<T = any, P = any> = {
  /** 一个返回Promise的接口方法 */
  fn: (p: P) => Promise<T>
  /** fn的参数 */
  params?: P
  /** loading状态 */
  loading?: FetchLoading
  /** 钩子 */
  hooks?: {
    success: (response: T) => void
  }
}
