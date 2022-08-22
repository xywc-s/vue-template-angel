import i18n from '@/plugins/i18n'
import { useApp } from '@/stores/app'
import dayjs from 'dayjs'
import { assign, isObject } from 'lodash-es'
import { reactive } from 'vue'
const appStore = useApp()

export default class DatePicker {
  #options
  constructor(options) {
    this.#options = reactive({
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      disabledDate: (time) => {
        return time.getTime() < dayjs(appStore.serverTime).valueOf()
      },
      shortcuts: [
        {
          text: i18n.global.t('Long Term'),
          value: () => {
            return dayjs('2199-12-31').toDate()
          }
        },
        {
          text: i18n.global.t('Postponed for Five Years'),
          value: () => {
            return dayjs(appStore.serverTime).add(5, 'y').toDate()
          }
        },
        {
          text: i18n.global.t('Postponed for Four Years'),
          value: () => {
            return dayjs(appStore.serverTime).add(4, 'y').toDate()
          }
        },
        {
          text: i18n.global.t('Postponed for Three Years'),
          value: () => {
            return dayjs(appStore.serverTime).add(3, 'y').toDate()
          }
        },
        {
          text: i18n.global.t('Postponed for Two Years'),
          value: () => {
            return dayjs(appStore.serverTime).add(2, 'y').toDate()
          }
        },
        {
          text: i18n.global.t('Postponed for One Years'),
          value: () => {
            return dayjs(appStore.serverTime).add(1, 'y').toDate()
          }
        },
        {
          text: i18n.global.t('Postponed for Six Months'),
          value: () => {
            return dayjs(appStore.serverTime).add(6, 'M').toDate()
          }
        }
      ]
    })

    if (isObject(options)) assign(this.options, options)
  }

  use() {
    return {
      options: this.#options
    }
  }
}
