<route lang="yaml">
name: product-category
meta:
  title: 产品分类
  layout: nowrap
</route>

<template>
  <TitleBar class="mb-10px" title="产品分类"></TitleBar>
  <VxeGrid v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { Trade, trade } from '@angelyeast/model'
import { useTable } from '@angelyeast/repository'
import { useService } from '@angelyeast/service'
import { onMounted } from 'vue'

defineOptions({
  name: 'ProductCategory'
})

const { Table, tableOptions } = useTable<Trade>({
  columns: Object.entries(trade).map(([key, value]) => ({
    title: value,
    field: key
  }))
})
const { findAll } = useService('Market').Trade
Table.setQuery(findAll)
onMounted(() => {
  Table.fetchData()
})
</script>
