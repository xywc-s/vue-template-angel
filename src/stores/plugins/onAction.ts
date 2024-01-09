import { PiniaPluginContext } from 'pinia'

export default ({ store }: PiniaPluginContext) => {
  store.$onAction(({ name, onError, after }) => {
    onError((error) => {
      console.warn(`Failed "${store.$id}.${name}" \nError: ${error}. \n ${store}`)
    })
  }, true)
}
