<template>
  <el-container>
    <el-header v-if="!isChildApp" height="auto" class="!px-0 z-10">
      <LayoutHeader></LayoutHeader>
    </el-header>
    <el-main ref="mainEl" :class="['main-box', '!pa-0']">
      <ElScrollbar :max-height="styles.maxScrollHeight" :wrap-class="['px-16px']">
        <router-view></router-view>
      </ElScrollbar>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { useAppInstance } from '@angelyeast/micro-frontend'
import LayoutHeader from '@/layouts/components/Header.vue'
defineOptions({
  name: 'Layout'
})
const { isChildApp } = useAppInstance()
const mainEl = ref()

const styles = reactive({
  mainBoxHeight: '0',
  maxScrollHeight: 0
})
const { top } = useElementBounding(mainEl, { windowScroll: false })

function resetMainBoxHeight() {
  styles.mainBoxHeight = document.documentElement.clientHeight - top.value + 'px'
  styles.maxScrollHeight = document.documentElement.clientHeight - top.value
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
