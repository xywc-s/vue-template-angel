import { set, transform } from 'lodash-es'

const rawRenderers = import.meta.glob(['./*.tsx', './*.ts'], {
  eager: true,
  import: 'default'
})
const renderers = transform(
  rawRenderers,
  (newRenderers, renderer, path) => {
    const matchs = path.match(/\w+\.tsx?$/g)
    if (matchs) {
      const rendererName = matchs[0].replace(/\.tsx?/, '')
      set(newRenderers, rendererName, renderer)
    }
  },
  {}
)

export default renderers
