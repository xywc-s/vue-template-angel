import { ElLink } from 'element-plus'
import type { VxeGridPropTypes } from 'vxe-pc-ui'

export const UserListColumns: VxeGridPropTypes.Columns = [
  {
    field: 'name',
    title: '名字'
  },
  {
    field: 'email',
    title: '邮箱',
    slots: {
      default: (params) => [
        h(
          ElLink,
          {
            type: 'primary'
          },
          () => params.row.email
        )
      ]
    }
  },
  {
    field: 'code',
    title: '编号',
    cellRender: {
      name: '$input',
      props: {
        type: 'primary'
      }
    }
  },
  {
    field: 'phone',
    title: '联系方式',
    cellRender: {
      name: 'input',
      props: {
        type: 'primary'
      }
    }
  }
]
