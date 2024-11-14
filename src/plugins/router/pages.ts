/**
 * @see https://github.com/posva/unplugin-vue-router
 */
import path from 'path'
import { cwd } from 'process'
import { kebabCase, pascalCase } from 'change-case'
import VueRouter from 'unplugin-vue-router/vite'
import { syncBlackList, routesLoadSync } from './config'
import type { EditableTreeNode } from 'unplugin-vue-router'

const syncBlackListPascalCase = syncBlackList.map((path) => pascalCase(path))
export default (env: ImportMetaEnv) =>
  VueRouter({
    dts: path.resolve(cwd(), 'src/types/router.d.ts'),
    exclude: ['**/components/**/*.vue'],
    routeBlockLang: 'yaml',
    importMode: (filepath) => (routesLoadSync.includes(filepath) ? 'sync' : 'async'),
    extendRoute(route) {
      autoRenameRoutes(route, env)
      mergeDefaultMeta(route)
    }
  })

/** 路由名称自动重命名 */
function autoRenameRoutes(route: EditableTreeNode, env: ImportMetaEnv) {
  const routeName = pascalCase(route.name)
  // 检查配置是否需要自动重命名路由名称
  if (!env.VITE_ROUTE_AUTO_PREFIX) return 0
  if (routeName.startsWith(env.VITE_APP_NAME)) return 0
  if (syncBlackListPascalCase.includes(routeName)) route.name = kebabCase(routeName)
  else route.name = kebabCase(env.VITE_APP_NAME + routeName)
}

function mergeDefaultMeta(route: EditableTreeNode) {
  if (!route.meta.order) {
    route.addToMeta({ order: 999 })
  }
}
