import { createHtmlPlugin } from 'vite-plugin-html'

export default () => {
  return createHtmlPlugin({
    inject: {
      tags: [
        {
          injectTo: 'body-prepend',
          tag: 'script',
          attrs: {
            type: 'module',
            src: 'src/main.ts'
          }
        }
      ]
    }
  })
}
