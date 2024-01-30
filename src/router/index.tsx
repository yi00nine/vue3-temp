import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { appRoutes } from './routes'
import configRouteGuard from './guards'
import { ViewNames } from '@/types/constants'
const history = createWebHistory()

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...appRoutes,
  {
    path: '/redirect',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/redirect/:path',
        name: ViewNames.redirect,
        component: () => import('@/views/redirect/index'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history,
  routes
})

configRouteGuard(router)

export default router
