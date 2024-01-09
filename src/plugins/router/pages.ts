/**
 * @see https://github.com/posva/unplugin-vue-router
 */
import path from 'path'
import { cwd } from 'process'
import { getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { kebabCase, pascalCase } from 'change-case'
import { syncBlackList } from './config'
const syncBlackListPascalCase = syncBlackList.map((path) => pascalCase(path))
// eslint-disable-next-line no-undef
export default (env: ImportMetaEnv) =>
  VueRouter({
    dts: path.resolve(cwd(), 'src/types/router.d.ts'),
    exclude: ['**/components/**/*.vue'],
    routeBlockLang: 'yaml',
    importMode: (filepath) => (filepath.includes('login') ? 'sync' : 'async'),
    getRouteName: (routeNode) => {
      // 检查配置是否需要自动重命名路由名称
      if (!env.VITE_ROUTE_AUTO_PREFIX) return routeNode

      // 只为需要同步的路由重命名, 自动增加项目名称前缀
      const routeName = getPascalCaseRouteName(routeNode)
      if (syncBlackListPascalCase.includes(routeName)) return routeNode
      return kebabCase(env.VITE_APP_NAME + routeName)
    }
  })
