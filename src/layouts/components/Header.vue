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
      <template v-for="{ path, meta, children } in routes" :key="path">
        <template v-if="!meta?.hidden && userStore.hasPermission(meta?.permission)">
          <el-sub-menu v-if="children" :index="path">
            <template #title>
              <div>{{ meta?.title }}</div>
            </template>
            <ChildRoute :routes="children" :base-path="path"></ChildRoute>
          </el-sub-menu>
          <el-menu-item v-else :index="path">{{ meta?.title }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { routes } from 'vue-router/auto/routes'
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
