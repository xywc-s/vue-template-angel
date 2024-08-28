<route lang="yaml">
meta:
  title: 用户列表
</route>

<template>
  <TitleBar class="mb-10px mt-20px" title="用户列表"></TitleBar>
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
const { Table, tableOptions } = useTable({
  columns: [
    {
      field: 'code',
      title: '工号',
      width: 140
    },
    {
      field: 'name',
      title: '名字'
    }
  ]
})
Table.setQuery(findUserList)

onMounted(() => {
  Table.fetchData()
})
</script>
