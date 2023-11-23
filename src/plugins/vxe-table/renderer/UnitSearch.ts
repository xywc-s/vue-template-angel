import { get, set } from 'lodash-es'
import { h } from 'vue'
import UnitSelect from '@/components/UnitSelect.vue'
import type { RendererOptions } from 'vxe-table'

const renderer: RendererOptions = {
  renderEdit(renderOpts, params) {
    const { props, attrs } = renderOpts
    const { row, column, $table } = params
    return [
      h(UnitSelect, {
        modelValue: get(row, column.field),
        'onUpdate:modelValue': (value) => {
          set(row, column.field, value)
          $table.updateStatus(params)
        },
        placeholder: '搜索并选择',
        filterable: true,
        ...props,
        ...attrs
      })
    ]
  },
  renderCell(renderOpts, params) {
    const { row, column } = params
    const cellValue = get(row, column.field)
    return [h('div', null, cellValue ? `${cellValue.code} | ${cellValue.name}` : '')]
  }
}

export default renderer
