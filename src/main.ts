import '@unocss/reset/normalize.css'
import 'uno.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from '@/App.vue'
import globalPlugins from '@/plugins/global'

const app = createApp(App).use(globalPlugins)
app.mount('#app')
window.app = app
console.log('app:', app)
