import { computed, defineComponent, withModifiers } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import styles from './styles.module.less'
import useTabStore from '@/store/modules/tab'
import { ViewNames } from '@/types/constants'
export default defineComponent({
  props: ['itemData', 'index'],
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const tabStore = useTabStore()

    const tabList = computed(() => {
      return tabStore.tabList
    })
    const handleTabClick = () => {
      router.push({
        path: props.itemData.fullPath
      })
    }
    const handleTabClose = () => {
      tabStore.deleteTab(props.itemData.name)
      if (props.itemData.name === route.name) {
        const prevTab = tabList.value[props.index - 1]
        router.push({ path: prevTab.fullPath })
      }
    }
    const findCurrentRouteIndex = () => {
      return tabList.value.findIndex((el) => el.name === route.name)
    }
    const disabledReload = computed(() => {
      return props.index !== findCurrentRouteIndex()
    })
    const reload = () => {
      router.push({
        name: ViewNames.redirect,
        params: {
          path: route.fullPath
        }
      })
    }
    const delCurrent = () => {
      tabStore.deleteTab(props.itemData.name)
      if (props.itemData.name === route.name) {
        const prevTab = tabList.value[props.index - 1]
        router.push({ path: prevTab.fullPath })
      }
    }
    const delOther = () => {
      console.log(props.itemData)
      const filterList = tabList.value.filter((el, idx) => {
        return [0, props.index].includes(idx)
      })
      tabStore.freshTabList(filterList)
      router.push({ path: props.itemData.fullPath })
    }
    const delAll = () => {
      tabStore.resetTabList()
      router.push({ path: '/dashboard/monitor' })
    }

    const shouldClose = computed(() => props.index !== 0)
    const tagChecked = computed(() => props.itemData.name === route.name)
    return () => (
      <a-dropdown trigger="contextmenu" placement={'bottom'}>
        {{
          default: () => (
            <span
              onClick={handleTabClick}
              class={[
                styles['tag'],
                tagChecked.value && styles['link-activated']
              ]}
            >
              <span>{props.itemData.name}</span>
              {shouldClose.value && (
                <span onClick={withModifiers(handleTabClose, ['stop'])}>
                  <CloseOutlined />
                </span>
              )}
            </span>
          ),
          overlay: () => (
            <>
              <a-menu selected-keys={[]}>
                <a-menu-item
                  disabled={disabledReload.value}
                  key="1"
                  onClick={reload}
                >
                  <span>重新加载</span>
                </a-menu-item>
                <a-menu-item key="2" onClick={delCurrent}>
                  <span>关闭当前标签页</span>
                </a-menu-item>
                <a-menu-item key="3" onClick={delOther}>
                  <span>关闭其他标签页</span>
                </a-menu-item>
                <a-menu-item key="4" onClick={delAll}>
                  <span>关闭所有标签页</span>
                </a-menu-item>
              </a-menu>
            </>
          )
        }}
      </a-dropdown>
    )
  }
})
