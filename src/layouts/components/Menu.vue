<template>
  <div
    position="fixed left-0 top-8vh bottom-8vh"
    w="16px"
    z="99"
    @mouseenter="showSidebar = true"
  ></div>
  <el-drawer
    v-model="showSidebar"
    append-to-body
    :show-close="false"
    :modal="false"
    direction="ltr"
    body-class="!pa-0"
    header-class="!pa-0 !ma-0"
    class="!w-220px !top-8vh !bottom-8vh rounded-rb-10px rounded-rt-10px !h-auto"
    @mouseleave="showSidebar = false"
  >
    <template #header>
      <div class="px-16px py-10px box-border border-b-1 border-b-solid border-b-gray-200">
        <UserInfo :value="user?.id">
          <div flex="~">
            <el-avatar :size="40" :src="user?.avatar"></el-avatar>
            <div class="ml-8px" text="" font="semibold">
              <div text="0.9em">{{ user?.name }}</div>
              <div text="0.5em">{{ user?.code }}</div>
            </div>
          </div>
        </UserInfo>
      </div>
    </template>
    <ElScrollbar height="calc(84vh - 60px)">
      <el-menu
        unique-opened
        :default-active="defaultActive"
        class="w-full h-full items-center md:flex-grow custom !border-r-none"
        router
      >
        <template v-for="{ path, meta, children, name } in menus" :key="name ?? path">
          <el-sub-menu v-if="children" :index="path">
            <template #title>
              <div>{{ meta?.title ? $t(meta.title) : path }}</div>
            </template>
            <ChildRoute :routes="children" :base-path="path"></ChildRoute>
          </el-sub-menu>
          <el-menu-item v-else :index="path">
            {{ meta?.title ? $t(meta.title) : path }}
          </el-menu-item>
        </template>
      </el-menu>
    </ElScrollbar>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { sortBy } from 'lodash-es'
import { usePermission, useUser } from '@angelyeast/micro-frontend'

defineOptions({ name: 'MenuBar' })
const route = useRoute()
const { hasPermission } = usePermission()
const { user } = useUser()

const showSidebar = ref(false)
const defaultActive = route.path

console.log('🚀 ~ routes:', routes)
const menus = computed(() => {
  const _routes = filterRoutes(routes)
  return sortBy(_routes, sortBySeq)
})

function filterRoutes(routes: RouteRecordRaw[]) {
  return routes.filter((o) => {
    if (!o.children?.length) return !o.meta?.hidden && hasPermission(o.meta?.permission)
    o.children = filterRoutes(o.children)
    return o.children?.length
  })
}

function sortBySeq(route: RouteRecordRaw) {
  if (route.children) route.children = sortBy(route.children, sortBySeq)
  return route.meta?.order
}
</script>

<style lang="scss" scoped>
.custom {
  --el-menu-item-height: 40px !important;
  --el-menu-sub-item-height: 34px;
}
</style>
