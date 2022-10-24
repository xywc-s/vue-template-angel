<template>
  <el-container>
    <el-header v-if="!appStore.isChildApp" height="auto" class="!px-0">
      <el-menu
        :collapse="appStore.isMobile"
        mode="horizontal"
        router
        :default-active="defaultActive"
        class="items-center"
      >
        <div class="px-20px">
          <UserInfo :value="userStore.user.id" custom>
            <template #default="{ user }">
              <el-avatar :size="36" :src="user?.weChatJson?.avatar"></el-avatar>
            </template>
          </UserInfo>
        </div>

        <template v-for="{ path, children } in $router.options.routes" :key="path">
          <template
            v-if="
              !children![0].meta?.hidden && userStore.hasPermission(children![0].meta?.permission as Permission)
            "
          >
            <el-sub-menu v-if="children![0].children" :index="path">
              <template #title>
                <div>{{ children![0].meta?.title }}</div>
              </template>
              <ChildRoute :routes="children![0].children" :base-path="path"></ChildRoute>
            </el-sub-menu>
            <el-menu-item v-else :index="path">{{ children![0].meta?.title }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-header>
    <el-main ref="mainEl" class="main-box">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="AppLogin">
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import type { Permission } from '@/types/custom'

const appStore = useApp()
const userStore = useUser()
const defaultActive = useRoute().path

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
