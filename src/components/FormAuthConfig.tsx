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

    const initPerms = () => {
      const oldPermsMap: Map<string, any> = new Map(
        formSettingsStore.selectNode.properties.formPerms.map((item) => [
          item.id,
          item
        ])
      )
      formSettingsStore.selectNode.properties.formPerms.length = 0
      const newPerms = formSettingsStore.design.formItems.map((item) => {
        const oldPerm = oldPermsMap.get(item.id)

        if (oldPerm) {
          return {
            ...oldPerm,
            title: item.title,
            required: item.props.required
          }
        }

        return {
          id: item.id,
          perm:
            formSettingsStore.selectNode.type === 'apply'
              ? 'editable'
              : 'readonly',
          title: item.title,
          required: item.props.required
        }
      })
      formSettingsStore.selectNode.properties.formPerms = newPerms
    }

    initPerms()
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
