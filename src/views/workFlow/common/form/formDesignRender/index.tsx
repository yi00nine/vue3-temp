import { defineComponent, ref, computed, PropType } from 'vue'
import DynamicComponent from '@/components/DynamicComponent'
export default defineComponent({
  name: 'FormRender',
  props: {
    mode: {
      type: String as PropType<'DESIGN' | 'EDIT'>,
      default: 'DESIGN'
    },
    value: {
      type: [String, Number, Object, Array] as PropType<any>,
      default: undefined
    },
    config: {
      type: Object as PropType<{ name: string; props: Record<string, any> }>,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const formRef = ref()
    const _value = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })

    const validate = (call: any) => {
      if (formRef.value) {
        formRef.value.validate(call)
      }
    }

    return () => (
      <DynamicComponent
        component={props.config.name}
        {...props.config.props}
        v-model:value={_value.value}
      />
    )
  }
})
