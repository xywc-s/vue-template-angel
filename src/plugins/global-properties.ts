import VueScrollTo from 'vue-scrollto'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    // 添加$scrollTo到全局属性
    app.use(VueScrollTo)
  }
}
