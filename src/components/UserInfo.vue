<template>
  <el-popover
    :trigger="triggleMethod"
    :width="350"
    @before-enter="onBeforeEnter"
    @after-leave="visible = false"
    @show="onShow"
  >
    <template #reference>
      <slot v-bind="{ user }">
        <el-link v-if="user?.id" type="primary">
          <span>{{ user?.name }}</span>
          <span v-if="user?.status !== '正常'" class="ml-5px text-[#f56c6c]">
            ({{ user.status }})
          </span>
        </el-link>
        <div v-else></div>
      </slot>
    </template>
    <template #default>
      <div v-loading="loading" class="userInfo h-min-150px">
        <div class="flex items-center">
          <el-avatar class="w-60px h-60px mr-15px" shape="square" size="large" :src="user.avatar">
            <i v-if="user.status !== '正常'" class="text-40px uno-ep-remove-outline"></i>
            <i v-else class="text-40px uno-ep-user"></i>
          </el-avatar>
          <div v-if="user?.name">
            <div>
              <span class="text-16px text-[#303133] mb-10px">
                {{ user.name }}
                <i
                  class="uno-ep-user-filled"
                  :class="{
                    'text-[#409eff]': user?.gender === '男',
                    'text-[#f56c6c]': user?.gender === '女'
                  }"
                />
              </span>
              <span v-if="user.status !== '正常'" class="ml-5px text-[#f56c6c]">
                [{{ user.status }}]
              </span>
            </div>
            <div>
              <span class="text-13px text-[#909399]">{{ user.position }}</span>
            </div>
          </div>
        </div>
        <div class="detail text-13px mt-20px children:mb-10px">
          <div class="flex">
            <span class="title flex-shrink-0">
              <i class="uno-ep-phone"></i>
              手机
            </span>
            <span class="value">
              <el-link @click="() => copyText(user.phone)">
                {{ user.phone }}
              </el-link>
            </span>
          </div>
          <div class="flex">
            <span class="title flex-shrink-0">
              <i class="uno-ep-message"></i>
              邮箱
            </span>
            <span class="value">
              <el-link @click="() => copyText(user.email)">
                {{ user.email }}
              </el-link>
            </span>
          </div>
          <div class="flex">
            <span class="title flex-shrink-0">
              <i class="uno-ep-user"></i>
              编号
            </span>
            <span class="value">
              <el-link @click="() => copyText(user.code)">
                {{ user.code }}
              </el-link>
            </span>
          </div>
          <div class="flex">
            <span class="title flex-shrink-0">
              <i class="uno-ep-office-building"></i>
              部门
            </span>
            <span class="value">
              <span v-for="item in departmentList" :key="item.id" class="departmentName">
                {{ item }}
              </span>
            </span>
          </div>
          <template v-if="userStore.hasPermission('SI')">
            <div class="flex">
              <div class="title flex-shrink-0">
                <i class="uno-ep-key" />
                id
              </div>
              <span class="value">
                <el-link @click="() => copyText(user.id)">
                  {{ user.id }}
                </el-link>
              </span>
            </div>
            <div class="flex">
              <div class="title flex-shrink-0">
                <div class="flex items-center">
                  <svg-icon name="wechat" color="#909399" />
                  <span class="ml-5px">企微</span>
                </div>
              </div>
              <span class="value">
                <el-link @click="() => copyText(user.wechatId)">{{ user.wechatId }}</el-link>
              </span>
            </div>
          </template>
        </div>
      </div>
      <slot name="bottom"></slot>
    </template>
  </el-popover>
</template>

<script setup>
import { computed, onMounted, ref, useSlots, watch, watchEffect } from 'vue'
import { Queue } from '@xywc-s/utils'
import { Auth } from '@/api'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import { copyText } from '@/repositories'
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  trigger: {
    type: String,
    default: 'hover'
  },
  showWechatButton: {
    type: Boolean,
    default: true
  },
  custom: {
    type: Boolean,
    default: false
  }
})
const slots = useSlots()
const appStore = useApp()
const userStore = useUser()
const rootCode = 691
const visible = ref(false)
const loading = ref(false)
const user = ref({})
const departmentList = ref([])
const triggleMethod = ref('hover')
const queue = new Queue()

const valueField = computed(() => {
  return getValueField(props.value)
})

watchEffect(() => {
  triggleMethod.value = appStore.isMobile ? 'click' : props.trigger
})
watch(
  () => props.value,
  () => {
    getUser()
  }
)

// 判断value的类型 id、email、code、phone
const getValueField = (value) => {
  if (value && value.length === 32) {
    return 'id'
  } else if (value.length === 8) {
    return 'code'
  } else if (/[0-9]/.test(value) && parseInt(value) < 100000) {
    return 'wechatId'
  } else {
    console.error('unknown value type:', value)
    return ''
  }
}
const getUser = async () => {
  if (!!props.value && user.value[valueField.value] === props.value) return false
  user.value = {}

  // 加入异步请求队列
  const res = await queue.push(Auth.User.findByUnique, props.value)

  if (res?.success && res?.object) {
    const data = res.object
    data.weChatJson = JSON.parse(data.weChatJson.replace(/\\"/g, '"'))
    data.position = data.weChatJson.position
    data.avatar = data.weChatJson.thumb_avatar.replace(/^http:/g, 'https:')
    data.wechatId = data.weChatJson.userid
    data.departmentCodeList = data.weChatJson.department
    user.value = data
  }
}
const getUserDepartmentList = async () => {
  departmentList.value = []
  const list = (
    await Promise.all(
      user.value.departmentCodeList.map((code) =>
        queue.push(Auth.Department.findDepartmentAndAllParent, code)
      )
    )
  ).map((o) =>
    o.rows
      .map((row) => {
        row.code = parseInt(row.code)
        return row
      })
      .filter((row) => row.code > rootCode)
      .sort((a, b) => b.levelNumber - a.levelNumber)
      .map((row) => row.name)
      .join(` / `)
  )
  departmentList.value = list
}
const onShow = async () => {
  loading.value = true
  if (user.value[valueField.value] !== props.value || !user.value?.id) {
    await getUser()
    await getUserDepartmentList()
  } else if (!departmentList.value?.length) {
    await getUserDepartmentList()
  }
  loading.value = false
}
const onBeforeEnter = () => {
  visible.value = true
  if (!user.value?.id) loading.value = true
}

onMounted(() => {
  // 默认插槽没有任何内容
  if (!slots?.default || props.custom) {
    getUser()
  }
})
</script>
<style lang="scss" scoped>
.title {
  display: inline-block;
  margin: 0 10px;
  width: 50px;
  color: #909399;
}
.value {
  color: #606266;
}
</style>
