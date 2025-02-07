import { UserListColumns } from '@@/example/table'
import { useTable } from '@angelyeast/repository'
import { useService } from '@angelyeast/service'
import type { Ref } from 'vue'
import type { VxeGridInstance } from 'vxe-table'

export const useUserListTable = ($table: Ref<VxeGridInstance>) => {
  const { findUserList } = useService('Auth').User

  const { Table, tableOptions } = useTable({})
  Table.setColumns(UserListColumns)
  Table.setQuery(findUserList)
  Table.resize($table)

  return {
    Table,
    tableOptions
  }
}
