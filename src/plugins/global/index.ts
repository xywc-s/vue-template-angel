import VueScrollTo from 'vue-scrollto'
import { setTable } from '@xywc-s/vxe-table-helper'
import VXETable from '@/plugins/vxe-table'
import directives from '@/plugins/directives'
import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import store from '@/stores'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    // vue插件
    app.use(store)
    app.use(i18n)
    app.use(router)
    app.use(VXETable)
    app.use(directives)

    // 添加$scrollTo到全局属性
    app.use(VueScrollTo)

    setTable({
      pagerConfig: {
        pageSizeKey: 'rows'
      }
    })
  }
}
