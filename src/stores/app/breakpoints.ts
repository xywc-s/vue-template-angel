import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

/** 设备断点 */
export function useBreakpoint() {
  /** 当前是否在移动端 */
  const isMobile = computed(() => breakpoints.isSmaller('md'))

  return {
    /** 当前是否在移动端 */
    isMobile
  }
}
