import AutoImport from 'unplugin-auto-import/vite'
export default () =>
  AutoImport({
    imports: ['vue', '@vueuse/core', 'pinia'],
    ignore: ['useFetch'],
    dts: 'src/types/auto-imports.d.ts'
  })
