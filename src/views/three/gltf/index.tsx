import { defineComponent, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
export default defineComponent({
  setup() {
    const main = () => {
      const canvas = document.querySelector('#c') as HTMLCanvasElement
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
      renderer.shadowMap.enabled = true
      const fov = 45
      const aspect = 2 // the canvas default
      const near = 0.1
      const far = 100
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.set(0, 10, 20)

      const controls = new OrbitControls(camera, canvas)
      controls.target.set(0, 5, 0)
      controls.update()

      const scene = new THREE.Scene()
      const axesHelper = new THREE.AxesHelper(1000)
      scene.add(axesHelper)
      scene.background = new THREE.Color('#DEFEFF')

      {
        const planeSize = 40

        const loader = new THREE.TextureLoader()
        const texture = loader.load(
          'https://threejs.org/manual/examples/resources/images/checker.png'
        )
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.magFilter = THREE.NearestFilter
        texture.colorSpace = THREE.SRGBColorSpace
        const repeats = planeSize / 2
        texture.repeat.set(repeats, repeats)

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide
        })
        const mesh = new THREE.Mesh(planeGeo, planeMat)
        mesh.rotation.x = Math.PI * -0.5
        mesh.receiveShadow = true
        scene.add(mesh)
      }

      {
        const skyColor = 0xb1e1ff // light blue
        const groundColor = 0xb97a20 // brownish orange
        const intensity = 2
        const light = new THREE.HemisphereLight(
          skyColor,
          groundColor,
          intensity
        )
        scene.add(light)
      }

      {
        const color = 0xffffff
        const intensity = 2.5
        const light = new THREE.DirectionalLight(color, intensity)
        light.castShadow = true
        light.position.set(5, 10, 2)
        light.shadow.bias = -0.004
        light.shadow.mapSize.width = 2048
        light.shadow.mapSize.height = 2048
        scene.add(light)
        scene.add(light.target)
        const cam = light.shadow.camera
        cam.near = 1
        cam.far = 2000
        cam.left = -1500
        cam.right = 1500
        cam.top = 1500
        cam.bottom = -1500
      }
      const frameArea = (sizeToFitOnScreen, boxSize, boxCenter, camera) => {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5)
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY)
        console.log(distance, halfSizeToFitOnScreen, halfFovY)

        const direction = new THREE.Vector3()
          .subVectors(camera.position, boxCenter)
          .multiply(new THREE.Vector3(1, 0, 1))
          .normalize()

        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter))

        camera.near = boxSize / 100
        camera.far = boxSize * 100
        camera.updateProjectionMatrix()
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z)
      }
      let curve

      {
        const controlPoints: [number, number, number][] = [
          [1.118281, 5.115846, -3.681386],
          [3.948875, 5.115846, -3.641834],
          [3.960072, 5.115846, -0.240352],
          [3.985447, 5.115846, 4.585005],
          [-3.793631, 5.115846, 4.585006],
          [-3.826839, 5.115846, -14.7362],
          [-14.542292, 5.115846, -14.765865],
          [-14.520929, 5.115846, -3.627002],
          [-5.452815, 5.115846, -3.634418],
          [-5.467251, 5.115846, 4.549161],
          [-13.266233, 5.115846, 4.567083],
          [-13.250067, 5.115846, -13.499271],
          [4.081842, 5.115846, -13.435463],
          [4.125436, 5.115846, -5.334928],
          [-14.521364, 5.115846, -5.239871],
          [-14.510466, 5.115846, 5.486727],
          [5.745666, 5.115846, 5.510492],
          [5.787942, 5.115846, -14.728308],
          [-5.42372, 5.115846, -14.761919],
          [-5.373599, 5.115846, -3.704133],
          [1.004861, 5.115846, -3.641834]
        ]
        const p0 = new THREE.Vector3()
        const p1 = new THREE.Vector3()
        curve = new THREE.CatmullRomCurve3(
          controlPoints
            .map((p, ndx) => {
              p0.set(...p)
              p1.set(...controlPoints[(ndx + 1) % controlPoints.length])
              return [
                new THREE.Vector3().copy(p0),
                new THREE.Vector3().lerpVectors(p0, p1, 0.1),
                new THREE.Vector3().lerpVectors(p0, p1, 0.9)
              ]
            })
            .flat(),
          true
        )
      }
      const points = curve.getPoints(250)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
      const curveObject = new THREE.Line(geometry, material)
      curveObject.scale.set(100, 100, 100)
      curveObject.position.y = -621
      curveObject.visible = true
      material.depthTest = false
      curveObject.renderOrder = 1
      scene.add(curveObject)

      const cars = []
      {
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
          'https://threejs.org/manual/examples/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf',
          (gltf) => {
            const root = gltf.scene
            scene.add(root)
            root.traverse((obj) => {
              if (obj.castShadow !== undefined) {
                obj.castShadow = true
                obj.receiveShadow = true
              }
            })
            const loadedCars = root.getObjectByName('Cars')
            const fixes = [
              {
                prefix: 'Car_08',
                rot: [Math.PI * 0.5, 0, Math.PI * 0.5],
                y: 0
              },
              { prefix: 'CAR_03', rot: [0, Math.PI, 0], y: 33 },
              { prefix: 'Car_04', rot: [0, Math.PI, 0], y: 40 }
            ]
            root.updateMatrixWorld()

            for (const car of loadedCars.children.slice()) {
              const fix = fixes.find((fix) => car.name.startsWith(fix.prefix))
              const obj = new THREE.Object3D()
              car.getWorldPosition(obj.position)
              car.position.set(0, fix.y, 0)
              const axesHelper = new THREE.AxesHelper(100)
              car.add(axesHelper)
              car.rotation.set(...fix.rot)
              obj.add(car)
              scene.add(obj)
              cars.push(obj)
            }

            const box = new THREE.Box3().setFromObject(root)
            const boxSize = box.getSize(new THREE.Vector3()).length()
            const boxCenter = box.getCenter(new THREE.Vector3())
            frameArea(boxSize * 0.5, boxSize, boxCenter, camera)
            controls.maxDistance = boxSize * 10
            controls.target.copy(boxCenter)
            controls.update()
          }
        )
      }

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }

        return needResize
      }
      const carPosition = new THREE.Vector3()
      const carTarget = new THREE.Vector3()
      function render(time) {
        time *= 0.001 // convert to seconds

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
        const pathTime = time * 0.01
        const targetOffset = 0.01
        cars.forEach((car, ndx) => {
          const u = pathTime + ndx / cars.length
          curve.getPointAt(u % 1, carPosition)
          carPosition.applyMatrix4(curveObject.matrixWorld)
          curve.getPointAt((u + targetOffset) % 1, carTarget)
          carTarget.applyMatrix4(curveObject.matrixWorld)
          car.position.copy(carPosition)
          car.lookAt(carTarget)
          car.position.lerpVectors(carPosition, carTarget, 0.5)
        })
        renderer.render(scene, camera)

        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    }
    onMounted(() => {
      main()
    })
    return () => (
      <div>
        <canvas id="c" style={{ width: '100%', height: '100%' }}></canvas>
      </div>
    )
  }
})
