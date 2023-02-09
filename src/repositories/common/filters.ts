import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'

/**
 * 查询条件及重置查询
 * @param data 查询条件对象
 */
export function useFilters<T>(data: T): [Ref<UnwrapRef<T>>, () => void] {
  const _clone = cloneDeep(data)
  /**
   * 查询条件对象的ref
   */
  const filters = ref({
    ..._clone
  })
  /**
   * 重置查询条件
   */
  const reset = () => {
    filters.value = {
      ..._clone
    }
  }
  return [filters, reset]
}
