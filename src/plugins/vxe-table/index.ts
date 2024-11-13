import VXETable, { VxeGlobalConfig } from 'vxe-table'
import { VxeUI, VxePager } from 'vxe-pc-ui'
import { isPlainObject } from 'lodash-es'
import i18n from '../i18n'
import 'vxe-table/lib/style.css'
import 'vxe-pc-ui/lib/style.css'
import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element'
import '@vxe-ui/plugin-render-element/dist/style.css'
import type { Plugin } from 'vue'

const useVxeTable: Plugin<VxeGlobalConfig[]> = {
  install: (app, options) => {
    VXETable.setConfig({
      /** 组件内置文本国际化 */
      i18n: (key, args) => i18n.global.t(key, args),
      /** 全局自动翻译(使用组件时自定义的文本) */
      translate: (key, args) => i18n.global.t(key, args)
    })

    VxeUI.setConfig({
      i18n: (key, args) => i18n.global.t(key, args),
      /** 全局自动翻译(使用组件时自定义的文本) */
      translate: (key, args) => i18n.global.t(key, args)
    })

    if (isPlainObject(options)) {
      VXETable.setConfig(options)
    }

    // ElementPlus渲染器
    VXETable.use(VxeUIPluginRenderElement)
    VxeUI.component(VxePager)
    app.use(VXETable)
  }
}
export default useVxeTable
