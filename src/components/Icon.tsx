import { defineComponent, h } from 'vue'
import * as icons from '@ant-design/icons-vue'

const Icon = defineComponent({
  name: 'myIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => {
      const antIcon: { [key: string]: any } = icons
      return h(antIcon[props.name])
    }
  }
})

export default Icon
