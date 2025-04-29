<template>
  <template v-for="{ path, meta, children } in routes" :key="urlJoin(basePath, path)">
    <template v-if="!meta?.hidden && hasPermission(meta?.permission)">
      <el-sub-menu v-if="children" :index="urlJoin(basePath, path)">
        <template #title>
          <div>{{ meta?.title ? $t(meta.title) : path }}</div>
        </template>
        <child-route :routes="children" :base-path="urlJoin(basePath, path)"></child-route>
      </el-sub-menu>
      <el-menu-item v-else :index="urlJoin(basePath, path)">
        {{ meta?.title ? $t(meta.title) : path }}
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { usePermission } from '@angelyeast/micro-frontend'
import { urlJoin } from '@angelyeast/repository'
import type { RouteRecordRaw } from 'vue-router'
const props = defineProps<{
  routes: RouteRecordRaw[]
  basePath: string
}>()
const routes = toRef(props, 'routes')
const basePath = toRef(props, 'basePath')
const { hasPermission } = usePermission()
</script>
