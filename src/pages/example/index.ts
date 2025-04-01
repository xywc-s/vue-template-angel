import { useTable } from '@angelyeast/repository'
import { Auth } from '@angelyeast/service'
import { UserListColumns } from '@@/example/table'
import type { Ref } from 'vue'
import type { VxeGridInstance } from 'vxe-table'

export const useUserListTable = ($table: Ref<VxeGridInstance>) => {
  const { findUserList } = Auth.User

  const { Table, tableOptions } = useTable({})
  Table.setColumns(UserListColumns)
  Table.setQuery(findUserList)
  Table.resize($table)

  return {
    Table,
    tableOptions
  }
}
