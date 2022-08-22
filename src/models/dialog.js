import { useToggle } from '@vueuse/core'
import { assign } from 'lodash-es'
import { reactive } from 'vue'

export default class Dialog {
  #options
  #toggleVisible
  constructor(options = {}) {
    const [visible, toggleVisible] = useToggle(false)
    this.#toggleVisible = toggleVisible
    this.#options = reactive({
      modelValue: visible,
      'onUpdate:modelValue': (val) => toggleVisible(val),
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
    this.#init(options)
  }

  #init(options) {
    assign(this.#options, options)
  }

  use = () => {
    return {
      dialogOptions: this.#options,
      toggleVisible: this.#toggleVisible
    }
  }
}
