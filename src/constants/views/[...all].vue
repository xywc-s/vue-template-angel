<template>
  <div class="h-70vh flex items-center justify-center">
    <i class="text-300px uno-custom-404"></i>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'NotFound'
})

definePage({
  name: 'NotFound',
  meta: {
    title: '404',
    hidden: true,
    whiteList: true
  }
})
</script>
