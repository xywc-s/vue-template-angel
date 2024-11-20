/**
 * @see https://github.com/unocss/unocss
 * 默认扫描的文件: .jsx, .tsx, .vue, .md, .html, .svelte, .astro
 * .js, .ts 默认不包含（会增加扫描负荷，没太大必要， 主要以扫描html模板为主）
 * 如果确实需要在js或者ts文件内写样式，可在需要的文件顶部添加 @unocss-include 标识, 将文件加入扫描
 */
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
export default () =>
  Unocss({
    presets: [
      presetUno(),
      presetIcons({
        prefix: 'uno-',
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
          'font-size': '1.2em'
        }
      })
    ],
    rules: [
      // 自定义规则
    ],
    shortcuts: {
      // 自定义样式组合
      'description-label': 'w-80px md:w-160px'
    }
  })
