/**
 * @see https://github.com/intlify/vite-plugin-vue-i18n
 */
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'
export default vueI18n({
  include: path.resolve(__dirname, '../i18n/*.yaml'),
  defaultSFCLang: 'yaml',
  runtimeOnly: false
  // compositionOnly: false
})
