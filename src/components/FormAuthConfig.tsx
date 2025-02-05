import { defineComponent } from 'vue'
import { useFormSettingsStore } from '@/store/modules/design'
import { Table, Radio } from 'ant-design-vue'

export default defineComponent({
  name: 'FormAuthConfig',
  setup(props) {
    const formSettingsStore = useFormSettingsStore()

    const columns = [
      {
        title: '表单字段',
        dataIndex: 'title',
        key: 'title',
        customRender: ({ record }: any) => (
          <span>
            {record.required && <span style={{ color: 'red' }}> *</span>}
            {record.title}
          </span>
        )
      },
      {
        title: '只读',
        dataIndex: 'readonly',
        key: 'readonly',
        customRender: ({ record }: any) => (
          <Radio
            checked={record.perm === 'readonly'}
            onChange={() => {
              record.perm = 'readonly'
            }}
          />
        )
      },
      {
        title: '可编辑',
        dataIndex: 'editable',
        key: 'editable',
        customRender: ({ record }: any) => (
          <Radio
            checked={record.perm === 'editable'}
            onChange={() => {
              record.perm = 'editable'
            }}
          />
        )
      },
      {
        title: '隐藏',
        dataIndex: 'hidden',
        key: 'hidden',
        customRender: ({ record }: any) => (
          <Radio
            checked={record.perm === 'hidden'}
            onChange={() => {
              record.perm = 'hidden'
            }}
          />
        )
      }
    ]

    formSettingsStore.selectNode.properties.formPerms =
      formSettingsStore.design.formItems.map((item, index) => ({
        id: item.id,
        perm: 'readonly',
        title: item.title,
        required: item.props.required
      }))

    return () => (
      <div>
        <Table
          columns={columns}
          dataSource={formSettingsStore.selectNode.properties.formPerms}
          bordered
        />
      </div>
    )
  }
})
