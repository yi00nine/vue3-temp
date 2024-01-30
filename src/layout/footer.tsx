import { defineComponent } from 'vue'
import { AppstoreOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ApplicationInfo, layoutStyleConfig } from '@/types/constants'
import styles from './styles.module.less'
export default defineComponent({
  props: ['itemData', 'index'],
  setup(props) {
    const route = useRoute()
    console.log(route)
    return () => (
      <a-layout-footer
        style={{
          height: layoutStyleConfig.footerHeight + 'px !important'
        }}
        class={styles.footer}
      >
        {ApplicationInfo.appTitle}
      </a-layout-footer>
    )
  }
})
