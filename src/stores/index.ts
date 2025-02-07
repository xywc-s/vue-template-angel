const store = createPinia()
// plugins
store.use(({ store }) => {
  store.$onAction(({ name, onError, after }) => {
    onError((error) => {
      console.warn(`Failed "${store.$id}.${name}" \nError: ${error}. \n ${store}`)
    })
  }, true)
})
export default store
