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
        locale: 'menu.three.camera',
        ignoreCache: true
      }
    },
    {
      path: 'bufferGeometry',
      name: 'bufferGeometry',
      component: () => import('@/views/three/bufferGeometry'),
      meta: {
        locale: 'menu.three.bufferGeometry',
        ignoreCache: true
      }
    },
    {
      path: 'tween',
      name: 'tween',
      component: () => import('@/views/three/tween'),
      meta: {
        locale: 'menu.three.tween',
        ignoreCache: true
      }
    },
    {
      path: 'gltf',
      name: 'gltf',
      component: () => import('@/views/three/gltf'),
      meta: {
        locale: 'menu.three.gltf',
        ignoreCache: true
      }
    },
    {
      path: 'earth',
      name: 'earth',
      component: () => import('@/views/three/earth'),
      meta: {
        locale: 'menu.three.earth',
        ignoreCache: true
      }
    }
  ]
}
