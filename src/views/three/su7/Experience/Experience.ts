import * as kokomi from 'kokomi.js'
import * as THREE from 'three'
import { resources } from './resource'
import World from './World/World'
export default class Experience extends kokomi.Base {
  params: any
  am: kokomi.AssetManager
  controls: kokomi.OrbitControls
  world: World
  constructor(sel = '#sketch') {
    super(sel)
    const resourcesToLoad = resources
    this.params = {
      speed: 2,
      cameraFov: 33.4,
      cameraPos: {
        x: 0,
        y: 0.8,
        z: -11
      }
    }
    this.am = new kokomi.AssetManager(this, resourcesToLoad, {
      useMeshoptDecoder: true
    })

    const camera = this.camera as THREE.PerspectiveCamera
    camera.fov = this.params.cameraFov
    camera.updateProjectionMatrix()
    const cameraPos = new THREE.Vector3(
      this.params.cameraPos.x,
      this.params.cameraPos.y,
      this.params.cameraPos.z
    )
    camera.position.copy(cameraPos)
    const lookAt = new THREE.Vector3(0, 0.8, 0)
    camera.lookAt(lookAt)

    const controls = new kokomi.OrbitControls(this)
    controls.controls.target = lookAt
    this.controls = controls
    this.world = new World(this)

    this.update(() => {
      if (this.params.isCameraMoving) {
        this.controls.controls.enabled = false
      } else {
        this.controls.controls.enabled = true
      }
    })
  }
}
