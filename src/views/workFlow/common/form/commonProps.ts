import { PropType } from 'vue'

export const commonProps = {
  mode: {
    type: String as PropType<string>,
    default: 'DESIGN'
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}
