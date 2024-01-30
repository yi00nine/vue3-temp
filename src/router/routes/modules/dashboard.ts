import { ViewNames } from '@/types/constants'

export default {
  path: '/dashboard',
  name: ViewNames.dashboard,
  component: () => import('@/layout'),
  meta: {
    locale: 'menu.dashboard'
  },
  children: [
    {
      path: 'monitor',
      name: ViewNames.monitor,
      component: () => import('@/views/dashboard/monitor'),
      meta: {
        locale: 'menu.dashboard.monitor'
      }
    },
    {
      path: 'workplace',
      name: ViewNames.workplace,
      component: () => import('@/views/dashboard/workplace'),
      meta: {
        locale: 'menu.dashboard.workplace'
      }
    }
  ]
}
