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
          <el-avatar class="avatar" shape="square" size="large" :src="user.avatar">
            <i v-if="user.status !== '正常'" style="font-size: 40px" class="ep-remove-outline"></i>
            <i v-else style="font-size: 40px" class="ep-user"></i>
          </el-avatar>
          <div v-if="user?.name">
            <div>
              <span class="name">
                {{ user.name }}
                <i
                  class="ep-user-solid userIcon"
                  :class="{ man: user?.gender === '男', woman: user?.gender === '女' }"
                />
              </span>
              <span v-if="user.status !== '正常'" style="margin-left: 5px; color: #f56c6c">
                [{{ user.status }}]
              </span>
            </div>
            <div>
              <span class="position">{{ user.position }}</span>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="flex row">
            <span class="title flex-shrink-0">
              <i class="ep-phone"></i>
              手机
            </span>
            <span class="value">
              <el-link @click="$copyText(user.phone) && $message.success('已复制:' + user.phone)">
                {{ user.phone }}
              </el-link>
            </span>
          </div>
          <div class="flex row">
            <span class="title flex-shrink-0">
              <i class="ep-message"></i>
              邮箱
            </span>
            <span class="value">
              <el-link @click="$copyText(user.email) && $message.success('已复制:' + user.email)">
                {{ user.email }}
              </el-link>
            </span>
          </div>
          <div class="flex row">
            <span class="title flex-shrink-0">
              <i class="ep-user"></i>
              编号
            </span>
            <span class="value">
              <el-link @click="$copyText(user.code) && $message.success('已复制:' + user.code)">
                {{ user.code }}
              </el-link>
            </span>
          </div>
          <div class="flex row">
            <span class="title flex-shrink-0">
              <i class="ep-office-building"></i>
              部门
            </span>
            <span class="value">
              <span class="departmentName" v-for="item in departmentList" :key="item.id">
                {{ item }}
              </span>
            </span>
          </div>
          <template v-if="$hasPermission('SI')">
            <div class="flex row">
              <span class="title flex-shrink-0">
                <i class="ep-key" />
                id
              </span>
              <span class="value">
                <el-link @click="$copyText(user.id) && $message.success('已复制:' + user.id)">
                  {{ user.id }}
                </el-link>
              </span>
            </div>
            <div class="flex row">
              <span class="title flex-shrink-0">
                <svg-icon name="wechat" color="#909399" />
                企微
              </span>
              <span class="value">
                <el-link
                  @click="$copyText(user.wechatId) && $message.success('已复制:' + user.wechatId)"
                >
                  {{ user.wechatId }}
                </el-link>
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
import SecurityServer from '@/api/auth'
import { useApp } from '@/stores/app'
import queue from '@/utils/queue'
import { computed, onMounted, ref, useSlots, watch, watchEffect } from 'vue'
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
const rootCode = 691
const visible = ref(false)
const loading = ref(false)
const user = ref({})
const departmentList = ref(null)
const triggleMethod = ref('hover')

const valueField = computed(() => {
  return getValueField(props.value)
})

watchEffect(() => {
  triggleMethod.value = appStore.device === 'mobile' ? 'click' : props.trigger
})
watch(
  () => props.value,
  () => {
    getUser()
  }
)

//判断value的类型 id、email、code、phone
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

  //加入异步请求队列
  const res = await queue.push(SecurityServer.findByUnique, props.value)

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
  departmentList.value = null
  const list = (
    await Promise.all(
      user.value.departmentCodeList.map((code) =>
        queue.push(SecurityServer.findDepartmentAndAllParent, code)
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
.userInfo {
  .avatar {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
  .name {
    font-size: 16px;
    color: #303133;
    margin-bottom: 10px;
  }
  .position {
    font-size: 13px;
    color: #909399;
  }
  .userIcon {
    &.man {
      color: #409eff;
    }
    &.woman {
      color: #f56c6c;
    }
  }
  .detail {
    font-size: 13px;
    margin-top: 20px;
    .row {
      margin-bottom: 10px;
      .title {
        display: inline-block;
        margin: 0 10px;
        width: 50px;
        color: #909399;
      }
      .value {
        color: #606266;
        .departmentName {
          & + & {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
