/**
 * @see https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { kebabCase } from 'lodash-es'

const VxeTableResolver = (componentName) => {
  // where `componentName` is always CapitalCase
  if (componentName && componentName.indexOf('Vxe') > -1) {
    const name = kebabCase(componentName.slice(3))
    return {
      name: componentName,
      from: `vxe-table/es/${name}`,
      sideEffects: `vxe-table/es/${name}/style.css`
    }
  }
}

export default () =>
  Components({
    dts: './src/types/components.d.ts',
    types: [
      {
        from: 'vue-router/auto',
        names: ['RouterLink', 'RouterView']
      }
    ],
    resolvers: [
      ElementPlusResolver(),
      {
        type: 'component',
        resolve: VxeTableResolver
      }
    ]
  })
