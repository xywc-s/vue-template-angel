import { ref } from 'vue'
import { assign } from 'lodash-es'
import { Auth, UserListData } from '@/api'
import { useUser } from '@/stores/user'
import type { User } from '@/models/user'

/**
 * 获取用户数据
 */
export function useUserList(data: UserListData = {}) {
  const users = ref<User[]>([])
  const userStore = useUser()
  if (!userStore.userList.length) {
    Auth.findUserList(assign({ rows: 1000000 }, data)).then(({ rows }) => (users.value = rows))
  } else {
    users.value = userStore.userList
  }
  return users
}
