import { createRouter, createWebHashHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import beforeEach from './beforeEach'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(beforeEach)

export default router
