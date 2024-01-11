<route lang="yaml">
meta:
  hidden: true
</route>

<template>
  <section class="h-full flex flex-col items-center justify-around">
    <SvgIcon
      name="permission-denied"
      class="inline-block !w-2/3 !h-auto aspect-square max-w-350px"
    ></SvgIcon>
    <div></div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNotify } from '@/repositories'

const { t } = useI18n()
onMounted(() => useNotify(t('Permission Denied'), 'error'))
</script>
