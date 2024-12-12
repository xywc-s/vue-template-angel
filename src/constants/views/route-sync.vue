<route lang="yaml">
meta:
  title: 路由同步
  permission: YW
</route>

<template>
  <div class="max-w-1200px mx-auto loading mt-20px">
    <el-descriptions border :column="6">
      <template #title>
        <TitleBar title="路由同步"></TitleBar>
      </template>
      <template #extra>
        <!-- <el-button :loading="buttonLoading" type="primary" @click="getApps">
            <i class="uno-ep-download -ml-4px mr-4px"></i>
            <span>拉取</span>
          </el-button> -->
        <el-button :loading="buttonLoading" type="success" @click="syncRoutes">
          <i class="uno-ep-upload -ml-4px mr-4px"></i>
          <span>推送</span>
        </el-button>
      </template>
      <el-descriptions-item :span="2" label="应用名" label-class-name="w-120px">
        {{ app.name }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label="应用路径" label-class-name="w-120px">
        {{ app.path }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label="中台启用状态" label-class-name="w-120px">
        <el-switch></el-switch>
      </el-descriptions-item>
    </el-descriptions>

    <TitleBar class="mt-20px mb-8px" title="路由配置">
      <template #left>
        <el-tooltip
          raw-content
          content="所有路由配置项均可直接在视图文件内配置<br>如果和子应用本身冲突,则可手动在本页面调整"
          placement="top"
        >
          <i class="uno-ep-question-filled"></i>
        </el-tooltip>
      </template>
    </TitleBar>

    <ElTable :data="selectableRoutes" border>
      <ElTableColumn label="路由(name/meta.title)">
        <template #default="{ row }">
          <div>{{ row.name }}</div>
          <div>{{ row.meta?.title }}</div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="权限" prop="meta.permission"></ElTableColumn>
      <ElTableColumn label="图标" prop="meta.icon">
        <template #default="{ row }">
          <i :class="row.meta.icon"></i>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { ElLoadingService, ElTable, ElTableColumn } from 'element-plus'
import { computed, ref } from 'vue'
import { routes } from 'vue-router/auto-routes'
import { useService } from '@angelyeast/service'
import { useFetch } from '@angelyeast/repository'
import { useRouter } from 'vue-router'

console.log('🚀 ~ file: route-sync.vue:152 ~ routes:', routes)

defineOptions({
  name: 'RouteSync'
})
const remoteAppRoutes = ref()
const [buttonLoading, toggleButtonLoading] = useToggle(false)
const app = {
  name: import.meta.env.VITE_APP_NAME,
  path: import.meta.env.VITE_APP_PATH
}

const selectableRoutes = computed(() =>
  useRouter()
    .getRoutes()
    .filter((route) => route.name && !!route.meta?.sync)
)
console.log('🚀 ~ selectableRoutes:', selectableRoutes.value)

const syncRoutes = () => {
  toggleButtonLoading(true)
  // useFetch(() => useService('BFF').Apps(apps), {
  //   loading: toggleButtonLoading
  // })
}

useFetch(
  () =>
    useService('BFF').Apps.findOne({
      where: app,
      relations: ['routes']
    }),
  {
    loading: ElLoadingService({ target: '.loading' }),
    autoNotify: false,
    onSuccess: ({ data }) => {
      if (data?.routes) remoteAppRoutes.value = data.routes
    }
  }
)
</script>
