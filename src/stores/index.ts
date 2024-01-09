import { createPinia } from 'pinia'
import onAction from './plugins/onAction'
const store = createPinia()
// plugins
store.use(onAction)
export default store
