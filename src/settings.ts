import { setTable } from '@xywc-s/vxe-table-helper'
import { setServiceConfig } from '@angelyeast/service'
import { setFileServer } from '@angelyeast/repository'

setTable({
  pagerConfig: {
    pageSizeKey: 'rows'
  }
})
setServiceConfig({ baseURL: import.meta.env.VITE_API_MICRO })
setServiceConfig('BFF', { baseURL: import.meta.env.VITE_API_BFF })

setFileServer({
  filePreviewDomain: import.meta.env.VITE_PREVIEW_URL,
  fileServerDomain: import.meta.env.VITE_MINIO_PATH
})
