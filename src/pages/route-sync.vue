<route lang="yaml">
meta:
  title: 路由同步
  permission: YW
</route>

<template>
  <div class="max-w-1200px mx-auto loading">
    <el-descriptions border :column="6">
      <template #title>
        <span class="text-4.5">路由同步</span>
      </template>
      <template #extra>
        <el-button :loading="buttonLoading" type="primary" @click="getApps">
          <i class="uno-ep-download -ml-4px mr-4px"></i>
          <span>拉取</span>
        </el-button>
        <el-button :loading="buttonLoading" type="success" @click="syncRoutes">
          <i class="uno-ep-upload -ml-4px mr-4px"></i>
          <span>推送</span>
        </el-button>
      </template>
      <el-descriptions-item :span="2" label="应用名" label-class-name="w-120px">
        {{ appRoutesConfig.name }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label="应用路径" label-class-name="w-120px">
        {{ appRoutesConfig.path }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label="启用状态" label-class-name="w-120px">
        <el-switch v-model="appRoutesConfig.meta!.status"></el-switch>
      </el-descriptions-item>
      <el-descriptions-item :span="2" label="应用菜单名称" label-class-name="w-120px">
        <el-input v-model="appRoutesConfig.meta!.title"></el-input>
      </el-descriptions-item>
      <el-descriptions-item :span="2" label="根路由组件" label-class-name="w-120px">
        <template #label>
          <span>根路由组件</span>
          <el-tooltip
            raw-content
            content="可不填, 默认为中台Layout组件<br>可选值 Layout, Plain"
            placement="top"
          >
            <i class="uno-ep-question-filled"></i>
          </el-tooltip>
        </template>
        <el-input v-model="appRoutesConfig.component"></el-input>
      </el-descriptions-item>
      <el-descriptions-item :span="2" label="应用类型" label-class-name="w-120px">
        <el-radio-group v-model="appRoutesConfig.meta!.type">
          <el-radio label="inner">中台内部应用</el-radio>
          <el-radio label="outer">中台外部应用</el-radio>
        </el-radio-group>
      </el-descriptions-item>

      <el-descriptions-item
        :span="6"
        label="路由配置"
        label-class-name="w-120px"
        class-name="!pa-0"
      >
        <template #label>
          <span>路由配置</span>
          <el-tooltip
            raw-content
            content="所有路由配置项均可直接在视图文件内配置<br>如果和子应用本身冲突,则可手动在本页面调整"
            placement="top"
          >
            <i class="uno-ep-question-filled"></i>
          </el-tooltip>
        </template>
        <ElTable :data="selectableRoutes" border>
          <ElTableColumn label="路由(name/meta.title)">
            <template #default="{ row }">
              <div>{{ row.name }}</div>
              <div>{{ row.meta?.title }}</div>
            </template>
          </ElTableColumn>
          <ElTableColumn width="120px">
            <template #header>
              <el-checkbox
                :model-value="allUsefulChecked"
                :indeterminate="isAllUsefulIndeterminate"
                @change="handleUsefulCheckAllChange"
              >
                <span>可用</span>
                <el-tooltip content="是否将路由同步到中台" placement="top">
                  <i class="uno-ep-question-filled"></i>
                </el-tooltip>
              </el-checkbox>
            </template>
            <template #default="{ row }">
              <el-checkbox v-model="row.checked" @change="handleUsefulChange"></el-checkbox>
            </template>
          </ElTableColumn>
          <ElTableColumn>
            <template #header>
              <span>可见</span>
              <el-tooltip content="在中台菜单中是否显示该路由" placement="top">
                <i class="uno-ep-question-filled"></i>
              </el-tooltip>
            </template>
            <template #default="{ row }">
              <el-checkbox v-model="row.meta.visible" :disabled="!row.checked">PC</el-checkbox>
              <el-checkbox v-model="row.meta.mobile" :disabled="!row.checked">移动端</el-checkbox>
            </template>
          </ElTableColumn>
          <ElTableColumn>
            <template #header>
              <span>权限</span>
              <el-tooltip content="路由权限, 用英文逗号分隔" placement="top">
                <i class="uno-ep-question-filled"></i>
              </el-tooltip>
            </template>
            <template #default="{ row }">
              <div>
                <el-input v-model="row.meta.permission"></el-input>
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn>
            <template #header>
              <span>图标</span>
              <el-tooltip
                raw-content
                content="可配置svg图标和fonticon图标<br>svg: 图标需要放在中台的svg文件夹下<br>fonticon: 图标需要中台配置有对应的fonticon图标集"
                placement="top"
              >
                <i class="uno-ep-question-filled"></i>
              </el-tooltip>
            </template>
            <template #default="{ row }">
              <div class="flex flex-col gap-2">
                <el-input v-model="row.meta.svg">
                  <template #prepend>SVG</template>
                </el-input>
                <el-input v-model="row.meta.icon">
                  <template #prepend>Icon</template>
                </el-input>
              </div>
            </template>
          </ElTableColumn>
        </ElTable>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { CheckboxValueType, ElTable, ElTableColumn } from 'element-plus'
import { cloneDeep, has, set } from 'lodash-es'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { routes } from 'vue-router/auto/routes'
import { useLoading } from '@/repositories'
import { BFF } from '@/api'
import { syncBlackList } from '@/plugins/router/config'
import type { CustomRoute } from '@/types/custom'
console.log('🚀 ~ file: route-sync.vue:152 ~ routes:', routes)

defineOptions({
  name: 'RouteSync'
})
const [buttonLoading, toggleButtonLoading] = useToggle(false)
const apps = reactive<Record<string, any>>({})
const appRoutesConfig = reactive<CustomRoute>({
  name: import.meta.env.VITE_APP_NAME,
  path: import.meta.env.VITE_APP_PATH,
  component: null,
  meta: {
    title: '',
    type: 'inner',
    status: true
  },
  children: []
})
const selectableRoutes = ref<CustomRoute[]>(
  routes
    .filter((route) => !syncBlackList.includes(route.name as string))
    .map((route) => {
      set(route, 'checked', false)
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
const handleUsefulCheckAllChange = (val: CheckboxValueType) => {
  allUsefulChecked.value = val as boolean
  for (const route of selectableRoutes.value) {
    route.checked = val as boolean
  }
}
const handleUsefulChange = (val: CheckboxValueType) => {
  val && !isAllUsefulIndeterminate.value && (allUsefulChecked.value = true)
  !val && !isAllUsefulIndeterminate.value && (allUsefulChecked.value = false)
}

const syncRoutes = () => {
  toggleButtonLoading(true)
  const params = cloneDeep(appRoutesConfig)
  const cloneRoutes = cloneDeep(selectedRoutes.value)
  if (!params.component) delete params.component
  params.children = cloneRoutes.map((route) => {
    route.path = route.path.replace('/', '')
    delete route.component
    delete route.checked
    if (!route.meta?.visible) {
      route.hidden = true
      delete route.meta!.visible
    }
    if (!route.meta?.mobile) delete route.meta!.mobile
    if (!route.meta?.svg) delete route.meta!.svg
    if (!route.meta?.icon) delete route.meta!.icon
    if (!route.meta?.permission) {
      delete route.meta!.permission
    } else {
      route.meta.permission = (route.meta.permission as string).split(',')
    }
    return route
  })
  apps[params.name as string] = params
  console.log({ apps })
  BFF.updateAppsRoutes(apps)
    .then((res) => {
      console.log({ res })
    })
    .finally(() => toggleButtonLoading(false))
}

const getApps = () => {
  useLoading({ target: '.loading' })
  BFF.getAppsRoutes().then((res) => {
    Object.keys(res.data).forEach((key) => (apps[key] = res.data[key]))
    if (has(apps, appRoutesConfig.name as string)) {
      setConfig(apps[appRoutesConfig.name as string])
    }
  })
}

function setConfig(config: CustomRoute) {
  appRoutesConfig.name = config.name
  appRoutesConfig.path = config.path
  appRoutesConfig.meta = config.meta
  appRoutesConfig.component = config.component
  selectableRoutes.value.forEach((route) => {
    const child = config.children?.find((child) => route.name === child.name) as CustomRoute
    route.checked = !!child
    route.meta!.visible = child ? !child.hidden : !route.meta!.hidden
    child?.meta?.mobile && (route.meta!.mobile = child.meta.mobile)
    !!child?.meta?.svg && (route.meta!.svg = child.meta.svg)
    !!child?.meta?.icon && (route.meta!.icon = child.meta.icon)
    if (child?.meta?.permission) {
      if (typeof child.meta.permission !== 'string') {
        route.meta!.permission = child.meta.permission.join(',')
      } else {
        route.meta!.permission = child.meta.permission
      }
    } else {
      if (route.meta?.permission && typeof route.meta.permission !== 'string') {
        route.meta.permission = route.meta.permission.join(',')
      }
    }
  })
  nextTick(() => {
    if (selectableRoutes.value.every((route) => route.checked === true))
      allUsefulChecked.value = true
  })
}

onMounted(() => getApps())
</script>
