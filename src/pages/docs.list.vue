<route lang="yaml">
meta:
  title: 文档列表
</route>

<template>
  <TitleBar class="mb-10px mt-20px" title="文档列表"></TitleBar>
  <VxeGrid v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { useTable } from '@angelyeast/repository'
defineOptions({
  name: 'DocsList'
})

const { Table, tableOptions } = useTable({ columns: [] })
// Table.setQuery(findUserList)
// Table.fetchData()
</script>
