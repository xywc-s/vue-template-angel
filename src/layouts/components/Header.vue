<template>
  <section
    class="layout-header min-h-58px flex items-center justify-between md:justify-start shadow-md"
  >
    <div class="px-20px flex-shrink-0">
      <UserInfo :value="user?.id">
        <el-avatar :size="36" :src="user?.avatar"></el-avatar>
      </UserInfo>
    </div>
    <el-menu
      :collapse="isMobile"
      mode="horizontal"
      router
      :default-active="defaultActive"
      class="items-center md:flex-grow"
    >
      <template v-for="{ path, meta, children } in routes" :key="path">
        <template v-if="!meta?.hidden && hasPermission(meta?.permission)">
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
import { routes } from 'vue-router/auto/routes'
import { useBreakpoint, usePermission, useUser } from '@angelyeast/micro-frontend'
defineOptions({
  name: 'LayoutHeader'
})
const { isMobile } = useBreakpoint()
const { user } = useUser()
const { hasPermission } = usePermission()
const defaultActive = useRoute().path
</script>

<style lang="scss" scoped>
.layout-header {
  :deep(.el-menu--horizontal) {
    border: none;
  }
}
</style>
