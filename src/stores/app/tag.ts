import { useAppInstance } from '@/stores/app/instance'
import { useInstanceRouter } from '@/stores/app/router'

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
   * 清理(主应用中)路由缓存, 主应用再次访问页面时数据会刷新(不会删标签)
   * @param fullPath 路由fullpath, 不传则默认当前路由
   */
  function clearTagCache(fullPath?: string) {
    if (isChildApp.value) {
      mainApp.value.$store.commit(
        'tagsView/DEL_CACHED_CHILD_APP_VIEW',
        fullPath ?? route.value.fullPath
      )
    }
  }

  return {
    updateTag,
    clearTagCache
  }
}
