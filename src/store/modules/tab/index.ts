import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { RouteLocationNormalized } from 'vue-router'

import { ViewNames } from '@/types/constants'
import { firstRoute } from '@/hooks/appRoute'

const firstRouteClone = cloneDeep(firstRoute)
const BAN_LIST = [ViewNames.redirect]

const defaultTab: any = {
  title: firstRouteClone.title,
  name: firstRouteClone.name,
  fullPath: firstRouteClone.fullPath
}
const formatRoute = (route: RouteLocationNormalized) => {
  const { name, meta, fullPath } = route
  return {
    title: meta.locale + '' || '',
    name: String(name),
    fullPath
  }
}

export default defineStore('tabStore', {
  state: () => ({
    tabList: [defaultTab]
  }),
  getters: {
    getCacheList(state) {
      return Array.from(new Set(state.tabList.map((item) => item.name)))
    }
  },
  actions: {
    deleteTab(name: ViewNames) {
      const idx = this.tabList.findIndex((item) => item.name === name)

      this.tabList.splice(idx, 1)
    },
    freshTabList(tabs: any) {
      this.tabList = tabs
    },
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as ViewNames)) return
      this.tabList.push(formatRoute(route))
    },
    resetTabList() {
      this.$reset()
    }
  }
})
