<route lang="yaml">
meta:
  title: 文档列表
</route>

<template>
  <TitleBar class="mb-10px" title="文档列表"></TitleBar>
  <VxeGrid v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { useService } from '@angelyeast/service'
import { useTable } from '@angelyeast/repository'
import { onMounted } from 'vue'
defineOptions({
  name: 'DocsList'
})

// const { findUserList } = useService('Auth').User
const { Table, tableOptions } = useTable({ columns: [] })
// Table.setQuery(findUserList)

onMounted(() => {
  // Table.fetchData()
})
</script>
