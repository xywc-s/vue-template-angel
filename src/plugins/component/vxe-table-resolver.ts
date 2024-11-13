import { kebabCase } from 'lodash-es'
import type { ComponentResolver } from 'unplugin-vue-components/types'

export default function VxeTableResolver(options?: any): ComponentResolver[] {
  return [
    {
      type: 'component',
      resolve: (componentName: string) => {
        // where `componentName` is always CapitalCase
        const tableComp = ['grid', 'table', 'column', 'toolbar', 'col-column']
        if (componentName && componentName.indexOf('Vxe') > -1) {
          const name = kebabCase(componentName.slice(3))
          if (tableComp.includes(name)) return null
          return {
            name: componentName,
            from: `vxe-pc-ui/es/${name}`,
            sideEffects: `vxe-pc-ui/es/${name}/style.css`
          }
        }
      }
    }
  ]
}
