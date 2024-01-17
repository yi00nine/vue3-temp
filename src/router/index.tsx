import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { appRoutes } from './routes'
import configRouteGuard from './guards'
const history = createWebHistory()

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  ...appRoutes
]

const router = createRouter({
  history,
  routes
})

configRouteGuard(router)

export default router
