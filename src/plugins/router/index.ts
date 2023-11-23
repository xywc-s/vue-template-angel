import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import beforeEach from './beforeEach'

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes)
})

router.beforeEach(beforeEach)

export default router
