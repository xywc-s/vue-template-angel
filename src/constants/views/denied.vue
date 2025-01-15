<template>
  <section class="h-70vh flex flex-col items-center justify-around">
    <i class="!w-2/3 !h-auto aspect-square max-w-350px uno-custom-permission-denied"></i>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNotify } from '@angelyeast/repository'

definePage({
  meta: {
    hidden: true,
    whiteList: true
  }
})

const { t } = useI18n()
onMounted(() => useNotify(t('Permission Denied'), 'error'))
</script>
