import { defineComponent, ref } from 'vue'
import { Menu, Button } from 'ant-design-vue'
import { EyeOutlined, SendOutlined } from '@ant-design/icons-vue'
import styles from './styles.module.less'

export default defineComponent({
  props: {
    selectKeys: {
      type: Array,
      default: () => ['baseSetting']
    }
  },
  emits: ['preview', 'publish', 'update:selectKeys'],
  setup(props, { emit }) {
    const selectedKey = ref(props.selectKeys)

    const handleSelect = (key: string) => {
      emit('update:selectKeys', [key])
    }

    const to = (route: string) => {
      // 处理路由跳转
    }

    const preview = () => {
      emit('preview')
    }

    const publish = () => {
      emit('publish')
    }

    return () => (
      <div class={styles.header}>
        <Menu
          v-model:selectedKeys={[selectedKey.value]}
          mode="horizontal"
          onSelect={({ key }) => handleSelect(key)}
        >
          <Menu.Item key="baseSetting" onClick={() => to('baseSetting')}>
            ① 基础信息
          </Menu.Item>
          <Menu.Item key="formSetting" onClick={() => to('formSetting')}>
            ② 审批表单
          </Menu.Item>
          <Menu.Item key="processDesign" onClick={() => to('processDesign')}>
            ③ 审批流程
          </Menu.Item>
        </Menu>

        <div class={styles.publish}>
          <Button size="small" class={styles.previewBtn} onClick={preview}>
            <EyeOutlined class={styles.btnIcon} />
            预览
          </Button>
          <Button
            size="small"
            type="primary"
            class={styles.publishBtn}
            onClick={publish}
          >
            <SendOutlined class={styles.btnIcon} />
            发布
          </Button>
        </div>
      </div>
    )
  }
})
