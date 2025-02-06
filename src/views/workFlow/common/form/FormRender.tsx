import { defineComponent, ref, reactive, computed, PropType } from 'vue'
import { Form } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import FormDesignRender from './formDesignRender'
import { FormItem } from '../../../../store/modules/design'
import { useFormSettingsStore } from '@/store/modules/design'
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
    const formSettingsStore = useFormSettingsStore()
    // 假设当前是申请人
    const formPerms = computed(() => {
      return formSettingsStore.design.process.nodes.find(
        (node) => node.type === 'apply'
      )?.properties.formPerms
    })
    return () => (
      <div>
        <Form ref={formRef} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          {props.forms.map((el) => {
            // 根据formPerms判断当前表单项的权限
            const currentPerm = formPerms.value?.find(
              (perm) => perm.id === el.id
            )
            // 如果没有权限配置或权限为hidden，则不渲染
            if (!currentPerm || currentPerm.perm === 'hidden') {
              return null
            }

            return (
              <Form.Item label={el.title} {...el.props}>
                <FormDesignRender
                  config={el}
                  mode={currentPerm.perm === 'readonly' ? 'DESIGN' : 'EDIT'}
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
