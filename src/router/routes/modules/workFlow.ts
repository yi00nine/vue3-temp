import { ViewNames } from '@/types/constants'

export default {
  path: '/workFlow',
  name: ViewNames.workFlow,
  component: () => import('@/layout'),
  meta: {
    locale: 'workFlow'
  },
  children: [
    {
      path: 'workSpace',
      name: ViewNames.workSpace,
      component: () => import('@/views/workFlow/workSpace'),
      meta: {
        locale: 'workSpace'
      }
    },
    {
      path: 'workDesign',
      name: ViewNames.workDesign,
      component: () => import('@/views/workFlow/workDesign'),
      meta: {
        locale: 'workDesign'
      }
    }
  ]
}
