import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element'
import '@vxe-ui/plugin-render-element/dist/style.css'
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'
import { ElInput, ElLink } from 'element-plus'
import { isPlainObject } from 'lodash-es'
import { VxeInput, VxePager } from 'vxe-pc-ui'
import VXETable, { VxeUI, VxeGlobalConfig } from 'vxe-table'
import i18n from '../i18n'
import type { Plugin } from 'vue'

const useVxeTable: Plugin<VxeGlobalConfig[]> = {
  install: (app, options) => {
    VxeUI.setConfig({
      /** 组件内置文本国际化 */
      i18n: (key, args) => i18n.global.t(key, args),
      /** 全局自动翻译(使用组件时自定义的文本) */
      translate: (key, args) => i18n.global.t(key, args),
      size: 'small',
      button: {
        size: 'medium'
      }
    })

    if (isPlainObject(options)) {
      VxeUI.setConfig(options)
    }

    app.component('ElLink', ElLink)
    app.component('ElInput', ElInput)
    app.component('VxeInput', VxeInput)
    // ElementPlus渲染器
    VxeUI.use(VxeUIPluginRenderElement)

    VxeUI.component(VxePager)
    app.use(VXETable)
  }
}
export default useVxeTable
