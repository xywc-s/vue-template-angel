import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import beforeEach from './beforeEach'

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes)
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(beforeEach)

export default router
