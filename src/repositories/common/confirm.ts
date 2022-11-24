import { ElMessageBox } from 'element-plus'
import i18n from '@/plugins/i18n'

import type { ElMessageBoxOptions, MessageBoxData } from 'element-plus'

/**
 * 确认对话框
 * @param handle 确认后的处理函数
 * @param options 选项
 */
export function useConfirm(handle: (data: MessageBoxData) => any, options?: ElMessageBoxOptions) {
  let errorHandle = () => {}
  if (options?.callback) errorHandle = options.callback
  ElMessageBox.confirm(
    i18n.global.t('Are you sure to delete it?') +
      i18n.global.t('Once deleted, the data cannot be recovered.'),
    i18n.global.t('Tip'),
    {
      confirmButtonText: i18n.global.t('Confirm'),
      cancelButtonText: i18n.global.t('Cancel'),
      type: 'warning',
      ...(options ?? {})
    }
  )
    .then(handle)
    .catch(errorHandle)
}
