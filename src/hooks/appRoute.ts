import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isString } from 'lodash'

import { appRoutes } from '@/router/routes/index'
import { ViewNames } from '@/types/constants'

import dashboardIcon from '@/assets/dashboard.png'
import exceptionIcon from '@/assets/exception.png'

const routeIconMap: any = {
  [ViewNames.dashboard]: dashboardIcon,
  [ViewNames.exception]: exceptionIcon
}

type Context = {
  currentNode: MenuData | null
  parent: MenuData | null
}

type MenuData = {
  name: string
  icon?: any
  namePath: string[]
  locale: string
  localePath: string[]
  children?: MenuData[]
}

export const firstRoute = {
  name: ViewNames.monitor,
  title: 'menu.dashboard.monitor',
  fullPath: '/dashboard/monitor'
}

export default function useAppRoute() {
  const appRouteData = computed(() => {
    const getMenuData = (route: RouteRecordRaw, context: Context) => {
      const ret: MenuData = {
        name: isString(route.name) ? route.name : '',
        locale: typeof route.meta?.locale === 'string' ? route.meta.locale : '',
        localePath: [],
        namePath: []
      }
      ret.namePath.push(ret.name)
      ret.localePath.push(ret.locale)
      if (context.parent?.localePath) {
        ret.localePath = context.parent.localePath.concat(ret.localePath)
      }
      if (context.parent?.namePath) {
        ret.namePath = context.parent.namePath.concat(ret.namePath)
      }
      if (ret.name in routeIconMap) {
        ret.icon = routeIconMap[ret.name]
      }
      return ret
    }

    const _map: any = {}
    const nodeList = []

    const getSubMenu = (node: RouteRecordRaw, context: Context) => {
      const menuData = getMenuData(node, context)
      // context.currentNode = menuData
      if (node.children === undefined) {
        _map[menuData.name] = menuData
        return menuData
      } else {
        const list: MenuData[] = []
        for (let j = 0; j < node.children.length; j++) {
          context.parent = menuData
          const child = getSubMenu(node.children[j], context)
          if (child) list.push(child)
        }
        if (list.length) {
          menuData.children = list
          _map[menuData.name] = menuData
          return menuData
        }
        return null
      }
    }
    for (let i = 0; i < appRoutes.length; i++) {
      const context: Context = {
        currentNode: null,
        parent: null
      }
      const menuNode = getSubMenu(appRoutes[i], context)
      if (menuNode) {
        nodeList.push(menuNode)
      }
    }
    return { tree: nodeList, map: _map }
  })
  console.log(appRouteData)
  return { appRouteData }
}
