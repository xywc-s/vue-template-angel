import { setServiceConfig } from '@angelyeast/service'
import { setFileServer, setTable } from '@angelyeast/repository'

// 后端服务配置
setServiceConfig({ baseURL: import.meta.env.VITE_API_MICRO })
setServiceConfig('BFF', { baseURL: import.meta.env.VITE_API_BFF })

// 云文件服务
setFileServer({
  filePreviewDomain: import.meta.env.VITE_PREVIEW_URL,
  fileServerDomain: import.meta.env.VITE_MINIO_PATH
})

// useTable方法的表格默认值配置
setTable({
  pagerConfig: {
    pageSizeKey: 'rows'
  }
})
