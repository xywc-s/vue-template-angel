<route lang="yaml">
name: user-list-2
meta:
  title: 用户列表
  sync: true
  icon: uno-ep-aim
</route>

<template>
  <TitleBar class="my-10px" :title="$route.meta.title"></TitleBar>
  <VxeGrid ref="$table" v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserListTable } from '@@/example'
defineOptions({
  name: 'UserList2'
})

const $table = ref()
const { Table, tableOptions } = useUserListTable($table)

onMounted(() => {
  Table.fetchData()
})
</script>
