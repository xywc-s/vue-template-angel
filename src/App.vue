<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import { en, zhCn } from 'element-plus/es/locales'
import { computed } from 'vue'
import { useLanguage } from '@angelyeast/micro-frontend'

const locale = computed(() => (useLanguage().isLanguage('en') ? en : zhCn))
</script>
