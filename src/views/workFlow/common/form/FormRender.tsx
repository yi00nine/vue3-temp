import { defineComponent, ref, reactive, computed, PropType } from 'vue'
import { Form } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import FormDesignRender from './formDesignRender'
import { FormItem } from '../../../../store/modules/design'
export default defineComponent({
  name: 'FormRender',
  props: {
    forms: {
      type: Array as PropType<FormItem[]>,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const formRef = ref<FormInstance>()
    console.log(props.forms)
    const _value = computed({
      get: () => props.value,
      set: (val) => {
        emit('update:value', val)
      }
    })
    return () => (
      <div>
        <Form ref={formRef} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          {props.forms.map((el) => {
            return (
              <Form.Item label={el.title} {...el.props}>
                <FormDesignRender
                  config={el}
                  mode="EDIT"
                  v-model:value={_value.value[el.id]}
                ></FormDesignRender>
              </Form.Item>
            )
          })}
        </Form>
      </div>
    )
  }
})
