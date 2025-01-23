import { defineComponent, PropType } from 'vue'
import { Input } from 'ant-design-vue'
import { useTextInput } from '../useForm'

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
    }
  },
  setup(props, { emit }) {
    const { _value, mode, required } = useTextInput(props, emit)
    return () => (
      <div>
        {mode.value === 'DESIGN' ? (
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
