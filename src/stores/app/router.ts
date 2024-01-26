import { computed } from 'vue'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useAppInstance } from '@/stores/app/instance'

export const useInstanceRouter = () => {
  const { app, isChildApp, mainApp } = useAppInstance()

  const route = computed<RouteLocationNormalizedLoaded>(() =>
    isChildApp.value ? mainApp.value.$route : app.value.config.globalProperties.$route
  )
  const router = computed<Router>(() =>
    isChildApp.value ? mainApp.value.$router : app.value.config.globalProperties.$router
  )

  return {
    route,
    router
  }
}
