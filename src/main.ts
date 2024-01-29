import '@unocss/reset/normalize.css'
import 'uno.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { setTable } from '@xywc-s/vxe-table-helper'
import { setServiceConfig } from '@angelyeast/service'
import App from '@/App.vue'
import globalPlugins from '@/plugins/global'
setTable({
  pagerConfig: {
    pageSizeKey: 'rows'
  }
})
setServiceConfig({ baseURL: import.meta.env.VITE_API_MICRO })
setServiceConfig('BFF', { baseURL: import.meta.env.VITE_API_BFF })
const app = createApp(App).use(globalPlugins)
app.mount('#app')
window.app = app
console.log(
  '%c %c %c %c app has mounted! %c %c %c %o',
  'background:#41b883 ; padding: 1px; margin: 0 1px',
  'background:#41b883 ; padding: 1px; margin: 0 1px',
  'background:#41b883 ; padding: 1px; margin: 0 1px',
  'background:#41b883 ; padding: 1px; margin: 0 1px;  color: #fff',
  'background:#41b883 ; padding: 1px; margin: 0 1px',
  'background:#41b883 ; padding: 1px; margin: 0 1px',
  'background:#41b883 ; padding: 1px; margin: 0 1px',
  app
)
