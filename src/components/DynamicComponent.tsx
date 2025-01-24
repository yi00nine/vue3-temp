import { defineComponent, defineAsyncComponent, h } from 'vue'

export default defineComponent({
  name: 'DynamicComponent',
  props: {
    component: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: 'DESIGN'
    }
  },
  setup(props, { attrs }) {
    const AsyncComponent = defineAsyncComponent(
      () =>
        import(
          `../views/workFlow/common/form/${
            props.type === 1 ? 'components' : 'config'
          }/${props.component}`
        )
    )
    return () => h(AsyncComponent, { ...props, ...attrs })
  }
})
