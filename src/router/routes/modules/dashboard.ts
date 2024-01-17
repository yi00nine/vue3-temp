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
        locale: 'menu.exception.403'
      }
    },
    {
      path: 'workplace',
      name: ViewNames.workplace,
      component: () => import('@/views/dashboard/workplace'),
      meta: {
        locale: 'menu.exception.404'
      }
    }
  ]
}
