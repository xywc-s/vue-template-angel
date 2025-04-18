/**
 * @see https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VxeTableResolver from './vxe-table-resolver'

export default () =>
  Components({
    extensions: ['vue', 'ts'],
    dts: './src/types/components.d.ts',
    deep: false,
    types: [
      {
        from: 'vue-router',
        names: ['RouterLink', 'RouterView']
      }
    ],
    resolvers: [ElementPlusResolver(), VxeTableResolver()]
  })
