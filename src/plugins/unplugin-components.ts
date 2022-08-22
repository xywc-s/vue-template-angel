/**
 * @see https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// const VxeTableResolver = (componentName) => {
//   // where `componentName` is always CapitalCase
//   console.log('componentName:', componentName);
//   if (componentName && componentName.indexOf('Vxe') > -1) {
//     const name = componentName.slice(3)
//     return {
//       name,
//       from: `vxe-table/es/${name.toLowerCase()}`,
//       sideEffects: `vxe-table/es/${name.toLowerCase()}/style.css`
//     }
//   }
// }

export default Components({
  dts: './src/types/components.d.ts',
  types: [
    {
      from: 'vue-router',
      names: ['RouterLink', 'RouterView']
    }
  ],
  resolvers: [ElementPlusResolver()]
})
