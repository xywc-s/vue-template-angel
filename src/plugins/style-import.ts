import {
  createStyleImportPlugin,
  VxeTableResolve,
  VantResolve,
  ElementPlusResolve
} from 'vite-plugin-style-import'
export default () =>
  createStyleImportPlugin({
    resolves: [VxeTableResolve(), ElementPlusResolve(), VantResolve()]
  })
