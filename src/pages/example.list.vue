<route lang="yaml">
name: user-list
meta:
  title: 用户列表
  sync: true
</route>

<template>
  <TitleBar class="my-10px" :title="title"></TitleBar>
  <ElLink>3</ElLink>
  <VxeGrid ref="$table" v-bind="tableOptions"></VxeGrid>
</template>

<script setup lang="ts">
import { useService } from '@angelyeast/service'
import { useTable } from '@angelyeast/repository'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'UserList'
})

const {
  meta: { title }
} = useRoute()

const $table = ref()
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
        name: 'Link',
        props: {
          type: 'primary'
        }
      }
    }
  ]
})
Table.setQuery(findUserList)
Table.resize($table)

onMounted(() => {
  Table.fetchData()
})
</script>
