import * as THREE from 'three'
export class TankSimulation {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  cameras: Array<THREE.PerspectiveCamera> = []
  scene: THREE.Scene
  curve: Curve = new Curve()
  tank: Tank = new Tank()
  target: Target = new Target()

  targetPosition: THREE.Vector3 = new THREE.Vector3()
  tankPosition: THREE.Vector2 = new THREE.Vector2()
  tankTarget: THREE.Vector2 = new THREE.Vector2()
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
    this.initTank()
    this.initCurve()
    this.initTarget()
    this.resizeRendererToDisplaySize()
    requestAnimationFrame(this.render.bind(this))
  }
  initRenderer() {
    this.renderer.setClearColor(0xaaaaaa)
    this.renderer.shadowMap.enabled = true
  }
  initCameras() {
    this.cameras = [new Camera({ fov: 40, position: [4, 4, 10] }).instance]
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

    {
      const axes = new THREE.AxesHelper(50)
      axes.renderOrder = 1
      groundMesh.add(axes)
    }
    this.scene.add(groundMesh)
  }
  initTank() {
    this.scene.add(this.tank.tankContainer)
  }
  initTarget() {
    this.scene.add(this.target.targetOrbit)
  }

  resizeRendererToDisplaySize() {
    // todo
    const camera = this.cameras[0]
    const canvas = this.renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    camera.updateProjectionMatrix()
  }
  initCurve() {
    this.scene.add(this.curve.splineObject)
  }
  render(time: number) {
    time *= 0.001
    // move target
    this.target.targetOrbit.rotation.y = time * 0.27
    this.target.targetBob.position.y = Math.sin(time * 2) * 4
    this.target.targetMesh.rotation.x = time * 7
    this.target.targetMesh.rotation.y = time * 13
    // move tank
    this.curve.curve.getPointAt((time * 0.05) % 1, this.tankPosition)
    this.curve.curve.getPointAt((time * 0.05 + 0.01) % 1, this.tankTarget)
    this.tank.tankContainer.position.set(
      this.tankPosition.x,
      0,
      this.tankPosition.y
    )
    this.tank.tankContainer.lookAt(this.tankTarget.x, 0, this.tankTarget.y)

    // move turret
    this.target.targetMesh.getWorldPosition(this.targetPosition)
    this.tank.body.turret.turretPivot.lookAt(this.targetPosition)

    this.tank.body.wheel.wheelMeshes.forEach((wheelMesh: THREE.Mesh) => {
      wheelMesh.rotation.x = time * 3
    })
    this.renderer.render(this.scene, this.cameras[0])
    requestAnimationFrame(this.render.bind(this))
  }
}

class Camera {
  instance: THREE.PerspectiveCamera
  fov = 40
  aspect = 2
  zNear = 0.1
  zFar = 1000
  constructor({ fov = 40, position = [0, 0, 0] as [number, number, number] }) {
    this.fov = fov
    this.instance = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      this.zNear,
      this.zFar
    )
    this.instance.position.set(...position).multiplyScalar(3)
    this.instance.lookAt(0, 0, 0)
  }
}

class Tank {
  tankContainer: THREE.Object3D
  body: any

  constructor() {
    this.tankContainer = new THREE.Object3D()
    this.initComponents()
  }

  initComponents() {
    this.body = new Body()
    this.tankContainer.add(this.body.mesh)
  }
}

class Body {
  carWidth = 4
  carHeight = 1
  carLength = 8
  geometry: THREE.BoxGeometry
  material: THREE.MeshPhongMaterial
  mesh: THREE.Mesh
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    2,
    0.1,
    1000
  )
  turret: Turret = new Turret(this.carLength)
  wheel: Wheel = new Wheel()
  constructor() {
    this.geometry = new THREE.BoxGeometry(
      this.carWidth,
      this.carHeight,
      this.carLength
    )
    this.material = new THREE.MeshPhongMaterial({ color: 0x6688aa })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.y = 1.4
    this.mesh.castShadow = true
    this.initCamera()
    this.initWheel()
    this.initDome()
    this.initTurret()
  }
  initCamera() {
    this.camera.position.y = 3
    this.camera.position.z = -6
    this.camera.rotation.y = Math.PI
    this.mesh.add(this.camera)
  }
  initWheel() {
    this.wheel.generateWheel(
      this.mesh,
      this.carWidth,
      this.carHeight,
      this.carLength
    )
  }
  initDome() {
    const dome = new Dome()
    this.mesh.add(dome.domeMesh)
  }
  initTurret() {
    this.mesh.add(this.turret.turretPivot)
  }
}

class Wheel {
  wheelRadius = 1
  wheelThickness = 0.5
  wheelSegments = 6
  wheelGeometry: THREE.CylinderGeometry
  wheelMaterial: THREE.MeshPhongMaterial
  wheelMeshes: THREE.Mesh[] = []
  constructor() {
    this.wheelGeometry = new THREE.CylinderGeometry(
      this.wheelRadius, // top radius
      this.wheelRadius, // bottom radius
      this.wheelThickness, // height of cylinder
      this.wheelSegments
    )
    this.wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 })
  }
  generateWheel(
    bodyMesh: THREE.Mesh,
    carWidth: number,
    carHeight: number,
    carLength: number
  ) {
    const wheelPositions: [number, number, number][] = [
      [-carWidth / 2 - this.wheelThickness / 2, -carHeight / 2, carLength / 3],
      [carWidth / 2 + this.wheelThickness / 2, -carHeight / 2, carLength / 3],
      [-carWidth / 2 - this.wheelThickness / 2, -carHeight / 2, 0],
      [carWidth / 2 + this.wheelThickness / 2, -carHeight / 2, 0],
      [-carWidth / 2 - this.wheelThickness / 2, -carHeight / 2, -carLength / 3],
      [carWidth / 2 + this.wheelThickness / 2, -carHeight / 2, -carLength / 3]
    ]

    const wheelMeshes = wheelPositions.map((position) => {
      const mesh = new THREE.Mesh(this.wheelGeometry, this.wheelMaterial)
      mesh.position.set(...position)
      mesh.rotation.z = Math.PI * 0.5
      mesh.castShadow = true
      bodyMesh.add(mesh)
      return mesh
    })
    this.wheelMeshes = wheelMeshes
  }
}

class Dome {
  domeRadius = 2
  domeWidthSubdivisions = 12
  domeHeightSubdivisions = 12
  domePhiStart = 0
  domePhiLength = Math.PI * 2
  domeThetaStart = 0
  domeThetaLength = Math.PI * 0.5
  domeGeometry: THREE.SphereGeometry
  domeMaterial: THREE.MeshPhongMaterial
  domeMesh: THREE.Mesh
  constructor() {
    this.domeGeometry = new THREE.SphereGeometry(
      this.domeRadius,
      this.domeWidthSubdivisions,
      this.domeHeightSubdivisions,
      this.domePhiStart,
      this.domePhiLength,
      this.domeThetaStart,
      this.domeThetaLength
    )
    this.domeMaterial = new THREE.MeshPhongMaterial({ color: 0x6688aa })
    this.domeMesh = new THREE.Mesh(this.domeGeometry, this.domeMaterial)
    this.domeMesh.castShadow = true
    this.domeMesh.position.y = 0.5
  }
}

class Turret {
  turretWidth = 0.1
  turretHeight = 0.1
  carLength
  turretLength
  turretGeometry: THREE.BoxGeometry
  turretMaterial: THREE.MeshPhongMaterial
  turretMesh: THREE.Mesh
  turretPivot: THREE.Object3D
  constructor(carLength: number) {
    this.carLength = carLength
    this.turretLength = this.carLength * 0.75 * 0.2
    this.turretGeometry = new THREE.BoxGeometry(
      this.turretWidth,
      this.turretHeight,
      this.turretLength
    )
    this.turretMaterial = new THREE.MeshPhongMaterial({ color: 0x6688aa })
    this.turretMesh = new THREE.Mesh(this.turretGeometry, this.turretMaterial)
    this.turretPivot = new THREE.Object3D()
    this.turretMesh.castShadow = true
    this.turretPivot.scale.set(5, 5, 5)
    this.turretPivot.position.y = 0.5
    this.turretMesh.position.z = this.turretLength * 0.5
    this.turretPivot.add(this.turretMesh)
    this.turretPivot.rotation.x = -Math.PI / 8
  }
}

class Target {
  targetOrbit: THREE.Object3D
  targetElevation: THREE.Object3D
  targetBob: THREE.Object3D
  targetMesh: THREE.Mesh
  constructor() {
    const targetGeometry = new THREE.SphereGeometry(0.5, 6, 3)
    const targetMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      flatShading: true
    })
    const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial)
    const targetOrbit = new THREE.Object3D()
    const targetElevation = new THREE.Object3D()
    const targetBob = new THREE.Object3D()
    targetMesh.castShadow = true
    targetOrbit.add(targetElevation)
    targetElevation.position.z = 16
    targetElevation.position.y = 8
    targetElevation.add(targetBob)
    targetBob.add(targetMesh)
    this.targetOrbit = targetOrbit
    this.targetMesh = targetMesh
    this.targetElevation = targetElevation
    this.targetBob = targetBob
  }
}

class Curve {
  curve: THREE.SplineCurve
  splineObject: THREE.Line
  constructor() {
    this.curve = new THREE.SplineCurve([
      new THREE.Vector2(-10, 0),
      new THREE.Vector2(-5, 5),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(5, -5),
      new THREE.Vector2(10, 0),
      new THREE.Vector2(5, 10),
      new THREE.Vector2(-5, 10),
      new THREE.Vector2(-10, -10),
      new THREE.Vector2(-15, -8),
      new THREE.Vector2(-10, 0)
    ])
    const points = this.curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    this.splineObject = new THREE.Line(geometry, material)
    this.splineObject.rotation.x = Math.PI * 0.5
    this.splineObject.position.y = 0.05
  }
}
