<template>
  <div class="box loading pt-20px pb-40px">
    <el-descriptions border :column="6">
      <template #title>
        <TitleBar title="路由同步"></TitleBar>
      </template>
      <template #extra>
        <Button v-if="!app.id" status="warning" @click="initApp">初始化应用</Button>
        <Button v-else preset="upload" :loading="buttonLoading" @click="syncRoutes">推送</Button>
      </template>
      <el-descriptions-item v-for="item in appAttrs" :key="item.field" v-bind="item.props">
        <el-switch
          v-if="item.field === 'status'"
          v-model="app.status"
          :disabled="!app.id"
          @change="statusChange"
        ></el-switch>
        <div v-else>{{ app[item.field] }}</div>
      </el-descriptions-item>
    </el-descriptions>

    <TitleBar class="mt-20px mb-8px" title="路由配置"></TitleBar>

    <VxeGrid
      :data="selectableRoutes"
      :columns="columns"
      border
      :row-config="{ keyField: 'name', useKey: true }"
    >
      <template #status="{ row }">
        <i
          :class="[
            'uno-icon-park-solid:check-one',
            'text-1.4em',
            syncedRoutes.includes(row.name)
              ? 'text-[var(--el-color-success)]'
              : row.id
                ? 'text-[var(--el-color-warning)]'
                : 'text-[var(--el-color-info)]'
          ]"
        ></i>
      </template>
      <template #name="{ row }">
        <ElTooltip :content="row.path" placement="top">
          <div inline-block cursor="default">
            <span>{{ row.meta?.title }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ row.name }}</span>
          </div>
        </ElTooltip>
      </template>
    </VxeGrid>
  </div>
</template>

<script setup lang="ts">
import { DescriptionItemProps, ElLoadingService } from 'element-plus'
import { BFF } from '@angelyeast/service'
import { useFetch, validParams } from '@angelyeast/repository'
import { RouteRecordNormalized, useRouter } from 'vue-router'
import { isEqual, omit, pick, set, sortBy, unset } from 'lodash-es'
import { VxeGridPropTypes } from 'vxe-table'
import Button from '@#/Button'
definePage({ meta: { title: '路由同步', permission: 'YW' } })
/** 排除的路由属性 */
const excludeKeys = [
  'aliasOf',
  'beforeEnter',
  'children',
  'components',
  'enterCallbacks',
  'instances',
  'leaveGuards',
  'updateGuards'
] as const
type RemoteRoute = Omit<RouteRecordNormalized, (typeof excludeKeys)[number]> & { id: number }
const remoteAppRoutes = ref<RemoteRoute[]>([])
const [buttonLoading, toggleButtonLoading] = useToggle(false)
const app = ref({
  id: '',
  name: import.meta.env.VITE_APP_NAME,
  path: import.meta.env.VITE_APP_PATH,
  status: false
})
const attrProps = { span: 2, labelClassName: 'w-120px' }
const appAttrs: Array<{
  field: string
  props: Partial<DescriptionItemProps>
}> = [
  { field: 'name', props: { ...attrProps, label: '应用名' } },
  { field: 'path', props: { ...attrProps, label: '应用路径' } },
  { field: 'status', props: { ...attrProps, label: '中台启用状态' } }
]

/** 路由配置表格列 */
const columns: VxeGridPropTypes.Columns = [
  {
    field: 'status',
    title: '同步状态',
    width: '80px',
    align: 'center',
    slots: { default: 'status' }
  },
  { title: '路由', slots: { default: 'name' } },
  { field: 'meta.permission', title: '权限', align: 'center', width: '100px' },
  {
    field: 'meta.icon',
    title: '图标',
    align: 'center',
    width: '50px',
    slots: { default: ({ row }) => h('i', { class: [row.meta.icon, 'text-1.4em'] }) }
  },
  {
    title: '操作',
    width: '80px',
    align: 'center',
    slots: {
      default: ({ row }) =>
        syncedRoutes.value.includes(row.name)
          ? []
          : Button({
              preset: 'sync',
              size: 'small',
              mode: 'text',
              loading: buttonLoading.value,
              onClick: () => routeSync(row)
            })
    }
  }
]

/** 可同步的所有路由 */
const selectableRoutes = ref(
  sortBy(
    useRouter()
      .getRoutes()
      .filter((route) => route.name && !!route.meta?.sync)
      .map((route) => {
        if (Object.hasOwn(route, 'redirect')) unset(route, 'redirect')
        if (route.path.startsWith('/') && !route.path.startsWith(app.value.path))
          route.path = app.value.path + route.path
        return omit(route, ...excludeKeys)
      }),
    'meta.order'
  )
)

const syncRoutes = () => {
  // useNotify('一个个同步并认真检查。', 'warning')
}

/** 切换当前应用在中台配置中的启用状态 */
const statusChange = (val) => {
  useFetch(() => BFF.Apps.update(app.value), {
    loading: ElLoadingService({ target: '.loading' }),
    onError: () => (app.value.status = !val)
  })
}

/** 中台环境中没有配置当前应用的路由，先完成应用配置的初始化 */
const initApp = () => {
  useFetch(() => BFF.Apps.save(validParams(app.value)), {
    loading: toggleButtonLoading,
    onSuccess: search
  })
}

/** 搜索 */
const search = () => {
  const fn = BFF.Apps.findOne.bind(null, {
    where: pick(app.value, 'name', 'path'),
    relations: ['routes']
  })
  useFetch(fn, {
    loading: ElLoadingService({ target: '.loading' }),
    autoNotify: false,
    onSuccess: ({ data }) => {
      app.value.id = data.id
      app.value.status = data.status
      remoteAppRoutes.value = data.routes
      updeteRouteSyncStatus()
    }
  })
}

/** 已完成同步的路由：中台配置和本地一致 */
const syncedRoutes = ref<string[]>([])
/** 根据中台配置更新本地路由信息 */
const updeteRouteSyncStatus = () => {
  selectableRoutes.value.forEach((route) => {
    const remoteRoute = remoteAppRoutes.value.find((o) => o.name === route.name)
    if (!remoteRoute) return
    set(route, 'id', remoteRoute.id)
    if (isEqual(remoteRoute, route)) syncedRoutes.value.push(route.name as string)
  })
}

/** 同步路由信息到中台 */
const routeSync = (row) => {
  const { save, update } = BFF.Route
  const fn = () =>
    row.id
      ? update({ id: row.id, app: app.value, routeInfo: row })
      : save({ app: app.value, routeInfo: row })
  useFetch(fn, { loading: ElLoadingService({ target: '.loading' }), onSuccess: search })
}

search()
</script>
