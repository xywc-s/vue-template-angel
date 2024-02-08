import { computed } from 'vue'
import { useAppInstance } from '@/stores/app/instance'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router/auto'

export const useInstanceRouter = () => {
  const { app, isChildApp, mainApp } = useAppInstance()
  const route = computed(() =>
    isChildApp.value
      ? (mainApp.value.$route as RouteLocationNormalizedLoaded)
      : app.value.config.globalProperties.$route
  )

  const router = computed(() =>
    isChildApp.value ? (mainApp.value.$router as Router) : app.value.config.globalProperties.$router
  )

  return {
    route,
    router
  }
}
