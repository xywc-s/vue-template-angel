<route lang="yaml">
meta:
  title: 用户列表
</route>

<template>
  <TitleBar class="mb-10px" title="用户列表"></TitleBar>
  <VxeGrid v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { useService } from '@angelyeast/service'
import { useTable } from '@angelyeast/repository'
import { onMounted } from 'vue'
defineOptions({
  name: 'UserList'
})

const { findUserList } = useService('Auth').User
const { Table, tableOptions } = useTable({ columns: [] })
Table.setQuery(findUserList)

onMounted(() => {
  Table.fetchData()
})
</script>
