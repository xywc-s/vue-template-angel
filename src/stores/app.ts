import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const minioPath = import.meta.env.VITE_MINIO_PATH

  const rewrite = ref<string>()

  return {
    /** 云存储文件路径 */
    minioPath,
    /** 登录回调地址 */
    rewrite
  }
})
