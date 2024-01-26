<route lang="yaml">
name: index
meta:
  hidden: true
  title: 首页
</route>

<template>
  <div v-loading="true" class="h-full w-full"></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { decode, encode } from 'js-base64'
import { isWorkWechat } from '@xywc-s/utils'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { Auth } from '@/api'
import { useNotify } from '@/repositories'
defineOptions({
  name: 'AppHome'
})
const route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()

const MiddleURL = import.meta.env.VITE_MIDDLE_LOGIN_URL
const AppID = import.meta.env.VITE_WECHAT_APPID
const currentUrl = new URL(location.href)
const token = currentUrl.searchParams.get('token')
const code = currentUrl.searchParams.get('code') || (route.query.code as string)
const rewrite = currentUrl.searchParams.get('state') || (route.query.rewrite as string)
const urlPrefix = `${location.origin}${location.pathname}`

/** 根据记录的最初访问路由重定向到目标页面 */
const pass = () => {
  if (rewrite) return location.replace(`${urlPrefix}#${decode(rewrite)}`)
  /**
   * 当记录的访问路由不存在时说明访问的是项目根目录
   * 根目录作为项目鉴权入口, 不允许被作为目标路由直接访问
   * 不管是企业微信工作台还是作为中台子应用, 都没有需要直接访问项目根目录的实际需求
   * 如果访问的是根目录, 则重定向到404路由
   */
  useNotify({
    title: '访问的页面不存在!',
    message: rewrite,
    type: 'error'
  })
  location.replace(`${urlPrefix}#/all`)
}

/** 企业微信Oauth鉴权 */
const workWechatAuth = (appid: string, redirectUrl: string, state: string) => {
  location.replace(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
  )
}

/** 中台鉴权 */
const middleAuth = (
  /** 中台鉴权地址 */
  authUrl: string,
  /** 完成鉴权后的回调地址 */
  redirectUrl: string,
  /** 需要在回调时带回来的状态数据 */
  state: string
) => {
  location.replace(`${authUrl}?redirect=${redirectUrl}?state=${state}`)
}

onBeforeMount(async () => {
  if (userStore.checkTokenValid()) {
    pass()
  } else if (code) {
    // 企业微信登录回调拿到url上的鉴权code
    try {
      const user = await Auth.loginWithWeChatCode({ code })
      if (user) {
        userStore.setUser(user)
        pass()
      }
    } catch (error: any) {
      useNotify(error?.message)
    }
  } else if (token) {
    // 中台扫码登录回调拿到url上的token
    const user = JSON.parse(decode(token.split('.')[1]))
    user.access_token = token
    userStore.setUser(user)
    pass()
  } else {
    const state = appStore.rewrite ? encode(`${appStore.rewrite}`, true) : ''
    if (isWorkWechat()) {
      const encodeURI = encodeURIComponent(location.href)
      workWechatAuth(AppID, encodeURI, state)
    } else {
      middleAuth(MiddleURL, urlPrefix, state)
    }
  }
})
</script>
