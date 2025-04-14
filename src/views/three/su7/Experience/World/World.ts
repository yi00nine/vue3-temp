import * as kokomi from 'kokomi.js'
import * as THREE from 'three'
import DynamicEnv from './DynamicEnv'
import type Experience from '../Experience'
import Car from './Car'
export default class World extends kokomi.Component {
  car: any
  base: Experience
  dynamicEnv!: DynamicEnv
  constructor(base: Experience) {
    super(base)
    this.base = base
    this.base.am.on('ready', () => {
      this.handleAssets()
      this.base.scene.background = new THREE.Color('white')

      const envmap1 = kokomi.getEnvmapFromHDRTexture(
        this.base.renderer,
        this.base.am.items['ut_env_night']
      )
      const envmap2 = kokomi.getEnvmapFromHDRTexture(
        this.base.renderer,
        this.base.am.items['ut_env_light']
      )
      const dynamicEnv = new DynamicEnv(this.base, {
        envmap1,
        envmap2
      })

      this.dynamicEnv = dynamicEnv
      this.base.scene.environment = dynamicEnv.envmap
      dynamicEnv.setWeight(0.5)

      const car = new Car(this.base)
      this.car = car
      car.addExisting()
    })
  }
  handleAssets() {
    const items = this.base.am.items
    ;(items['ut_car_body_ao'] as THREE.Texture).flipY = false
    ;(items['ut_car_body_ao'] as THREE.Texture).colorSpace =
      THREE.LinearSRGBColorSpace
    ;(items['ut_car_body_ao'] as THREE.Texture).minFilter = THREE.NearestFilter
    ;(items['ut_car_body_ao'] as THREE.Texture).magFilter = THREE.NearestFilter
    ;(items['ut_car_body_ao'] as THREE.Texture).channel = 1
  }
}
