<route lang="yaml">
name: user-list
meta:
  title: 用户列表
  sync: true
  permission: GJ
</route>

<template>
  <TitleBar class="my-10px" :title="$route.meta.title"></TitleBar>
  <VxeGrid ref="$table" v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserListTable } from '@/pages/example'
defineOptions({
  name: 'UserList'
})

const $table = ref()
const { Table, tableOptions } = useUserListTable($table)

onMounted(() => {
  Table.fetchData()
})
</script>
