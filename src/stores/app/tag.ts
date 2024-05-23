import { useAppInstance } from '@/stores/app/instance'
import { useInstanceRouter } from '@/stores/app/router'
type ClearTagOptions = {
  /** 路由fullpath, 不传则默认当前路由 */
  fullPath?: string
  /** 是否清除路由缓存, 默认true */
  clearCache?: boolean
  /** 是否清除路由标签, 默认false */
  clearTag?: boolean
}

/** 主应用标签 */
export const useTag = () => {
  const { isChildApp, mainApp } = useAppInstance()
  const { route } = useInstanceRouter()

  /**
   * 更新主应用中当前路由的标签名
   * @param title 标题内容
   * @param fullPath 路由fullpath, 不传则默认当前路由
   */
  function updateTag(title: string, fullPath?: string) {
    if (isChildApp.value) mainApp.value.$updateTagTitle(fullPath ?? route.value.fullPath, title)
  }

  /**
   * 清理(主应用中)路由的缓存和标签, 主应用再次访问页面时数据会刷新, 缓存和标签均可选择性的清理
   */
  function clearTagCache(options: ClearTagOptions = {}) {
    const { fullPath, clearCache = true, clearTag } = options
    if (isChildApp.value) {
      if (clearCache) {
        mainApp.value.$store.commit(
          'tagsView/DEL_CACHED_CHILD_APP_VIEW',
          fullPath ?? route.value.fullPath
        )
      }
      if (clearTag) {
        mainApp.value.$store.dispatch('tagsView/delView', fullPath ? { fullPath } : route)
      }
    }
  }

  return {
    updateTag,
    clearTagCache
  }
}
