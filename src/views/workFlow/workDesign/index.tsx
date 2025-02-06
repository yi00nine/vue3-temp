import { defineComponent, reactive } from 'vue'
import styles from './styles.module.less'
import LayoutHeader from '@/views/workFlow/components/layoutHeader'
import FormBaseSetting from '@/views/workFlow/components/formBaseSetting'
import FormDesign from '@/views/workFlow/components/formDesign/index'
import ProcessDesign from '../components/processDesign'
import { useFormSettingsStore } from '@/store/modules/design/index'

export default defineComponent({
  setup() {
    const state = reactive({
      selectKeys: ['baseSetting']
    })
    const formSettingsStore = useFormSettingsStore()
    const initData = {
      formId: null,
      formName: '未命名表单',
      settings: {
        notify: {
          types: ['APP'],
          title: '消息通知标题'
        }
      },
      formItems: [],
      process: {
        nodes: [
          {
            id: '28df2fbe-f32b-4a9b-b544-7e70d7187b33',
            type: 'apply',
            x: 210,
            y: 210,
            text: { x: 210, y: 210, value: '申请' },
            properties: {
              assignedUser: ['1', '2'],
              formPerms: []
            }
          }
        ]
      }
    }
    formSettingsStore.loadForm(initData)
    const preview = () => {
      console.log('preview')
    }
    const publish = () => {
      console.log('publish')
    }
    return () => (
      <>
        <a-layout>
          <a-layout-header class={styles.header}>
            <LayoutHeader
              v-model:selectKeys={state.selectKeys}
              onPreview={preview}
              onPublish={publish}
            />
          </a-layout-header>
          <a-layout-content class={styles.content}>
            <FormBaseSetting
              style={{
                display: state.selectKeys.includes('baseSetting') ? '' : 'none'
              }}
            />
            <FormDesign
              style={{
                display: state.selectKeys.includes('formDesign') ? '' : 'none'
              }}
            />
            <ProcessDesign
              style={{
                display: state.selectKeys.includes('processDesign')
                  ? ''
                  : 'none'
              }}
            />
          </a-layout-content>
        </a-layout>
      </>
    )
  }
})
