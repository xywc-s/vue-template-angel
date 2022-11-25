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

**由于项目可能会作为中台子应用, 此时所有用户操作触发的路由跳转, 将由中台进行代理(中台需要根据跳转的路由来设置路由标签, 缓存路由状态, 更新网页标题等), 所以在项目的开发过程中, 所有涉及用户操作触发的路由跳转, 请使用 useApp().router 进行调用, 调用参数必须使用路由 name(约束唯一, 若使用 path, 中台则无法区分应该跳转到哪个应用). 它是一个兼容了中台路由和本地路由的代理对象, 会根据当前应用所处的环境, 自行判断需要调用中台的路由还是当前项目的路由.**

# 路由同步

可视化的路由同步操作页面, 可以将本地路由一键同步到目标环境中, 目标环境通过环境变量配置文件内的 `VITE_API_BFF` 决定

# 设置

项目默认包含了 vscode 编辑器的相关设置, 例如推荐扩展、格式化配置等, 协同开发请尽可能保持一致性. (此为工作区设置, 仅作用于当前项目, 不影响全局设置和其他项目)

# API

基于后端分布式微服务架构, 项目根据可能用到的服务对 API 相关设置进行了服务配置解耦.

1. 服务地址在环境配置文件下配置对应的环境变量, 注意环境变量需要以 `VITE_` 开头, 例如 `VITE_API_CIMS`, 用于请求 CIMS 服务提供的 API.
2. 相关配置统一存放在 `src/api` 文件夹下, `config.js` 存放不同服务接口需要装配的配置, `interceptors/*` 存放请求、响应拦截器配置.
3. 各个服务器的请求实例和接口配置统一存放在 `src/api/service` 文件夹下, 为不同服务各自创建请求实例, 并根据不同服务的不同要求灵活装配对应的请求头和拦截器.
4. 将每个服务包装成一个服务类, 不同模块包装为服务类的静态对象, 不同模块下的接口包装为静态对象里面的方法, 在 API 服务的入口文件 `src/api/index.js` 将服务类导出, 这样在使用的时候便能从统一的入口文件导入不同的服务, 服务-模块-接口方法的结构一目了然. 例如

```js
import { Auth, MMS, CIMS, BFF } from '@/api'
Auth.User.findByUnique('usercode')
CIMS.Dictionary.findAll({ page: 1, rows: 100 })
```

当然, 你也可以直接从对应的服务入口分别导入对应的服务, 但个人认为这没什么必要. 例如

```js
import { Auth } from '@/api/service/auth'
Auth.User.findByUnique('usercode')
```

如果你喜欢, 你甚至可以从不同的服务模块入口直接导入指定的接口请求函数, 例如

```js
import { findByUnique, findUserByCodes, findUserList } from '@/service/auth/user'
findByUnique('usercode')
findUserByCodes(['usercode', 'usercode'])
findUserList()
```

# 插件

项目集成了众多适用于 vue3.x 的 vite 插件, 它们极大的扩展了 vue 的开发能力, 减少了人工配置的工作.
插件相关配置统一存放在 `src/plugins` 文件夹下. 每个插件对应的配置文件内都有相关的文档链接, 可灵活查阅.

- 路由(router/index)
- 路由管理、自动生成(router/pages)
- 路由布局管理(router/layouts)
- 国际化(i18n/index)
- 国际化辅助插件、模板代码块支持(i18n/vue-i18n)
- html 模板自定义插件(create-html)
- svg(svg)
- 原子化 css、字体图标库(unocss)
- 组件自动导入(unplugin-components)
- 全局变量管理(global-properties, vue3.x 版本基本不再需要将某些能力挂载到全局, 保留此项仅为了去兼容部分没有适配 vue3.x 的插件和工具包)

# 状态管理

状态管理使用的管理库为 [pinia](https://pinia.vuejs.org/), vue 官方推荐的状态管理库, 且支持 vue-devtools.

# 逻辑复用

这是指导 vue 升级到 3.x 的核心思想, 为了更好、更方便、更明确地复用逻辑代码, 强调关注点分离和逻辑复用, 将一切能复用的逻辑封装为功能函数, 统一存放在 `src/repositories` 文件夹下, 项目不同模块的复用逻辑可以分别创建各自的逻辑复用文件, 如 `src/repositories/user`

# 相关问题

- vue3 扩展(volar)对 VSCode 版本有要求, 如遇到格式化、代码提示等相关问题, 注意查看是否扩展和编辑器版本不匹配
- 循环依赖的问题
  当出现循环依赖时, 开发环境下更新视图组件会导致整个实例重新渲染挂载, 且有可能出现依赖项未初始化的错误提示, 此时可通过[madge](https://github.com/pahen/madge)工具检测循环依赖, 并进行相关逻辑处理.
