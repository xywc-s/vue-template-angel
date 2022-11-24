import { ElLoading } from 'element-plus'
import { useApp } from '@/stores/app'
import type { LoadingOptionsResolved } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'target' | 'parent'> & {
    target: string | HTMLElement
    body: boolean
  }
>

/**
 * 创建一个在响应失败时会自动取消的loading实例, 也可以通过返回的实例来手动取消loading
 * @param options loading选项
 * @returns {LoadingInstance} loading实例
 */
export function useLoading(options?: LoadingOptions): LoadingInstance {
  const loading = ElLoading.service(options)
  useApp().loading = loading
  return loading
}
