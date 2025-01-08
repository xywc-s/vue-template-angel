import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import standard from 'eslint-config-standard'
import prettier from 'eslint-config-prettier'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginImport from 'eslint-plugin-import'

export default ts.config(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  // js
  js.configs.recommended,

  // standard
  {
    plugins: {
      n: pluginN,
      import: pluginImport,
      promise: pluginPromise
    },
    rules: standard.rules
  },

  // ts
  ...ts.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': ts.plugin
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends'
        }
      ]
    }
  },

  // vue
  ...vue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    rules: {
      // https://eslint.vuejs.org/rules/ 查看具体规则 0: 关闭, 等价于off
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'error',
      // 组件名必须多个单词
      'vue/multi-word-component-names': 'off',
      // props 必须定义默认值
      'vue/require-default-prop': 'off',
      // props必须定义类型
      'vue/require-prop-types': 'off',
      'vue/no-v-html': 'off',
      // emits函数必须有return
      'vue/return-in-emits-validator': 'off'
    }
  },

  prettier,

  // 自定义（优先级最高）
  {
    rules: {
      'n/no-callback-literal': 'off',
      // ts有校验, 不需要此规则
      // 'no-dupe-class-members': 0,
      // 禁用eslint默认的禁止重复声明, 因为会误报ts的函数重载
      // 'no-redeclare': 0,
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ]
        }
      ]
    }
  }
)
