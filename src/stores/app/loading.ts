import { ElLoadingService, LoadingOptions } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

export function useLoading(options: LoadingOptions): LoadingInstance {
  return ElLoadingService(options)
}
