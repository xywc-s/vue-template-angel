import { defineConfig, loadEnv } from 'vite'
import CreateHtml from './src/plugins/create-html'
import vueI18n from './src/plugins/i18n/vue-i18n'
import Layouts from './src/plugins/router/layouts'
import Svg from './src/plugins/styles/svg'
import Pages from './src/plugins/router/pages'
import Unocss from './src/plugins/styles/unocss'
import StyleImport from './src/plugins/component/style-import'
import Components from './src/plugins/component/unplugin-components'
import Vue from './src/plugins/vue'
import AutoImport from './src/plugins/auto-import'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { mode } = config
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
      CreateHtml({ env, ...config }),
      AutoImport()
    ],
    resolve: {
      alias: {
        '@': '/src',
        '@@': '/src/pages',
        '@#': '/src/components',
        '@$': '/src/assets'
      }
    },
    base: './',
    server: {
      port: env.VITE_DEV_PORT as unknown as number
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            // 第三方库单独打包
            'vxe-table': ['vxe-table', 'vxe-pc-ui', '@vxe-ui/plugin-render-element'],
            'element-plus': ['element-plus'],
            utils: ['change-case', 'lodash-es'],
            // angelyeast: ['@angelyeast/model', '@angelyeast/service', '@angelyeast/repository'],
            // 不支持tree-shaking 的运行时依赖包或库, 单独打包提高hash缓存使用率
            dayjs: ['dayjs'],
            axios: ['axios'],
            'js-base64': ['js-base64']
          }
        }
      }
    }
  }
})
