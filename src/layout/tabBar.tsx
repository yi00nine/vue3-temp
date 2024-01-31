import { defineComponent, reactive, computed, onUnmounted } from 'vue'
import styles from './styles.module.less'
import { useAppStore } from '@/store'
import useTabStore from '@/store/modules/tab/index'
import { listenRouteChange, removeRouteListener } from '@/utils/routerListener'
import { layoutStyleConfig } from '@/types/constants'
import tabItemComponent from './tabItem'
export default defineComponent({
  components: { tabItemComponent },
  setup() {
    const appStore = useAppStore()
    const tabStore = useTabStore()
    const tabList = computed(() => tabStore.tabList)
    listenRouteChange((route) => {
      if (!tabList.value.some((el) => el.name === route.name)) {
        tabStore.updateTabList(route)
      }
    }, true)
    onUnmounted(() => {
      removeRouteListener()
    })

    const offsetTop = computed(() => {
      return appStore.navbar ? layoutStyleConfig.navbarHeight : 0
    })
    return () => (
      <a-affix offset-top={offsetTop.value}>
        <div
          class={styles.tabBox}
          style={{ height: layoutStyleConfig.tabHeight }}
        >
          {tabList.value.map((item, index) => (
            <tabItemComponent itemData={item} index={index} key={index} />
          ))}
        </div>
      </a-affix>
    )
  }
})
