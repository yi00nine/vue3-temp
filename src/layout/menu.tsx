import { defineComponent, h, reactive, ref } from 'vue'
import { useAppStore } from '../store/index'
import useAppRoute from '@/hooks/appRoute'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { listenRouteChange } from '@/utils/routerListener'
export default defineComponent({
  setup() {
    const appStore = useAppStore()
    const { appRouteData } = useAppRoute()
    const router = useRouter()
    const { t } = useI18n()
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])
    const handleMenuItemClick = (item: RouteRecordRaw) => {
      router.push({
        name: item.name
      })
    }
    const renderMenuContent = () => {
      const traverse = (routeList: any[]) => {
        const list = []
        for (let i = 0; i < routeList.length; i++) {
          const route = routeList[i]
          if (route.children === undefined) {
            list.push(
              <a-menu-item
                key={route.name as string}
                onClick={() => handleMenuItemClick(route)}
              >
                {t(route.locale)}
              </a-menu-item>
            )
          } else {
            if (route.children.length > 0) {
              list.push(
                <a-sub-menu
                  key={route.name as string}
                  v-slots={{
                    icon: () => <img src={route.icon}></img>,
                    title: () => t(route.locale)
                  }}
                >
                  {traverse(route.children)}
                </a-sub-menu>
              )
            }
          }
        }
        return list
      }
      return traverse(appRouteData.value.tree)
    }

    listenRouteChange((newRoute) => {
      if (newRoute.name) {
        const appRoute = appRouteData.value.map[newRoute.name]
        if (appRoute) {
          const namePath = appRoute.namePath
          openKeys.value = Array.from(new Set([...namePath, ...openKeys.value]))
          const stackTopName = namePath[namePath.length - 1]
          selectedKey.value = [stackTopName]
        }
      }
    })
    return () => (
      <a-menu
        v-model:open-keys={openKeys.value}
        selected-keys={selectedKey.value}
        mode="inline"
        style="height:100%"
      >
        {renderMenuContent()}
      </a-menu>
    )
  }
})
