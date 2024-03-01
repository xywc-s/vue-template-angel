import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import beforeEach from './beforeEach'

const router = createRouter({
  history: createWebHashHistory(),
  extendRoutes: (routes) => setupLayouts(routes)
})

router.beforeEach(beforeEach)

export default router
