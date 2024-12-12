import { defineAsyncComponent, type App } from 'vue'

export default {
  install: (app: App) => {
    app.component(
      'UserInfo',
      defineAsyncComponent(() => import('middle-ui/UserInfo'))
    )
    app.component(
      'TitleBar',
      defineAsyncComponent(() => import('middle-ui/TitleBar'))
    )
    app.component(
      'SvgIcon',
      defineAsyncComponent(() => import('middle-ui/SvgIcon'))
    )
  }
}
