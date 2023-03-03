/* eslint no-unused-vars: 0 */
import { VueInstance } from '@vueuse/core'
import type { App } from 'vue'
interface parentApp extends VueInstance {
  $store: {
    state: any
    getters: Record<string, any>
    [k: string]: any
  }
  $updateTagTitle: (title: string, fullPath?: string) => void
}

declare global {
  interface Window {
    app: App
  }
}
