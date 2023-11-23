<template>
  <svg aria-hidden="true" width="1em" height="1em" v-bind="$attrs">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  name: 'SvgIcon'
})
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const color = computed(() => props.color)
</script>
