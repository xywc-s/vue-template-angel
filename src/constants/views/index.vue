<template>
  <div v-loading="true" w="full" :style="{ height: height + 'px' }"></div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { decode, encode } from 'js-base64'
import { Auth, Open } from '@angelyeast/service'
import { useNotify, isWorkWechat } from '@angelyeast/repository'
import { useToken } from '@angelyeast/micro-frontend'
import { useAppStore } from '@/stores/app'
defineOptions({
  name: 'AppHome'
})
definePage({
  name: 'index',
  meta: {
    title: '首页',
    hidden: true,
    whiteList: true
  }
})
const route = useRoute()
const appStore = useAppStore()
const { setJWT } = useToken()

const MiddleURL = import.meta.env.VITE_MIDDLE_LOGIN_URL
const AppID = import.meta.env.VITE_WECHAT_APPID
const currentUrl = new URL(location.href)
const token = currentUrl.searchParams.get('token')
const code = currentUrl.searchParams.get('code') || (route.query.code as string)
const rewrite = currentUrl.searchParams.get('state') || (route.query.rewrite as string)
const urlPrefix = `${location.origin}${location.pathname}`

const height = document.body.clientHeight

/** 根据记录的最初访问路由重定向到目标页面 */
const pass = () => {
  if (rewrite) return location.replace(`${urlPrefix}#${decode(rewrite)}`)
  if (appStore.rewrite) return location.replace(`${urlPrefix}#${appStore.rewrite}`)
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
  location.replace(`${urlPrefix}#/404`)
}

onBeforeMount(async () => {
  if (code) {
    // 企业微信登录回调拿到url上的鉴权code
    const jwt = await Auth.loginByWeChatCode(code)
    if (!jwt?.access_token) return useNotify('企业微信授权code登录失败！', 'error')
    await setJWT(jwt)
    pass()
  } else if (token) {
    // 中台扫码登录回调拿到url上的token
    const jwt = JSON.parse(decode(token.split('.')[1]))
    jwt.access_token = token
    await setJWT(jwt)
    pass()
  } else {
    const state = appStore.rewrite ? encode(`${appStore.rewrite}`, true) : ''
    if (isWorkWechat()) {
      const encodeURI = encodeURIComponent(location.href)
      Open.workWechatAuth(AppID, encodeURI, state)
    } else {
      Open.middleAuth(MiddleURL, urlPrefix, state)
    }
  }
})
</script>
