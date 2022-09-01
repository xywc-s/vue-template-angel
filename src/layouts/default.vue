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
            <template #default="{ user }">
              <el-avatar :size="36" :src="user?.weChatJson?.avatar"></el-avatar>
            </template>
          </UserInfo>
        </div>

        <template v-for="{ path, children } in $router.options.routes" :key="path">
          <template
            v-if="
              !children[0].hidden &&
              (children[0].meta.permission ? $hasPermission(children[0].meta.permission) : true)
            "
          >
            <el-sub-menu v-if="children[0].children" :index="path">
              <template #title>
                <div>{{ children[0].meta.title }}</div>
              </template>
              <ChildRoute :routes="children[0].children" :base-path="path"></ChildRoute>
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

<script setup lang="ts" name="AppLogin">
import { useRoute } from 'vue-router'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
const appStore = useApp()
const userStore = useUser()
const defaultActive = useRoute().path
</script>
