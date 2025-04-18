<template>
  <ElConfigProvider :locale="locale">
    <router-view v-slot="{ Component, route }">
      <component :is="layouts[route.meta.layout ?? layout]">
        <component :is="Component" :key="route.fullPath" />
      </component>
    </router-view>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import { en, zhCn } from 'element-plus/es/locales'
import { computed } from 'vue'
import { useLanguage } from '@angelyeast/micro-frontend'
import { useAppStore } from '@/stores/app'
import FloatMenus from '@/layouts/float-menus.vue'
import Blank from '@/layouts/blank.vue'

const layouts = {
  [FloatMenus.name as string]: FloatMenus,
  [Blank.name as string]: Blank
}

const { layout } = storeToRefs(useAppStore())
const locale = computed(() => (useLanguage().isLanguage('en') ? en : zhCn))
</script>
