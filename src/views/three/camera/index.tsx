import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import styles from './styles.module.less'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
export default defineComponent({
  setup() {
    let animationFrameId: number
    let renderer: THREE.WebGLRenderer
    const main = () => {
      const canvas = document.querySelector('#a') as HTMLCanvasElement
      const view1Elem = document.querySelector('#view1')
      const view2Elem = document.querySelector('#view2')
      renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

      const fov = 45
      const aspect = 2 // the canvas default
      const near = 5
      const far = 100
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.set(0, 10, 20)
      const cameraHelper = new THREE.CameraHelper(camera)

      class MinMaxGUIHelper {
        obj: any
        minProp: any
        maxProp: any
        minDif: any
        constructor(obj, minProp, maxProp, minDif) {
          this.obj = obj
          this.minProp = minProp
          this.maxProp = maxProp
          this.minDif = minDif
        }
        get min() {
          return this.obj[this.minProp]
        }
        set min(v) {
          this.obj[this.minProp] = v
          this.obj[this.maxProp] = Math.max(
            this.obj[this.maxProp],
            v + this.minDif
          )
        }
        get max() {
          return this.obj[this.maxProp]
        }
        set max(v) {
          this.obj[this.maxProp] = v
        }
      }

      const gui = new GUI()
      gui.add(camera, 'fov', 1, 180)
      gui.add(camera.position, 'x', -50, 50)
      const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1)
      gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near')
      gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far')

      const controls = new OrbitControls(camera, view1Elem)
      controls.target.set(0, 5, 0)
      controls.update()

      const camera2 = new THREE.PerspectiveCamera(
        60, // fov
        2, // aspect
        0.1, // near
        500 // far
      )
      camera2.position.set(140, 110, 130)
      camera2.lookAt(0, 5, 0)

      const controls2 = new OrbitControls(camera2, view2Elem)
      controls2.target.set(0, 5, 0)
      controls2.update()

      const scene = new THREE.Scene()
      scene.background = new THREE.Color('black')
      scene.add(cameraHelper)

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
        scene.add(mesh)
      }
      {
        const color = 0xffffff
        const intensity = 3
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(0, 10, 0)
        light.target.position.set(-5, 0, 0)
        scene.add(light)
        scene.add(light.target)
      }
      {
        const cubeSize = 4
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
        const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' })
        const mesh = new THREE.Mesh(cubeGeo, cubeMat)
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0)
        scene.add(mesh)
      }

      {
        const sphereRadius = 3
        const sphereWidthDivisions = 32
        const sphereHeightDivisions = 16
        const sphereGeo = new THREE.SphereGeometry(
          sphereRadius,
          sphereWidthDivisions,
          sphereHeightDivisions
        )
        const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' })
        const mesh = new THREE.Mesh(sphereGeo, sphereMat)
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0)
        scene.add(mesh)
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

      function setScissorForElement(elem) {
        const canvasRect = canvas.getBoundingClientRect()
        const elemRect = elem.getBoundingClientRect()
        const right =
          Math.min(elemRect.right, canvasRect.right) - canvasRect.left
        const left = Math.max(0, elemRect.left - canvasRect.left)
        const bottom =
          Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top
        const top = Math.max(0, elemRect.top - canvasRect.top)

        const width = Math.min(canvasRect.width, right - left)
        const height = Math.min(canvasRect.height, bottom - top)

        const positiveYUpBottom = canvasRect.height - bottom
        renderer.setScissor(left, positiveYUpBottom, width, height)
        renderer.setViewport(left, positiveYUpBottom, width, height)

        return width / height
      }
      const render = () => {
        controls.update()
        resizeRendererToDisplaySize(renderer)
        renderer.setScissorTest(true)
        {
          const aspect = setScissorForElement(view1Elem)
          camera.aspect = aspect
          camera.updateProjectionMatrix()
          cameraHelper.update()
          cameraHelper.visible = false
          scene.background?.set(0x000000)
          renderer.render(scene, camera)
        }
        {
          const aspect = setScissorForElement(view2Elem)
          camera2.aspect = aspect
          camera2.updateProjectionMatrix()
          cameraHelper.visible = true
          scene.background?.set(0x000040)
          renderer.render(scene, camera2)
        }

        animationFrameId = requestAnimationFrame(render)
      }

      animationFrameId = requestAnimationFrame(render)
    }
    onMounted(() => {
      main()
    })

    onUnmounted(() => {
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
    })

    return () => (
      <div class={styles.container}>
        <canvas
          id="a"
          style={{ width: '100%', height: '100%', display: 'block' }}
        ></canvas>
        <div class={styles.split}>
          <div class={styles.item} id="view1" tabindex="1"></div>
          <div class={styles.item} id="view2" tabindex="2"></div>
        </div>
      </div>
    )
  }
})
