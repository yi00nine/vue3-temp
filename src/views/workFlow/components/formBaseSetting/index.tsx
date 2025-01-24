import { defineComponent, ref, reactive } from 'vue'
import { Form, Input, Select } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import styles from './styles.module.less'
import { useFormSettingsStore } from '@/store/modules/design'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'BaseSetup',
  setup() {
    const formRef = ref<FormInstance>()
    const formSettingsStore = useFormSettingsStore()
    const { formName, remark, settings } = storeToRefs(formSettingsStore)
    const state = reactive({
      notifyTypes: [
        { type: 'APP', name: '应用内通知' },
        { type: 'EMAIL', name: '邮件通知' },
        { type: 'SMS', name: '短信通知' },
        { type: 'WX', name: '微信通知' },
        { type: 'DING', name: '钉钉通知' }
      ]
    })

    return () => (
      <div class={styles.baseSetup}>
        <Form
          ref={formRef}
          model={formSettingsStore}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            label="表单名称"
            name="formName"
            rules={[{ required: true, message: '请输入表单名称' }]}
          >
            <Input v-model:value={formName.value} />
          </Form.Item>

          <Form.Item label="表单说明">
            <Input.TextArea
              v-model:value={remark.value}
              placeholder="请输入表单说明"
              showCount
              maxlength={500}
              autoSize={{ minRows: 2, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            label="消息通知方式"
            rules={[{ required: true, message: '请选择消息通知方式' }]}
          >
            <div class={styles.notifyRow}>
              <Select
                v-model:value={settings.value.notify.types}
                mode="multiple"
                placeholder="选择消息通知方式"
                allowClear
              >
                {state.notifyTypes.map((item, index) => (
                  <Select.Option key={index} value={item.type}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
              <Input
                v-model:value={settings.value.notify.title}
                placeholder="消息通知标题"
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
})
