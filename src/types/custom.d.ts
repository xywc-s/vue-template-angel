/* eslint-disable no-unused-vars */
import type { _RouteRecordBase, RouteMeta } from 'vue-router'
import type { CustomRoute, CustomeRouteMeta } from '@angelyeast/types'
import 'vue-router'
export {}

declare module 'vue-router' {
  interface RouteMeta extends CustomeRouteMeta {
    title: string
  }
  interface _RouteRecordBase extends CustomRoute {}
}
