<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import { en, zhCn } from 'element-plus/es/locales'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router/auto'
import { useApp } from '@/stores/app'

console.log('🚀 ~ file: App.vue:15 ~ routes', useRouter().options.routes)

const appStore = useApp()
const locales: Record<string, any> = reactive({
  en,
  zh: zhCn
})

const locale = computed(() => {
  const currentLocale = Object.keys(locales).find((key) => appStore.isLanguage(key))
  return currentLocale ? locales[currentLocale] : 'zh'
})
</script>
