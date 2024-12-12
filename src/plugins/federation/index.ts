import { join } from 'path'
import Federation from '@originjs/vite-plugin-federation'

export default (env: ImportMetaEnv) => {
  return Federation({
    name: 'middle-ui',
    remotes: {
      'middle-ui': join(env.VITE_REMOTE_UI, 'assets/main.js')
    },
    shared: ['vue']
  })
}
