// 需要全局注册的指令
import { vLoading } from 'element-plus'

export default {
  install: (app) => {
    app.directive('loading', vLoading)
  }
}
