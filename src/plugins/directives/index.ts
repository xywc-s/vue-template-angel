// 需要全局注册的指令
import { vLoading } from 'element-plus'
import type { Plugin } from 'vue'

const useDirective: Plugin = {
  install(app) {
    app.directive('loading', vLoading)
  }
}
export default useDirective
