import { kebabCase } from 'lodash-es'
import type { ComponentResolver } from 'unplugin-vue-components/types'

export default function VxeTableResolver(options?: any): ComponentResolver[] {
  return [
    {
      type: 'component',
      resolve: (componentName: string) => {
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
    }
  ]
}
