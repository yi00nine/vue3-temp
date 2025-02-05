import { defineComponent } from 'vue'
import { useFormSettingsStore } from '@/store/modules/design'
import { Tabs } from 'ant-design-vue'
import FormAuthConfig from '@/components/FormAuthConfig'
import RootNodeConfig from './RootNodeConfig'
export default defineComponent({
  name: 'NodeConfig',
  setup(props) {
    const formSettingsStore = useFormSettingsStore()
    return () => (
      <>
        <Tabs>
          <Tabs.TabPane key="1" tab="Tab 1">
            {formSettingsStore.selectNode.type === 'apply' ? (
              <RootNodeConfig></RootNodeConfig>
            ) : null}
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="表单权限设置">
            <FormAuthConfig></FormAuthConfig>
          </Tabs.TabPane>
        </Tabs>
      </>
    )
  }
})
