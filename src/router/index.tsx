import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHistory()

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/exception',
    component: () => import('../layout'),
    children: [
      {
        path: '403',
        component: () => import('../views/exception/403')
      },
      {
        path: '404',
        component: () => import('../views/exception/404')
      },
      {
        path: '500',
        component: () => import('../views/exception/500')
      }
    ]
  }
]

const router = createRouter({
  history,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})

export default router

export const getMenuItems = (isAdmin: boolean) => {
  const base: any = [
    {
      key: 'normalPage',
      label: '普通页面',
      children: [
        {
          key: 'page1',
          label: (
            <router-link to="/main/normalPage/page1">普通页面1</router-link>
          ),
          children: null
        },
        {
          key: 'page2',
          label: (
            <router-link to="/main/normalPage/page2">普通页面2</router-link>
          ),
          children: null
        }
      ]
    }
  ]
  return base
}
