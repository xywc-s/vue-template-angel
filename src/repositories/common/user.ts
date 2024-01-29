import { ref } from 'vue'
import { assign } from 'lodash-es'
import { useUserStore } from '@/stores/user'
import { Auth } from '@/api'
import type { User, UserListParams } from '@/models'

/**
 * 获取用户数据
 */
export function useUserList(data: UserListParams) {
  const users = ref<User[]>([])
  const userStore = useUserStore()
  if (data) {
    Auth.User.findUserList(assign({ page: 1, rows: 99999 }, data)).then(
      ({ rows }) => (users.value = rows)
    )
  } else {
    if (!userStore.userList.length) {
      Auth.User.findUserList({ rows: 1000000 }).then(({ rows }) => (users.value = rows))
    } else {
      users.value = userStore.userList
    }
  }
  return users
}
