// @unocss-include
import { get } from 'lodash-es'
import { h, SetupContext } from 'vue'
import { VxeButton, VxeButtonProps, VxeButtonEmits, type VxeButtonEventProps } from 'vxe-pc-ui'

type ButtonType =
  | 'add'
  | 'view'
  | 'delete'
  | 'edit'
  | 'search'
  | 'reset'
  | 'save'
  | 'submit'
  | 'cancel'
  | 'sync'
  | 'upload'
  | 'download'
  | 'export'

type Presets =
  | Record<ButtonType, VxeButtonProps & VxeButtonEventProps>
  | Record<string, VxeButtonProps & VxeButtonEventProps>
type Props = VxeButtonProps &
  VxeButtonEventProps & {
    /** 预设（包含一系列默认值） */
    preset?: ButtonType
  }

const CommonPorps: Props = {
  status: 'primary'
}

export const ButtonPresets: Presets = {
  view: {
    ...CommonPorps,
    content: '查看',
    mode: 'text',
    icon: 'uno-ep-view'
  },
  add: {
    ...CommonPorps,
    size: 'medium',
    content: '添加',
    icon: 'uno-ep-plus'
  },
  edit: {
    ...CommonPorps,
    mode: 'text',
    content: '编辑',
    icon: 'uno-ep-edit'
  },
  delete: {
    ...CommonPorps,
    mode: 'text',
    content: '删除',
    status: 'danger',
    icon: 'uno-ep-delete'
  },
  submit: {
    ...CommonPorps,
    content: '提交',
    status: 'success',
    icon: 'uno-ep-check'
  },
  save: {
    ...CommonPorps,
    status: 'primary',
    content: '保存',
    icon: 'uno-ep-circle-check'
  },
  search: {
    ...CommonPorps,
    status: '',
    content: '搜索',
    icon: 'uno-ep-search'
  },
  reset: {
    ...CommonPorps,
    content: '重置',
    status: 'danger',
    icon: 'uno-ep-refresh'
  },
  cancel: {
    ...CommonPorps,
    content: '取消',
    status: '',
    icon: 'uno-ep-close'
  },
  sync: {
    ...CommonPorps,
    content: '同步',
    status: 'success',
    icon: 'uno-ep-refresh'
  },
  upload: {
    ...CommonPorps,
    content: '上传',
    status: 'success',
    icon: 'uno-ep-upload'
  },
  download: {
    ...CommonPorps,
    content: '下载',
    status: 'success',
    icon: 'uno-ep-download'
  },
  export: {
    ...CommonPorps,
    content: '导出',
    status: 'warning',
    icon: 'uno-ep-download'
  }
}

export default (props: Props, ctx?: SetupContext<VxeButtonEmits>) => {
  const _props =
    props.preset && get(ButtonPresets, props.preset, null)
      ? { ...ButtonPresets[props.preset], ...props }
      : { ...props }
  return h(VxeButton, _props, ctx?.slots)
}
