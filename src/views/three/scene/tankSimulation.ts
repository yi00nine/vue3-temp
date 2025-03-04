import * as THREE from 'three'
import type { WebGLRenderer, PerspectiveCamera, Scene } from 'three'
export class TankSimulation {
  canvas: HTMLCanvasElement
  renderer: WebGLRenderer
  cameras: Array<PerspectiveCamera> = []
  scene: Scene
  constructor() {
    this.canvas = document.querySelector('#c') as HTMLCanvasElement
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas
    })
    this.scene = new THREE.Scene()

    this.initRenderer()
    this.initCameras()
    this.initLight()
    this.initLight2()
    this.initGround()
    this.renderer.render(this.scene, this.cameras[0])
  }
  initRenderer() {
    this.renderer.setClearColor(0xaaaaaa)
    this.renderer.shadowMap.enabled = true
  }
  initCameras() {
    this.cameras = [new Camera({ fov: 40, position: [24, 12, 30] }).instance]
  }
  initLight() {
    const light = new THREE.DirectionalLight(0xffffff, 3)
    light.position.set(1, 2, 4)
    this.scene.add(light)
  }
  initLight2() {
    const light = new THREE.DirectionalLight(0xffffff, 3)
    light.position.set(0, 20, 0)
    this.scene.add(light)
    light.castShadow = true
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048

    const d = 50
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d
    light.shadow.camera.bottom = -d
    light.shadow.camera.near = 1
    light.shadow.camera.far = 50
    light.shadow.bias = 0.001
  }
  initGround() {
    const groundGeometry = new THREE.PlaneGeometry(50, 50)
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xcc8866 })
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.rotation.x = Math.PI * -0.5
    groundMesh.receiveShadow = true
    this.scene.add(groundMesh)
  }
}

class Camera {
  instance: PerspectiveCamera
  fov = 40
  aspect = 2
  zNear = 0.1
  zFar = 1000
  constructor({ fov = 40, position = [0, 0, 0] }) {
    this.fov = fov
    this.instance = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      this.zNear,
      this.zFar
    )
    this.instance.position.set(8, 4, 10).multiplyScalar(3)
    this.instance.lookAt(0, 0, 0)
  }
}

class Tank {
  container: any
  body: any
  turret: any
  wheels: any
  constructor() {
    this.container = new THREE.Object3D()
    this.body = new Body()
    this.turret = new Turret()
    this.wheels = []

    this.initComponents()
  }

  initComponents() {
    this.container.add(this.body.mesh)
    this.body.mesh.add(this.turret.pivot)

    // 初始化轮子...
    const wheelPositions = [
      /* positions */
    ]
    wheelPositions.forEach((pos) => {
      const wheel = new Wheel(pos)
      this.wheels.push(wheel)
      this.body.mesh.add(wheel.mesh)
    })
  }

  update(time, curve) {
    // 沿路径移动逻辑...
    // 轮子旋转
    this.wheels.forEach((wheel) => wheel.rotate(time))
  }
}

class Body {
  constructor() {
    this.geometry = new THREE.BoxGeometry(4, 1, 8)
    this.material = new THREE.MeshPhongMaterial({ color: 0x6688aa })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.y = 1.4
    this.mesh.castShadow = true
  }
}

class Turret {
  constructor() {
    this.pivot = new THREE.Object3D()
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.1, 1.2),
      new THREE.MeshPhongMaterial({ color: 0x6688aa })
    )
    this.pivot.add(this.mesh)
    this.mesh.position.z = 0.6
  }
}

class Wheel {
  constructor(position) {
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 0.5, 6),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    )
    this.mesh.position.set(...position)
    this.mesh.rotation.z = Math.PI * 0.5
    this.mesh.castShadow = true
  }

  rotate(time) {
    this.mesh.rotation.x = time * 3
  }
}

class Target {
  constructor() {
    this.orbit = new THREE.Object3D()
    this.elevation = new THREE.Object3D()
    this.bob = new THREE.Object3D()
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 6, 3),
      new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: true
      })
    )

    this.orbit.add(this.elevation)
    this.elevation.add(this.bob)
    this.bob.add(this.mesh)
  }

  update(time) {
    this.orbit.rotation.y = time * 0.27
    this.bob.position.y = Math.sin(time * 2) * 4
    this.mesh.rotation.x = time * 7
    this.mesh.rotation.y = time * 13
  }
}

class SplinePath {
  constructor() {
    this.curve = new THREE.SplineCurve([
      /* points */
    ])
    this.geometry = new THREE.BufferGeometry().setFromPoints(
      this.curve.getPoints(50)
    )
    this.material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    this.object = new THREE.Line(this.geometry, this.material)
    this.object.rotation.x = Math.PI * 0.5
  }
}
