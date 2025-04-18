<template>
  <ElConfigProvider :locale="locale">
    <FloatMenus>
      <router-view></router-view>
    </FloatMenus>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import { en, zhCn } from 'element-plus/es/locales'
import { computed } from 'vue'
import { useLanguage } from '@angelyeast/micro-frontend'
import FloatMenus from '@/layouts/float-menus.vue'

const locale = computed(() => (useLanguage().isLanguage('en') ? en : zhCn))
</script>
