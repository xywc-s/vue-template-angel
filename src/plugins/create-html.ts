import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ env, command, mode }) => {
  const base = command === 'serve' ? `http://localhost:${env.VITE_DEV_PORT ?? 5173}/` : './'
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
