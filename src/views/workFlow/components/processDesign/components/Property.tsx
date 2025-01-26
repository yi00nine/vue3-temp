import { defineComponent, PropType } from 'vue'
import { Form, Select, Input, Button } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { approveUser } from '../config'
import { IApproveUser } from '../type'

export default defineComponent({
  name: 'PropertyPanel',
  props: {
    nodeData: {
      type: Object as PropType<any>,
      required: true
    },
    updateproperty: {
      type: Function as PropType<(id: string, value: any) => void>,
      required: true
    },
    hidePropertyPanel: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const getApproveList = () => {
      const approveUserOption: JSX.Element[] = []
      approveUser.forEach((item: IApproveUser) => {
        approveUserOption.push(
          <Select.Option value={item.value}>{item.label}</Select.Option>
        )
      })

      return (
        <Form.Item
          class="form-property"
          label="审核节点类型"
          name="approveType"
        >
          <Select>{approveUserOption}</Select>
        </Form.Item>
      )
    }

    const getApiUrl = () => {
      return (
        <Form.Item label="API" name="api">
          <Input />
        </Form.Item>
      )
    }

    const onFormLayoutChange = (value: any, all: any) => {
      approveUser.forEach((item) => {
        if (item.value === value.approveType) {
          value['approveTypeLabel'] = item.label
        }
      })
      props.updateproperty(props.nodeData.id, value)
    }

    return () => (
      <div>
        <h2>属性面板</h2>
        <Form
          key={props.nodeData.id}
          layout="inline"
          initialValues={props.nodeData.properties}
          onValuesChange={onFormLayoutChange}
        >
          <span class="form-property">
            类型：<span>{props.nodeData.type}</span>
          </span>
          <span class="form-property">
            文案：<span>{props.nodeData.text?.value}</span>
          </span>
          {props.nodeData.type === 'approver' ? getApproveList() : ''}
          {props.nodeData.type === 'jugement' ? getApiUrl() : ''}
        </Form>
        <div>
          <h3>......</h3>
          <h3>业务属性可根据需要进行自定义扩展</h3>
        </div>
        <div class="property-panel-footer">
          <Button
            class="property-panel-footer-hide"
            type="primary"
            v-slots={{
              icon: () => <DownOutlined />
            }}
            onClick={props.hidePropertyPanel}
          >
            收起
          </Button>
        </div>
      </div>
    )
  }
})
