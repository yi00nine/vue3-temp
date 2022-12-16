import { defineComponent, reactive } from 'vue'
import styles from './styles.module.less'
import { getMenuItems } from '../../router/index'
export default defineComponent({
  setup() {
    console.log(getMenuItems(true))
    const state = reactive({
      selectedKeys: location.pathname.split('/').slice(-1)
    })
    console.log(state)
    return () => (
      <div class={styles.sidebarMain}>
        <div class={styles.header}>zxb</div>
        <div class={styles.menuWrap}>
          <a-menu
            mode="inline"
            theme="dark"
            v-model:selectedKeys={state.selectedKeys}
            openKeys={['normalPage']}
          >
            {getMenuItems(true).map((item: any, index: any) =>
              item.children ? (
                <a-sub-menu key={item.key}>
                  {{
                    title: () => item.label,
                    default: () =>
                      item.children.map((el: any) => (
                        <a-menu-item key={el.key}>{el.label}</a-menu-item>
                      ))
                  }}
                </a-sub-menu>
              ) : (
                <a-menu-item key={item.key}>{item.label}</a-menu-item>
              )
            )}
          </a-menu>
        </div>
      </div>
    )
  }
})
