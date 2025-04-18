export const useAppStore = defineStore('app', () => {
  const minioPath = import.meta.env.VITE_MINIO_PATH

  const rewrite = ref<string>()

  type LayoutType = 'FloatMenus'
  const layout = ref<LayoutType>('FloatMenus')

  const setLayout = (v: LayoutType) => {
    layout.value = v
  }

  return {
    /** 页面布局 */
    layout,
    setLayout,
    /** 云存储文件路径 */
    minioPath,
    /** 登录回调地址 */
    rewrite
  }
})
