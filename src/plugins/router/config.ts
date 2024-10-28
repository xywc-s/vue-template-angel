// -------------------------------------------------------------
/** @description 以下部分全部写路由名name, 不要写path */

/** 路由同步黑名单: 不需要同步的路由 */
export const syncBlackList = ['index', 'all', 'route-sync', 'denied']


// -------------------------------------------------------------
/** @description 以下部分全部写path(插件仅支持path), 不要写name */

/** 需要以同步的方式加载的路由 */
export const routesLoadSync = ['/']
