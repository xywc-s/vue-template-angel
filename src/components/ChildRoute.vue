<template>
  <template v-for="{ path, meta, hidden, children } in routes" :key="basePath + '/' + path">
    <template
      v-if="!hidden && (meta.permission ? $hasPermission(meta.permission) : true)"
    ></template>
    <el-sub-menu v-if="children" :index="basePath + '/' + path">
      <template #title>
        <div>{{ meta.title }}</div>
      </template>
      <child-route :routes="children" :base-path="basePath + '/' + path"></child-route>
    </el-sub-menu>
    <el-menu-item v-else :index="basePath + '/' + path">{{ meta.title }}</el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { RouteLocation } from 'vue-router'
const props = defineProps<{
  routes: RouteLocation[]
  basePath: string
}>()
const routes = toRef(props, 'routes')
const basePath = toRef(props, 'basePath')
</script>
