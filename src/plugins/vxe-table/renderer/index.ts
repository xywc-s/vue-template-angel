import { transform } from 'lodash-es'

const rawRenderers = import.meta.glob(['./*.tsx', './*.ts'], {
  eager: true,
  import: 'default'
})
const renderers = transform(
  rawRenderers,
  (newRenderers, renderer, path) => {
    const rendererName = path.match(/\w+\.tsx?$/g)[0].replace(/\.tsx?/, '')
    newRenderers[rendererName] = renderer
  },
  {}
)

export default renderers
