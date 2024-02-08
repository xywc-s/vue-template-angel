/* eslint no-unused-vars: 0 */
import { MiddleApp } from '@angelyeast/model'
import type { App } from 'vue'

declare global {
  interface Window {
    app: App | MiddleApp
  }
}
