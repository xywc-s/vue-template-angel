<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import { en, zhCn } from 'element-plus/es/locales'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const locale = computed(() => (appStore.isLanguage('en') ? en : zhCn))
</script>
