import { ViewNames } from '@/types/constants'

export default {
  path: '/workFlow',
  name: ViewNames.workFlow,
  component: () => import('@/layout'),
  meta: {
    locale: 'menu.workFlow'
  },
  children: [
    {
      path: 'workSpace',
      name: ViewNames.workSpace,
      component: () => import('@/views/workFlow/workSpace'),
      meta: {
        locale: 'menu.workSpace'
      }
    },
    {
      path: 'workDesign',
      name: ViewNames.workDesign,
      component: () => import('@/views/workFlow/workDesign'),
      meta: {
        locale: 'menu.workDesign'
      }
    }
  ]
}
