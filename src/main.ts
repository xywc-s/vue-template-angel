import '@unocss/reset/normalize.css'
import 'uno.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from '@/App.vue'
import VXETable from '@/plugins/vxe-table'
import directives from '@/plugins/directives'
import globalProperties from '@/plugins/global-properties'
import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import store from '@/stores'

const app = createApp(App)
app.use(store)
app.use(i18n)
app.use(router)
app.use(VXETable)
app.use(globalProperties)
app.use(directives)
app.mount('#app')
window.app = app
console.log('app:', app)
