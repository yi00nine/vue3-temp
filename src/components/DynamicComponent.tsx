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
    }
  },
  setup(props, { attrs }) {
    console.log(123, props)
    console.log(1234, attrs)

    const AsyncComponent = defineAsyncComponent(
      () =>
        import(
          `../views/workFlow/common/form/${
            props.type === 1 ? 'components' : 'config'
          }/${props.component}`
        )
    )
    return () => h(AsyncComponent, { ...attrs })
  }
})
