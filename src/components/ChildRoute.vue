<template>
  <template v-for="{ path, meta, hidden, children } in routes" :key="basePath + '/' + path">
    <template v-if="!hidden"></template>
    <el-sub-menu v-if="children" :index="basePath + '/' + path">
      <template #title>
        <div>{{ meta.title }}</div>
      </template>
      <child-route :routes="children" :base-path="basePath + '/' + path"></child-route>
    </el-sub-menu>
    <el-menu-item v-else :index="basePath + '/' + path">{{ meta.title }}</el-menu-item>
  </template>
</template>

<script setup>
const props = defineProps(['routes', 'basePath'])
const { routes, basePath } = props
</script>
