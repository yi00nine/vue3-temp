// src/views/workFlow/common/form/config/TextInputConfig.tsx

import { defineComponent, PropType } from 'vue'
import { Form, Input } from 'ant-design-vue'

export default defineComponent({
  name: 'TextInput',
  props: {
    value: {
      type: Object as PropType<{ placeholder: string }>,
      default: () => ({})
    }
  },
  setup(props) {
    return () => (
      <Form.Item label="提示文字">
        <Input
          size="middle"
          v-model:value={props.value.placeholder}
          placeholder="请设置提示语"
        />
      </Form.Item>
    )
  }
})
