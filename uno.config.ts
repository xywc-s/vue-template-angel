/**
 * @see https://github.com/unocss/unocss
 * 默认扫描的文件: .jsx, .tsx, .vue, .md, .html, .svelte, .astro
 * .js, .ts 默认不包含（会增加扫描负荷，没太大必要， 主要以扫描html模板为主）
 * 如果确实需要在js或者ts文件内写样式，可在需要的文件顶部添加 @unocss-include 标识, 将文件加入扫描
 */
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'uno-',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        'font-size': '1em'
      },
      collections: {
        custom: FileSystemIconLoader(resolve(__dirname, 'src/assets/svg'))
      },
      customizations: {
        iconCustomizer(collection, icon, props) {
          if (collection === 'custom') {
            props.width = '1em'
            props.height = '1em'
          }
        }
      }
    })
  ],
  safelist: [...loadSvgs('uno-custom-')],
  rules: [
    // 自定义规则
  ],
  shortcuts: {
    // 自定义样式组合
    'description-label': 'w-80px md:w-160px',
    /** 顶部对齐，两端对齐 */
    'flex-top-between': 'flex items-start justify-between',
    'flex-center': 'flex items-center justify-center',
    'flex-center-between': 'flex items-center justify-between',
    box: 'w-full max-w-1000px mx-auto',
    panel: 'w-full max-w-600px mx-auto'
  }
})

function loadSvgs(prefix) {
  const svgs = readdirSync(resolve(__dirname, 'src/assets/svg'))
  return svgs.map((i) => prefix + i.slice(0, -4))
}
