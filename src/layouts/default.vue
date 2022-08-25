<template>
  <el-container>
    <el-header height="auto" class="!px-0">
      <el-menu
        v-if="!appStore.isChildApp"
        :collapse="appStore.isMobile"
        mode="horizontal"
        router
        :default-active="defaultActive"
        class="items-center"
      >
        <div class="px-20px">
          <UserInfo :value="userStore.user.id" custom>
            <template v-slot="{user}">
              <el-avatar :size="36" :src="user?.weChatJson?.avatar"></el-avatar>
            </template>
          </UserInfo>
        </div>

        <template v-for="{ path, children } in $router.options.routes" :key="path">
          <template v-if="!children[0].hidden && $hasPermission(children[0].meta.permission)">
            <el-sub-menu v-if="children[0].children" :index="path">
              <template #title>
                <div>{{ children[0].meta.title }}</div>
              </template>
              <child-route :routes="children[0].children" :base-path="path"></child-route>
            </el-sub-menu>
            <el-menu-item v-else :index="path">{{ children[0].meta.title }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import { useRoute } from 'vue-router'
const appStore = useApp()
const userStore = useUser()
const defaultActive = useRoute().path
</script>
<style>
.el-main {
  overflow: initial;
}
</style>
