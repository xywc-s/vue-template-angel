import { defineConfig, loadEnv } from 'vite'
import CreateHtml from './src/plugins/create-html'
import vueI18n from './src/plugins/i18n/vue-i18n'
import Layouts from './src/plugins/router/layouts'
import Pages from './src/plugins/router/pages'
import StyleImport from './src/plugins/style-import'
import Svg from './src/plugins/svg'
import Unocss from './src/plugins/unocss'
import Components from './src/plugins/unplugin-components'
import Vue from './src/plugins/vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      Pages(env),
      Vue(),
      Layouts(),
      Unocss(),
      Components(),
      StyleImport(),
      vueI18n(),
      Svg(),
      CreateHtml({ env, command, mode })
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    base: './',
    server: {
      port: env.VITE_DEV_PORT
      // proxy: {
      //   '/api': {
      //     target: 'http://10.2.17.206:8143',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            // 不支持 tree-shaking 的运行时依赖包或库, 直接打包到单独的chunk
            xeUtils: ['xe-utils'],
            dayjs: ['dayjs'],
            axios: ['axios'],
            jsBase64: ['js-base64']
          }
        }
      }
    }
  }
})
