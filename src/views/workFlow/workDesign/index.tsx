import { defineComponent, reactive } from 'vue'
import styles from './styles.module.less'
import LayoutHeader from '@/views/workFlow/components/layoutHeader'
export default defineComponent({
  setup() {
    const state = reactive({
      selectKeys: ['baseSetting']
    })
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
          <a-layout-content class={styles.content}>Content</a-layout-content>
        </a-layout>
      </>
    )
  }
})
