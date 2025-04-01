import AutoImport from 'unplugin-auto-import/vite'
export default () =>
  AutoImport({
    imports: [
      'vue',
      'vue-i18n',
      '@vueuse/core',
      'pinia',
      {
        dayjs: [['default', 'dayjs']]
      }
    ],
    ignore: ['useFetch', 'usePermission'],
    dts: 'src/types/auto-imports.d.ts'
  })
