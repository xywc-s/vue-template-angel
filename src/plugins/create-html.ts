import { createHtmlPlugin } from 'vite-plugin-html'
import type { ConfigEnv } from 'vite'

interface Config extends ConfigEnv {
  // eslint-disable-next-line no-undef
  env: ImportMetaEnv
}

export default (config: Config) => {
  const { env, command } = config
  const base = command === 'serve' ? `http://localhost:${env.VITE_DEV_PORT}/` : './'
  return createHtmlPlugin({
    inject: {
      tags: [
        {
          injectTo: 'body-prepend',
          tag: 'script',
          attrs: {
            type: 'module',
            src: base + 'src/main.ts'
          }
        }
      ]
    }
  })
}
