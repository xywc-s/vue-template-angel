import customMessages from '@intlify/unplugin-vue-i18n/messages'
import { merge } from 'lodash-es'

import elementEn from 'element-plus/es/locale/lang/en'
import elementZh from 'element-plus/es/locale/lang/zh-cn'
import vxeEn from 'vxe-table/es/locale/lang/en-US'
import vxeZh from 'vxe-table/es/locale/lang/zh-CN'

export default merge(
  {},
  {
    en: {
      ...vxeEn,
      ...elementEn
    },
    zh: {
      ...vxeZh,
      ...elementZh
    }
  },
  customMessages
)
