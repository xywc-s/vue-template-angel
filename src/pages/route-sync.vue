<route lang="yaml">
meta:
  title: 路由同步
</route>

<template>
  <div class="max-w-1200px mx-auto">
    <TitleBar title="路由同步">
      <template #right>
        <vxe-button
          v-loading="buttonLoading"
          status="primary"
          icon="ep-refresh"
          @click="syncRoutes"
        >
          同步
        </vxe-button>
      </template>
    </TitleBar>
    <vxe-form
      :size="null"
      :data="appRoutesConfig"
      :span="24"
      :title-width="100"
      title-align="right"
    >
      <vxe-form-item title="应用名" field="name">
        <span class="font-bold">{{ appRoutesConfig.name }}</span>
      </vxe-form-item>
      <vxe-form-item title="应用路径" field="path">
        <span class="font-bold">{{ appRoutesConfig.path }}</span>
      </vxe-form-item>
      <vxe-form-gather>
        应用配置
        <vxe-form-item title="应用菜单名称" field="meta.title">
          <el-input v-model="appRoutesConfig.meta!.title"></el-input>
        </vxe-form-item>
        <vxe-form-item title="应用类型" field="meta.type">
          <el-radio-group v-model="appRoutesConfig.meta!.type">
            <el-radio label="inner">中台内部应用</el-radio>
            <el-radio label="outer">中台外部应用</el-radio>
          </el-radio-group>
        </vxe-form-item>
        <vxe-form-item title="启用状态" field="meta.status">
          <el-switch v-model="appRoutesConfig.meta!.status"></el-switch>
        </vxe-form-item>
      </vxe-form-gather>
      <vxe-form-item title="应用路由" field="children">
        <div class="flex items-center">
          <div>
            <span class="inline-block w-100px">
              <el-checkbox
                :model-value="allUsefulChecked"
                :indeterminate="isAllUsefulIndeterminate"
                @change="handleUsefulCheckAllChange"
              >
                可用性
              </el-checkbox>
            </span>
            <span class="inline-block w-100px">
              <el-checkbox
                :model-value="allVisibleChecked"
                :indeterminate="isAllVisibleIndeterminate"
                @change="handleVisibleCheckAllChange"
              >
                可见性
              </el-checkbox>
            </span>
          </div>
          <div>路由名</div>
        </div>
        <template v-for="route in selectableRoutes" :key="route.name">
          <div class="flex items-center">
            <div>
              <el-checkbox
                v-model="route.checked"
                class="w-100px !mx-0"
                @change="handleUsefulChange"
              ></el-checkbox>
              <el-checkbox
                v-model="route.hidden"
                class="w-100px"
                @change="handleVisibleChange"
              ></el-checkbox>
            </div>
            <div>{{ route.meta?.title }}</div>
          </div>
        </template>
      </vxe-form-item>
    </vxe-form>
  </div>
</template>

<script setup lang="ts" name="RouteSync">
import { computed, reactive, ref } from 'vue'
import { cloneDeep, set } from 'lodash-es'
import { useToggle } from '@vueuse/core'
import { getAppsRoutes, updateAppsRoutes } from '@/api/bff'
import routes from '~pages'
import type { CustomRoute } from '@/types/custom'
import type { RouteRecordRaw } from 'vue-router'

const [buttonLoading, toggleButtonLoading] = useToggle(false)
const apps = reactive<Record<string, any>>({})
const appRoutesConfig = reactive<RouteRecordRaw>({
  path: import.meta.env.VITE_APP_PATH,
  name: import.meta.env.VITE_APP_NAME,
  meta: {
    title: '',
    type: 'inner',
    status: true
  },
  children: []
})
const selectableRoutes = ref<CustomRoute[]>(
  routes
    .filter((route) => !['login', 'index', 'all', 'route-sync'].includes(route.name as string))
    .map((route) => {
      set(route, 'checked', false)
      set(route, 'hidden', false)
      return route as CustomRoute
    })
)
const selectedRoutes = computed(() => selectableRoutes.value.filter((route) => route.checked))

// 是否可用(同步到中台服务)
const allUsefulChecked = ref(false)
const isAllUsefulIndeterminate = computed(() => {
  const checkedNumber = selectableRoutes.value.filter((route) => route.checked).length
  return checkedNumber > 0 && checkedNumber < selectableRoutes.value.length
})
const handleUsefulCheckAllChange = (val: boolean) => {
  allUsefulChecked.value = val
  for (const route of selectableRoutes.value) {
    route.checked = val
  }
}
const handleUsefulChange = (val: boolean) => {
  val && !isAllUsefulIndeterminate.value && (allUsefulChecked.value = true)
  !val && !isAllUsefulIndeterminate.value && (allUsefulChecked.value = false)
}

// 可见性
const allVisibleChecked = ref(false)
const isAllVisibleIndeterminate = computed(() => {
  const checkedNumber = selectableRoutes.value.filter((route) => route.hidden).length
  return checkedNumber > 0 && checkedNumber < selectableRoutes.value.length
})
const handleVisibleCheckAllChange = (val: boolean) => {
  allVisibleChecked.value = val
  for (const route of selectableRoutes.value) {
    route.hidden = val
  }
}
const handleVisibleChange = (val: boolean) => {
  val && !isAllVisibleIndeterminate.value && (allVisibleChecked.value = true)
  !val && !isAllVisibleIndeterminate.value && (allVisibleChecked.value = false)
}

const syncRoutes = () => {
  toggleButtonLoading(true)
  const params = cloneDeep(appRoutesConfig)
  const cloneRoutes = cloneDeep(selectedRoutes.value)
  params.children = cloneRoutes.map((route) => {
    route.path = route.path.replace('/', '')
    delete route.component
    delete route.checked
    return route
  })
  apps[params.name as string] = params
  updateAppsRoutes(apps)
    .then((res) => {})
    .finally(() => toggleButtonLoading(false))
}

const getApps = () => {
  getAppsRoutes().then((res) => {
    Object.keys(res.data).forEach((key) => (apps[key] = res.data[key]))
  })
}

getApps()

console.log(selectableRoutes.value)
</script>
