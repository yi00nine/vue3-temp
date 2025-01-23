import { defineComponent, ref, computed } from 'vue'
import DynamicComponent from '@/components/DynamicComponent'
import { Form, Input, Switch } from 'ant-design-vue'
import { useFormSettingsStore } from '@/store/modules/design'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'FormComponentConfig',
  setup(props, { emit }) {
    const formSettingsStore = useFormSettingsStore()
    const { selectFormItem } = storeToRefs(formSettingsStore)
    console.log(selectFormItem.value)
    return () => (
      <div>
        <Form>
          <Form.Item label="表单名称">
            <Input
              v-model:value={selectFormItem.value.title}
              placeholder="请输入表单说明"
            />
          </Form.Item>
          <DynamicComponent
            component={selectFormItem.value.name}
            type={2}
            v-model:value={selectFormItem.value.props}
          />
          <Form.Item label="必填项">
            <Switch v-model:checked={selectFormItem.value.props.required} />
          </Form.Item>
        </Form>
      </div>
    )
  }
})
