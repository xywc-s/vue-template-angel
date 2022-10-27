import VXETable from 'vxe-table'
import i18n from './i18n'
import 'vxe-table/lib/style.css'
import 'xe-utils'

VXETable.setup({
  i18n: (key, args) => i18n.global.t(key, args),
  translate: (key, args) => i18n.global.t(key, args)
})

export default VXETable
