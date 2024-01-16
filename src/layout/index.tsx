import { defineComponent, computed } from 'vue'
import styles from './styles.module.less'

import Navbar from './Navbar'
import MenuComponent from './menu'
import pageComponent from './pageComponent'
import { layoutStyleConfig } from '../types/constants'

export default defineComponent({
  components: { pageComponent },
  setup() {
    const paddingStyle = computed(() => {
      const paddingLeft = { paddingLeft: '220px' }
      const paddingTop = { paddingTop: layoutStyleConfig.navbarHeight + 'px' }

      return { ...paddingLeft, ...paddingTop }
    })
    return () => (
      <>
        <a-layout>
          <Navbar></Navbar>
          <a-layout>
            <a-layout-sider
              style={{
                paddingTop: paddingStyle.value.paddingTop
              }}
              class={styles.sider}
            >
              <MenuComponent></MenuComponent>
            </a-layout-sider>
            <a-layout style={paddingStyle.value} class={styles.main}>
              <div>tabbar</div>
              <div>breadcrumb</div>
              <a-layout-content>
                <pageComponent></pageComponent>
              </a-layout-content>
              <div>footer</div>
            </a-layout>
          </a-layout>
        </a-layout>
      </>
    )
  }
})
