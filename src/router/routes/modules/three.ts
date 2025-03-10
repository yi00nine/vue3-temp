export default {
  path: '/three',
  name: 'three',
  component: () => import('@/layout'),
  meta: {
    locale: 'menu.three'
  },
  children: [
    {
      path: 'scene',
      name: 'scene',
      component: () => import('@/views/three/scene'),
      meta: {
        locale: 'menu.three.scene'
      }
    },
    {
      path: 'camera',
      name: 'camera',
      component: () => import('@/views/three/camera'),
      meta: {
        locale: 'menu.three.camera'
      }
    }
  ]
}
