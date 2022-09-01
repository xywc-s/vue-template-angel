<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { en, zhCn } from 'element-plus/lib/locales'
import { ElConfigProvider } from 'element-plus'
import { computed, reactive } from 'vue'
import { useApp } from '@/stores/app'

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
