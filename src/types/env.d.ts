/* eslint no-unused-vars: 0 */
interface ImportMetaEnv {
  readonly VITE_DEV_PORT: string
  readonly VITE_USER_TOKEN: string
  readonly VITE_USER_CODE: string

  readonly VITE_APP_NAME: string
  readonly VITE_APP_PATH: string
  readonly VITE_ROUTE_AUTO_PREFIX: boolean

  readonly VITE_MIDDLE_LOGIN_URL: string
  readonly VITE_WECHAT_LOGIN_URL: string
  readonly VITE_WECHAT_APPID: string

  readonly VITE_API_SECURITY: string
  readonly VITE_API_BFF: string
  readonly VITE_API_INVENTORY: string
  readonly VITE_API_CIMS: string
  readonly VITE_API_MMS: string
  readonly VITE_API_MOCK: string

  readonly VITE_PREVIEW_URL: string
  readonly VITE_MINIO_PATH: string

  // 更多环境变量...
}
