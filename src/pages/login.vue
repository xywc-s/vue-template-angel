<route lang="yaml">
meta:
  hidden: true
  title: 登录
</route>

<template>
  <div></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { decode, encode } from 'js-base64'
import { isWorkWechat } from '@xywc-s/utils'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { Auth } from '@/api'
defineOptions({
  name: 'Login'
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

const pass = (user: any) => {
  userStore.setUser(user)
  if (rewrite) {
    location.replace(`${urlPrefix}#${decode(rewrite)}`)
  } else {
    location.replace(`${urlPrefix}`)
  }
}

onBeforeMount(async () => {
  if (code) {
    // 企业微信登录回调拿到url上的workWechatLoginCode
    const user = await Auth.loginWithWeChatCode({ code })
    if (user) pass(user)
  } else if (token) {
    // 中台扫码登录回调拿到url上的token
    const user = JSON.parse(decode(token.split('.')[1]))
    user.access_token = token
    pass(user)
  } else {
    /**
     * 具体看中台相关代码
     * 企业微信登录: 此时中台适配的是vue-router hash模式路由
     * https://middle.angelyeast.com/wechat/loginRoute.html
     *
     * 中台扫码登录: 此时中台适配的是URL对象
     * 中台项目 - src/views/login/index.vue (redirectToUrl方法)
     *
     * 两者的区别
     * 对于链接 https://xxx.xxx.xxx/#/login?abc=888
     * vue-router hash模式匹配#之后?之前的为hash(/login), ?之后的为query(abc=888)
     * URL匹配#之后的全部内容为hash(/login?abc=888)
     * 对于链接 https://xxx.xxx.xxx/?abc=888#/login
     * vue-router hash模式匹配与上面相同, 所以hash(/login), query(空对象)
     * URL先匹配到?之后#之前的内容为query(abc=888),后匹配到#之后的为hash(/login)
     */
    const state = encode(`${appStore.rewrite}`, true)
    if (isWorkWechat()) {
      const encodeURI = encodeURIComponent(location.href)
      location.replace(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppID}&redirect_uri=${encodeURI}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
      )
    } else {
      location.replace(`${MiddleURL}?redirect=${urlPrefix}?state=${state}#login`)
    }
  }
})
</script>
