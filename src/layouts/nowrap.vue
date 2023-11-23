<template>
  <el-container>
    <el-header v-if="!appStore.isChildApp" height="auto" class="!px-0 z-10">
      <LayoutHeader></LayoutHeader>
    </el-header>
    <main ref="mainEl" class="main-box">
      <router-view></router-view>
    </main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { useApp } from '@/stores/app'
import LayoutHeader from '@/layouts/components/Header.vue'
defineOptions({
  name: 'NowrapLayout'
})
const appStore = useApp()
const mainEl = ref()

const styles = reactive({
  mainBoxHeight: '0'
})
const { top } = useElementBounding(mainEl, { windowScroll: false })

function resetMainBoxHeight() {
  styles.mainBoxHeight = document.documentElement.clientHeight - top.value + 'px'
}
onMounted(() => {
  resetMainBoxHeight()
  useResizeObserver(mainEl, () => resetMainBoxHeight())
})
</script>

<style scoped>
.main-box {
  height: v-bind('styles.mainBoxHeight');
}
</style>
