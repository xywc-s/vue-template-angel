<template>
  <VxeButton v-bind="{ ..._props, ...$attrs }">
    <template v-for="slotName in Object.keys($slots)" #[slotName]="slotProps" :key="slotName">
      <slot :name="slotName" v-bind="slotProps || {}"></slot>
    </template>
  </VxeButton>
</template>
<script setup lang="ts">
import { get, omit } from 'lodash-es'
import { mergeProps } from 'vue'
import type { VxeButtonProps } from 'vxe-pc-ui'

defineOptions({ name: 'Btn', inheritAttrs: false })
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

type Presets = Record<ButtonType, VxeButtonProps> | Record<string, VxeButtonProps>
export type ButtonProps = VxeButtonProps & { preset?: ButtonType }
const CommonPorps: VxeButtonProps = {
  status: 'primary'
}
const ButtonPresets: Presets = {
  view: {
    ...CommonPorps,
    content: 'View',
    mode: 'text',
    icon: 'uno-ep-view'
  },
  add: {
    ...CommonPorps,
    size: 'mini',
    content: 'Add',
    icon: 'uno-ep-plus'
  },
  edit: {
    ...CommonPorps,
    mode: 'text',
    content: 'Edit',
    icon: 'uno-ep-edit'
  },
  delete: {
    ...CommonPorps,
    mode: 'text',
    content: 'Delete',
    status: 'danger',
    icon: 'uno-ep-delete'
  },
  submit: {
    ...CommonPorps,
    content: 'Submit',
    status: 'success',
    icon: 'uno-ep-check'
  },
  save: {
    ...CommonPorps,
    status: 'primary',
    content: 'Save',
    icon: 'uno-ep-circle-check'
  },
  search: {
    ...CommonPorps,
    status: '',
    content: 'Search',
    icon: 'uno-ep-search'
  },
  reset: {
    ...CommonPorps,
    content: 'Reset',
    status: 'danger',
    icon: 'uno-ep-refresh'
  },
  cancel: {
    ...CommonPorps,
    content: 'Cancel',
    status: '',
    icon: 'uno-ep-close'
  },
  sync: {
    ...CommonPorps,
    content: 'Sync',
    status: 'success',
    icon: 'uno-ep-refresh'
  },
  upload: {
    ...CommonPorps,
    content: 'Upload',
    status: 'success',
    icon: 'uno-ep-upload'
  },
  download: {
    ...CommonPorps,
    content: 'Download',
    mode: 'text',
    status: 'primary',
    icon: 'uno-ep-download'
  },
  export: {
    ...CommonPorps,
    content: 'Export',
    status: 'warning',
    icon: 'uno-ep-download'
  }
}
const props = defineProps<ButtonProps>()
const _props = computed(() =>
  mergeProps(
    omit(props, 'preset') || {},
    props.preset ? (get(ButtonPresets, props.preset) as unknown as any) : {}
  )
)
</script>
