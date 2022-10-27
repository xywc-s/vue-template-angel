import { ref } from 'vue'
import SecurityServer from '@/api/auth'
import { useUser } from '@/stores/user'
import type { User } from '@/models/user'

export function useUserList() {
  const users = ref<User[]>([])
  const userStore = useUser()
  if (!userStore.userList.length) {
    SecurityServer.findUserList({ rows: 1000000 }).then(({ rows }) => (users.value = rows))
  } else {
    users.value = userStore.userList
  }
  return users
}
