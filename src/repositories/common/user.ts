import { ref } from 'vue'
import { assign } from 'lodash-es'
import { useUser } from '@/stores/user'
import { Auth, UserListData } from '@/api'
import type { User } from '@/models'

/**
 * 获取用户数据
 */
export function useUserList(data: UserListData) {
  const users = ref<User[]>([])
  const userStore = useUser()
  if (data) {
    Auth.findUserList(assign({ rows: 1000000 }, data)).then(({ rows }) => (users.value = rows))
  } else {
    if (!userStore.userList.length) {
      Auth.findUserList({ rows: 1000000 }).then(({ rows }) => (users.value = rows))
    } else {
      users.value = userStore.userList
    }
  }
  return users
}
