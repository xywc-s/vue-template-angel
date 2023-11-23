/**
 * @see https://github.com/posva/unplugin-vue-router
 */
import path from 'path'
import { cwd } from 'process'
import { getFileBasedRouteName, getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
export default () =>
  VueRouter({
    dts: path.resolve(cwd(), 'src/types/router.d.ts'),
    exclude: ['**/components/**/*.vue'],
    routeBlockLang: 'yaml',
    importMode: (filepath) => (filepath.includes('login') ? 'sync' : 'async'),
    getRouteName: (routeNode) => {
      console.log(
        '🚀 ~ file: pages.ts:16 ~ getFileBasedRouteName:',
        getFileBasedRouteName(routeNode)
      )
      console.log(
        '🚀 ~ file: pages.ts:16 ~ getPascalCaseRouteName:',
        getPascalCaseRouteName(routeNode)
      )
      return routeNode
    }
  })
