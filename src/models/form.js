import i18n from '@/plugins/i18n'
import { isObject, merge } from 'lodash-es'
import { reactive } from 'vue'

export default class Form {
  #formRef
  #options
  constructor(options) {
    this.#options = reactive({
      // ref: '$form'
    })
    if (options && isObject(options)) merge(this.#options, options)
  }

  #userValidate = (form, value, cb) => {
    if (!value) return cb(i18n.global.t('Required'))
    if (form?.user?.code) {
      cb()
    } else {
      cb(i18n.global.t('An effective Responsable People must be chosen'))
    }
  }

  #initRules(form) {
    return {
      required: { required: true, message: i18n.global.t('Required'), trigger: ['change'] },
      user: [
        {
          validator: (rule, value, cb) => this.#userValidate(form, value, cb),
          trigger: ['change']
        }
      ]
    }
  }

  use() {
    return {
      formOptions: this.#options
    }
  }

  useRef(formRef) {
    this.#formRef = formRef
    return {
      reset: this.#formRef.value.resetFields
    }
  }
  useRules(form) {
    return this.#initRules(form)
  }
}
