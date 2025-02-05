import { defineComponent, reactive } from 'vue'
import { Select } from 'ant-design-vue'
import styles from './styles.module.less'
import { useFormSettingsStore } from '@/store/modules/design'

export default defineComponent({
  setup() {
    const formSettingsStore = useFormSettingsStore()

    const userOptions = [
      { value: '1', label: '张三' },
      { value: '2', label: '李四' },
      { value: '3', label: '王五' }
    ]

    return () => (
      <div>
        <p class={styles.desc}>
          选择能发起该审批的人员/部门，不选则默认开放给所有人
        </p>
        <Select
          v-model:value={formSettingsStore.selectNode.properties.assignedUser}
          mode="multiple"
          placeholder="请选择可发起审批的人员"
          style="width: 100%"
          options={userOptions}
        />
      </div>
    )
  }
})
