import { defineComponent, PropType, computed, watch } from 'vue'
import { Input } from 'ant-design-vue'
import { commonProps } from '../commonProps'

export default defineComponent({
  name: 'TextInput',
  props: {
    value: {
      type: String as PropType<string>,
      default: null
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请输入内容'
    },
    ...commonProps
  },
  setup(props, { emit }) {
    const _value = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })

    watch(
      () => props.value,
      (newVal) => {
        console.log(12345, newVal)
      }
    )
    return () => (
      <div>
        {props.mode === 'DESIGN' ? (
          <Input size="middle" disabled placeholder={props.placeholder} />
        ) : (
          <Input
            size="middle"
            allowClear
            v-model:value={_value.value}
            placeholder={props.placeholder}
          />
        )}
      </div>
    )
  }
})
