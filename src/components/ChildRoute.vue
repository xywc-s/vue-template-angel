<template>
  <template v-for="{ path, meta, children } in routes" :key="basePath + '/' + path">
    <template v-if="!meta?.hidden && hasPermission(meta?.permission)">
      <el-sub-menu v-if="children" :index="basePath + '/' + path">
        <template #title>
          <div>{{ meta?.title }}</div>
        </template>
        <child-route :routes="children" :base-path="basePath + '/' + path"></child-route>
      </el-sub-menu>
      <el-menu-item v-else :index="basePath + '/' + path">{{ meta?.title }}</el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { usePermission } from '@angelyeast/micro-frontend'
import type { RouteRecordRaw } from 'vue-router'
const props = defineProps<{
  routes: RouteRecordRaw[]
  basePath: string
}>()
const routes = toRef(props, 'routes')
const basePath = toRef(props, 'basePath')
const { hasPermission } = usePermission()
</script>
