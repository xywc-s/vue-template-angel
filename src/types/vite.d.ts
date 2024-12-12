/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

/* eslint no-unused-vars: 0 */
interface ImportMetaEnv {
  readonly VITE_DEV_PORT: number
  readonly VITE_USER_TOKEN: string
  readonly VITE_USER_CODE: string

  readonly VITE_APP_NAME: string
  readonly VITE_APP_PATH: string
  readonly VITE_ROUTE_AUTO_PREFIX: boolean

  readonly VITE_MIDDLE_LOGIN_URL: string
  readonly VITE_WECHAT_APPID: string
  readonly VITE_REMOTE_UI: string

  readonly VITE_API_MICRO: string
  readonly VITE_API_BFF: string
  readonly VITE_API_MOCK: string

  readonly VITE_PREVIEW_URL: string
  readonly VITE_MINIO_PATH: string

  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
