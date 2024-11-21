<route lang="yaml">
name: user-list-2
meta:
  title: 用户列表
  sync: true
</route>

<template>
  <TitleBar class="my-10px" :title="title"></TitleBar>
  <ElLink>2</ElLink>
  <VxeGrid v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { useService } from '@angelyeast/service'
import { useTable } from '@angelyeast/repository'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'UserList2'
})

const {
  meta: { title }
} = useRoute()

const { findUserList } = useService('Auth').User
const { Table, tableOptions } = useTable({
  columns: [
    {
      field: 'name',
      title: '名字'
    },
    {
      field: 'code',
      title: '编号',
      cellRender: {
        name: 'ElLink'
      }
    }
  ]
})
Table.setQuery(findUserList)

onMounted(() => {
  Table.fetchData()
})
</script>
