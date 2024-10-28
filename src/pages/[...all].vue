<route>
name: all
meta:
  hidden: true
  title: '404'
  whiteList: true
</route>

<template>
  <div class="h-70vh flex items-center justify-center">
    <SvgIcon name="404" class="text-300px"></SvgIcon>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'NotFound'
})
</script>
