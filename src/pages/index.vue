<route>
name: index
meta:
  hidden: true
  title: 首页
  whiteList:  true
</route>
  
  <template>
    <div v-loading="true" class="h-full w-full"></div>
  </template>
  
  <script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import { useRoute } from 'vue-router'
  import { decode, encode } from 'js-base64'
  import { useService } from '@angelyeast/service'
  import { useNotify, isWorkWechat } from '@angelyeast/repository'
  import { useToken } from '@angelyeast/micro-frontend'
  import { useAppStore } from '@/stores/app'
  defineOptions({
    name: 'AppHome'
  })
  const route = useRoute()
  const appStore = useAppStore()
  const { checkTokenValid, setJWT } = useToken()
  
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
  
  onBeforeMount(async () => {
    if (checkTokenValid()) {
      pass()
    } else if (code) {
      // 企业微信登录回调拿到url上的鉴权code
      const { object, message, success } = await useService('Auth').loginWithWeChatCode({ code })
      if (!success) return useNotify(message, 'error')
      setJWT(JSON.parse(object))
      pass()
    } else if (token) {
      // 中台扫码登录回调拿到url上的token
      const jwt = JSON.parse(decode(token.split('.')[1]))
      jwt.access_token = token
      setJWT(jwt)
      pass()
    } else {
      const state = appStore.rewrite ? encode(`${appStore.rewrite}`, true) : ''
      if (isWorkWechat()) {
        const encodeURI = encodeURIComponent(location.href)
        useService('OPEN').workWechatAuth(AppID, encodeURI, state)
      } else {
        useService('OPEN').middleAuth(MiddleURL, urlPrefix, state)
      }
    }
  })
  </script>
  