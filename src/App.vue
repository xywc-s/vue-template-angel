<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed, getCurrentInstance, reactive } from 'vue'
import { useApp } from '@/stores/app'
import { ElConfigProvider } from 'element-plus'
import { en, zhCn } from 'element-plus/lib/locales'
const { proxy } = getCurrentInstance()
const appStore = useApp()
const locales = reactive({
  en,
  zh: zhCn
})
const locale = computed(() => {
  return locales[Object.keys(locales).find((key) => appStore.isLanguage(key))]
})

console.log('proxy:', proxy)
console.log('app:', app)
console.log('store:', proxy.$pinia)
</script>

<style>
.vxe-grid--pager-wrapper {
  margin-top: 10px;
}
</style>
