<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import { en, zhCn } from 'element-plus/es/locales'
import { computed } from 'vue'
import { useApp } from '@/stores/app'

const appStore = useApp()
const locale = computed(() => (appStore.isLanguage('en') ? en : zhCn))
</script>
