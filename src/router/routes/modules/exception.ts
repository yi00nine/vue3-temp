import { ViewNames } from '@/types/constants'

export default {
  path: '/exception',
  name: ViewNames.exception,
  component: () => import('@/layout'),
  meta: {
    locale: 'menu.exception'
  },
  children: [
    {
      path: '403',
      name: ViewNames._403,
      component: () => import('@/views/exception/403'),
      meta: {
        locale: 'menu.exception.403'
      }
    },
    {
      path: '404',
      name: ViewNames._404,
      component: () => import('@/views/exception/404'),
      meta: {
        locale: 'menu.exception.404'
      }
    },
    {
      path: '500',
      name: ViewNames._500,
      component: () => import('../../../views/exception/500'),
      meta: {
        locale: 'menu.exception.500'
      }
    }
  ]
}
