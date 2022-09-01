import { defineConfig, loadEnv } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import CreateHtml from './src/plugins/create-html'
import vueI18n from './src/plugins/i18n-helper'
import Layouts from './src/plugins/router-layouts'
import Pages from './src/plugins/router-pages'
import StyleImport from './src/plugins/style-import'
import Svg from './src/plugins/svg'
import Unocss from './src/plugins/unocss'
import Components from './src/plugins/unplugin-components'
import Vue from './src/plugins/vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const Html = CreateHtml({ env, command, mode })

  return {
    plugins: [
      Vue,
      Layouts,
      Pages,
      Unocss,
      Components,
      StyleImport,
      vueI18n,
      Svg,
      Html,
      vueSetupExtend()
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
      rollupOptions: {
        output: {
          manualChunks: {
            // 不支持 tree-shaking 的运行时依赖包或库, 直接打包到单独的chunk
            'vxe-table': ['vxe-table', 'xe-utils'],
            dayjs: ['dayjs'],
            axios: ['axios'],
            utils: ['js-base64', 'qs', 'mitt']
          }
        }
      }
    }
  }
})
