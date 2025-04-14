import type * as kokomi from 'kokomi.js'
export const resources: kokomi.ResourceItem[] = [
  {
    name: 'sm_car',
    type: 'gltfModel',
    path: '/mesh/sm_car.gltf'
  },
  {
    name: 'ut_env_night',
    type: 'hdrTexture',
    path: '/texture/t_env_night.hdr'
  },
  {
    name: 'ut_env_light',
    type: 'hdrTexture',
    path: '/texture/t_env_light.hdr'
  },
  {
    name: 'ut_car_body_ao',
    type: 'texture',
    path: '/texture/t_car_body_AO.raw.jpg'
  }
]
