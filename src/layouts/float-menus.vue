<template>
  <el-container>
    <MenuBar v-if="showMenus"></MenuBar>
    <el-main ref="mainEl" :class="['main-box', '!pa-0']">
      <ElScrollbar :max-height="styles.maxScrollHeight" :wrap-class="['px-16px']">
        <slot></slot>
      </ElScrollbar>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { useAppInstance } from '@angelyeast/micro-frontend'
import { useRoute } from 'vue-router'
import MenuBar from '@/layouts/components/Menu.vue'

defineOptions({ name: 'FloatMenus' })
const { isChildApp } = useAppInstance()
const mainEl = ref()
const { header } = useRoute().query
const showMenus = computed(() => {
  if (isChildApp.value) return false
  return header === '0' ? false : true
})

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
