# 安装

> Node 版本 14.18+或者 16+, 推荐使用[pnpm](https://pnpm.io/)包管理器进行依赖的安装管理. (默认使用 pnpm 进行依赖树的管理 - pnpm-lock.yaml)

`pnpm install` 或 `yarn install` 或 `npm install`

# 启动

<strong>请不要将配置发布到公共仓库</strong><br>
从内部获取所需环境变量填充对应环境的配置文件, 部分仅为了方便开发所用的临时环境变量, 可复制对应环境的配置文件, 在原文件名后追加.local, 如.env.development.local, 该文件会被 git 忽略, 可放心食用.<br>

项目的登录目前分为三种模式: **开发登录**、**中台扫码登录**、**企业微信自动登录**

### 开发登录(**此方式仅适用于开发模式, 请不要用于生产!**)

在开发环境配置文件内配置`VITE_USER_TOKEN`和`VITE_USER_CODE`, 修改`VITE_USER_CODE`可切换登录用户.<br>
`VITE_USER_TOKEN`: 对应环境的登录 token<br>
`VITE_USER_CODE`: 登录用户的员工编号<br>

### 中台扫码登录

排除在企业微信内打开应用的情况, 默认以此方式登录.<br>

### 企业微信自动

在企业微信内打开应用时, 默认以企业微信当前用户登录.<br>

## 独立启动

`pnpm dev` 或 `yarn dev` 或 `npm run dev`

## 作为中台的子应用启动

当需要在中台下进行开发调试时, 需要在中台配置子应用的代理, 根据子应用启动的地址和公共基础路径, 例如启动地址`localhost:3000`, 公共基础路径为`inventory-web`, 在中台`devServer.js`文件中配置对应的代理.

```js
proxy: {
  /inventory-web/: {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}
```

**由于项目可能会作为中台子应用, 此时路由跳转将由中台进行代理(设置路由标签, 缓存路由状态, 更新网页 title 等), 所以项目的开发中, 所有需要进行路由跳转的操作请使用 appStore.router 进行调用.**

# 设置

项目默认包含了 vscode 编辑器的相关设置, 例如推荐扩展、格式化配置等, 协同开发请尽可能保持一致性. (此为工作区设置, 仅作用于当前项目, 不影响全局设置和其他项目)

# API

基于后端分布式微服务架构, 项目根据可能用到的服务对 API 相关设置进行了服务配置解耦.

1. 服务地址在环境配置文件下配置对应的环境变量, 注意环境变量需要以 `VITE_` 开头, 例如 `VITE_API_CIMS`, 用于请求 CIMS 服务提供的 API.
2. 请求相关配置统一存放在 `/src/utils/request` 文件夹下, `config.js` 存放不同请求头的配置, `interceptors.js` 存放请求拦截器配置.
3. 各个服务器的请求实例和接口配置统一存放在 `/src/api` 文件夹下, 为不同服务各自创建请求实例, 并根据不同服务的不同要求灵活装配对应的请求头和拦截器.

# 插件

项目集成了众多适用于 vue3 的 vite 插件, 插件相关配置统一存放在 `/src/plugins` 文件夹下. 每个插件对应的 js 配置文件内都有相关的文档链接, 可灵活查阅.

- 路由(router.js)
- 路由管理、自动生成(router-pages.js)
- 路由布局管理(rouer-layouts.js)
- 国际化(i18n.js)
- 国际化辅助插件、模板代码块支持(i18n-helper.js)
- html 模板自定义插件(create-html.js)
- svg(svg.js)
- 原子化 css、字体图标库(unocss.js)
- 组件自动导入(unplugin-components.js)
- 全局变量管理(global-properties.js)

# 状态管理

状态管理使用的管理库为 [pinia](https://pinia.vuejs.org/), vue 官方推荐的状态管理库, 且支持 vue-devtools.

# 相关问题

- vue3 扩展(volar)对 VSCode 版本有要求, 如遇到格式化、代码提示等相关问题, 注意查看是否扩展和编辑器版本不匹配
