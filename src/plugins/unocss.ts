/**
 * @see https://github.com/unocss/unocss
 */
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
export default () =>
  Unocss({
    presets: [
      presetUno(),
      presetIcons({
        prefix: '',
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
          'font-size': '1.2em'
        }
      })
    ],
    rules: [
      // your custom rules
    ],
    shortcuts: {
      operator: 'flex flex-nowrap text-right pl-30px',
      'flex-top-between': 'flex justify-between items-start',
      'description-label': 'w-160px'
    }
  })
