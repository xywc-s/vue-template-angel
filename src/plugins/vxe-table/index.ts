import VXETable, { VXETableConfigOptions } from 'vxe-table'
import { isPlainObject } from 'lodash-es'
import VXETablePluginElement from 'vxe-table-plugin-element'
import i18n from '../i18n'
// import * as components from './component'
// import renderers from './renderer'
import 'xe-utils'
import 'vxe-table/lib/style.css'
// import 'vxe-table/styles/cssvar.scss'
import 'vxe-table-plugin-element/dist/style.css'
import type { Plugin } from 'vue'

// VXETable.renderer.mixin(renderers)

VXETable.config({
  /** 组件内置文本国际化 */
  i18n: (key, args) => i18n.global.t(key, args),
  /** 全局自动翻译(使用组件时自定义的文本) */
  translate: (key, args) => i18n.global.t(key, args)
})

// 自定义渲染器
// VXETable.renderer.mixin(renderers)
// console.log('可用的渲染器:', renderers)

// ElementPlus渲染器
VXETable.use(VXETablePluginElement)

// console.log('renderer:', VXETable.version, VXETable.renderer)
const useVxeTable: Plugin<VXETableConfigOptions[]> = {
  install: (app, options) => {
    if (isPlainObject(options)) {
      VXETable.config(options)
    }
    app.use(VXETable)

    // Object.values(components).forEach(function (component) {
    //   return component.install(app)
    // })
  }
}
export default useVxeTable
