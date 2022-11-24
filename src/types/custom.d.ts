import type { RouteRecordRaw } from 'vue-router'
import type { Ref } from 'vue'

export type CustomRoute = RouteRecordRaw & {
  /**
   * 选中状态: 同步该路由
   */
  checked?: boolean
  /**
   * 隐藏状态: 该路由不显示在菜单上
   */
  hidden?: boolean
}

export type FetchLoading = Ref<boolean> | ((b: boolean) => void)
export type FetchOptions<T = any, P = any> = {
  /**
   * 一个返回Promise的接口方法
   */
  fn: (p: P) => Promise<T>
  /**
   * fn的参数
   */
  params?: P
  /**
   * loading状态
   */
  loading?: FetchLoading
  /**
   * 钩子
   */
  hooks?: {
    success: (response: T) => void
  }
}
