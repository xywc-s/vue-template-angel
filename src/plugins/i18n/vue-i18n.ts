/**
 * @see https://github.com/intlify/vite-plugin-vue-i18n
 */
import path from 'path'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
export default () =>
  vueI18n({
    include: path.resolve(__dirname, './lang/*.yaml'),
    defaultSFCLang: 'yaml',
    runtimeOnly: false
    // compositionOnly: false
  })
