import { VXETable } from 'vxe-table'
import { isPlainObject } from 'lodash-es'
import VXETablePluginElement from 'vxe-table-plugin-element'
import i18n from '../i18n'
// import renderers from './renderer'
import * as components from './component'
import 'xe-utils'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'

// VXETable.renderer.mixin(renderers)

VXETable.setup({
  i18n: (key, args) => i18n.global.t(key, args),
  translate: (key, args) => i18n.global.t(key, args)
})

// 自定义渲染器
// VXETable.renderer.mixin(renderers)
// console.log('可用的渲染器:', renderers)

// ElementPlus渲染器
VXETable.use(VXETablePluginElement)

// console.log('renderer:', VXETable.version, VXETable.renderer)

VXETable.install = (app, options) => {
  if (isPlainObject(options)) {
    VXETable.setup(options)
  }

  Object.values(components).forEach(function (component) {
    return component.install(app)
  })
}

export default VXETable
