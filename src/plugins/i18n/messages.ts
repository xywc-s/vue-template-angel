import customMessages from '@intlify/unplugin-vue-i18n/messages'
import { merge } from 'lodash-es'

import elementEn from 'element-plus/es/locale/lang/en'
import vxeTableEn from 'vxe-table/es/locale/lang/en-US'
import VxeUIEn from 'vxe-pc-ui/es/language/en-US'

import elementZh from 'element-plus/es/locale/lang/zh-cn'
import vxeTableZh from 'vxe-table/es/locale/lang/zh-CN'
import VxeUIZh from 'vxe-pc-ui/es/language/zh-CN'

export default merge(
  {},
  {
    en: {
      ...vxeTableEn,
      ...VxeUIEn,
      ...elementEn
    },
    zh: {
      ...vxeTableZh,
      ...VxeUIZh,
      ...elementZh
    }
  },
  customMessages
)
