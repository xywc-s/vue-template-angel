import { cloneDeep, keys } from 'lodash-es'

type PickType<T, K extends keyof T> = T[K]
type PickEntity<T> = {
  [K in keyof T]: PickType<T[K], 'default'>
}

export function generateEntityFromModel<T>(model: T): PickEntity<T> {
  const cloneModel = cloneDeep(model)
  keys(cloneModel).forEach((key) => (cloneModel[key] = cloneModel[key].default))
  return cloneModel
}
