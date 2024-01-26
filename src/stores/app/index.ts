import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLanguage } from '@/stores/app/language'
import { useInstanceRouter } from '@/stores/app/router'
import { useAppInstance } from '@/stores/app/instance'
import { useTag } from '@/stores/app/tag'
import { useBreakpoint } from '@/stores/app/breakpoints'
import { useDate } from '@/stores/app/date'

export const useAppStore = defineStore('app', () => {
  /** 云存储文件路径 */
  const minioPath = import.meta.env.VITE_MINIO_PATH

  /** 登录回调地址 */
  const rewrite = ref<string>()

  return {
    /** 云存储文件路径 */
    minioPath,
    /** 登录回调地址 */
    rewrite,
    ...useAppInstance(),
    ...useInstanceRouter(),
    ...useTag(),
    ...useLanguage(),
    ...useBreakpoint(),
    ...useDate()
  }
})
