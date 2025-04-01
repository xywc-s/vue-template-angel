import { BFF, setServiceConfig } from '@angelyeast/service'
import { setFileServer, setTable } from '@angelyeast/repository'
import VXETable from '@/plugins/vxe-table'
import directives from '@/plugins/directives'
import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import store from '@/stores'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.use(store)
    app.use(i18n)
    app.use(router)
    app.use(VXETable)
    app.use(directives)

    // 后端服务配置
    setServiceConfig({ baseURL: import.meta.env.VITE_API_MICRO })
    BFF.setConfig({ baseURL: import.meta.env.VITE_API_BFF })

    // 云文件服务
    setFileServer({
      filePreviewDomain: import.meta.env.VITE_PREVIEW_URL,
      fileServerDomain: import.meta.env.VITE_MINIO_PATH
    })

    // useTable方法的表格默认值配置
    setTable({
      bottomOffset: 5,
      pagerConfig: {
        pageSizeKey: 'rows'
      }
    })
  }
}
