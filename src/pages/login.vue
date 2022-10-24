<template>
  <div></div>
</template>

<script setup lang="ts" name="Login">
import { onBeforeMount, useAttrs } from 'vue'
import { useRoute } from 'vue-router'
import { decode } from 'js-base64'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import { isWorkWeChat } from '@/utils'
import Auth from '@/api/auth'

const route = useRoute()
const userStore = useUser()
const appStore = useApp()
const attrs = useAttrs()

const MiddleURL = import.meta.env.VITE_MIDDLE_LOGIN_URL
const AppURL = import.meta.env.VITE_WECHAT_LOGIN_URL
const AppID = import.meta.env.VITE_WECHAT_APPID
const currentUrl = new URL(location.href)
const token = currentUrl.searchParams.get('token')
const workWechatLoginCode = route.query.workWechatLoginCode
const rewrite = currentUrl.searchParams.get('rewrite') || route.query.rewrite

const pass = (user: any) => {
  userStore.setUser(user)
  if (rewrite) {
    appStore.router.replace(atob(rewrite as string))
  } else {
    appStore.router.replace('/')
  }
}

onBeforeMount(async () => {
  if (workWechatLoginCode) {
    // 企业微信登录回调拿到url上的workWechatLoginCode
    const user = await Auth.loginWithWeChatCode({ code: workWechatLoginCode as string })
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
    if (isWorkWeChat()) {
      const url = `${location.origin}${location.pathname}#/login?rewrite=${attrs.rewrite}`
      location.replace(`${AppURL}?appid=${AppID}&url=${btoa(url)}`)
    } else {
      const url = `${location.origin}${location.pathname}?rewrite=${attrs.rewrite}#/login`
      location.replace(`${MiddleURL}?redirect=${url}`)
    }
  }
})
</script>

<route lang="yaml">
meta:
  hidden: true
  title: 登录
</route>
