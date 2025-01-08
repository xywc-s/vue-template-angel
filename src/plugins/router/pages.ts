/**
 * @see https://github.com/posva/unplugin-vue-router
 */
import path from 'path'
import { cwd } from 'process'
import { kebabCase, pascalCase } from 'change-case'
import VueRouter from 'unplugin-vue-router/vite'
import type { EditableTreeNode } from 'unplugin-vue-router'

export default (env: ImportMetaEnv) =>
  VueRouter({
    routesFolder: ['src/constants/views', 'src/pages'],
    dts: path.resolve(cwd(), 'src/types/router.d.ts'),
    exclude: ['**/components/**/*.vue'],
    routeBlockLang: 'yaml',
    importMode: (filepath) => (['/'].includes(filepath) ? 'sync' : 'async'),
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
  // 路由名称是否已经是以项目名称开头
  if (routeName.startsWith(pascalCase(env.VITE_APP_NAME))) return 0
  if (!route.meta.sync) route.name = kebabCase(routeName)
  // 需要同步到中台进行代理的路由
  else route.name = kebabCase(env.VITE_APP_NAME + routeName)
}

function mergeDefaultMeta(route: EditableTreeNode) {
  if (!route.meta.order) {
    route.addToMeta({ order: 999 })
  }
}
