<template>
  <section
    class="layout-header min-h-58px flex items-center justify-between md:justify-start shadow-md"
  >
    <div class="px-20px flex-shrink-0">
      <UserInfo :value="userStore.user.id" custom>
        <template #default="{ user }">
          <el-avatar :size="36" :src="user?.avatar"></el-avatar>
        </template>
      </UserInfo>
    </div>
    <el-menu
      :collapse="appStore.isMobile"
      mode="horizontal"
      router
      :default-active="defaultActive"
      class="items-center md:flex-grow"
    >
      <template v-for="{ path, children } in $router.options.routes" :key="path">
        <template
          v-if="
            !children![0].meta?.hidden && userStore.hasPermission(children![0].meta?.permission)
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
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'LayoutHeader'
})
const appStore = useAppStore()
const userStore = useUserStore()
const defaultActive = useRoute().path
</script>

<style lang="scss" scoped>
.layout-header {
  :deep(.el-menu--horizontal) {
    border: none;
  }
}
</style>
