// !important: 全部写路由名, 不要写path

/** 路由同步黑名单: 不需要同步的路由 */
export const syncBlackList = ['login', 'index', 'all', 'route-sync', 'denied']

/** 路由访问白名单: 无需鉴权即可直接访问的路由 */
export const accessWhiteList = ['index', 'all', 'denied']
