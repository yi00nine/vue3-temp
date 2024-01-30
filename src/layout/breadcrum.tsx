import { computed, defineComponent, withModifiers } from 'vue'
import { AppstoreOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import styles from './styles.module.less'
import { layoutStyleConfig } from '@/types/constants'

export default defineComponent({
  props: ['itemData', 'index'],
  setup(props) {
    const route = useRoute()
    console.log(route)
    return () => (
      <div
        style={{
          height: layoutStyleConfig.breadcrumbHeight + 'px',
          padding: '0 17.5px'
        }}
      >
        <a-breadcrumb style={{ margin: '14px 0' }}>
          <a-breadcrumb-item>
            <AppstoreOutlined />
          </a-breadcrumb-item>
          {route.matched.map((item) => (
            <a-breadcrumb-item>{item.name}</a-breadcrumb-item>
          ))}
        </a-breadcrumb>
      </div>
    )
  }
})
