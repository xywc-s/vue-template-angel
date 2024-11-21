import type { CustomeRouteMeta } from '@angelyeast/types'
import 'vue-router'
export {}

declare module 'vue-router' {
  interface RouteMeta extends CustomeRouteMeta {}
}
