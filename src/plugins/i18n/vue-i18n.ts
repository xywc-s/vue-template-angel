/**
 * @see https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
 */
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
export default () =>
  vueI18n({
    include: path.resolve(__dirname, './lang/*.yaml'),
    defaultSFCLang: 'yaml',
    strictMessage: true,
    escapeHtml: true,
    runtimeOnly: false,
    compositionOnly: false
  })
