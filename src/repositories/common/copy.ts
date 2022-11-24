import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import i18n from '@/plugins/i18n'

const { copy } = useClipboard()

/**
 * 复制内容
 */
export function copyText(text: string) {
  copy(text)
  ElMessage.success(i18n.global.t('Copy successful'))
}
