import { defineComponent, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

export default defineComponent({
  setup() {
    const main = () => {
      const canvas = document.querySelector('#b') as HTMLCanvasElement
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

      const fov = 60
      const aspect = 2
      const near = 0.1
      const far = 10
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.z = 2.5

      const controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      controls.enablePan = false
      controls.minDistance = 1.2
      controls.maxDistance = 4
      controls.update()

      const scene = new THREE.Scene()
      scene.background = new THREE.Color('gray')

      {
        const loader = new THREE.TextureLoader()
        const texture = loader.load(
          'https://threejs.org/manual/examples/resources/images/world.jpg'
        )
        texture.colorSpace = THREE.SRGBColorSpace
        const geometry = new THREE.SphereGeometry(1, 64, 32)
        const axesHelper = new THREE.AxesHelper(5)
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.add(axesHelper)

        scene.add(sphere)
      }

      function resizeRendererToDisplaySize(renderer: any) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }

        return needResize
      }

      let renderRequested = false
      const render = () => {
        renderRequested = false
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }

        controls.update()
        renderer.render(scene, camera)
      }

      async function loadFile(url) {
        const req = await fetch(url)
        return req.text()
      }

      const parseData = (text) => {
        const data: any = []
        const setting: any = { data }
        let max: any, min: any
        text.split('\n').forEach((line) => {
          const parts = line.trim().split(/\s+/)
          if (parts.length === 2) {
            setting[parts[0]] = parseFloat(parts[1])
          } else if (parts.length > 2) {
            const values = parts.map((v) => {
              const value = parseFloat(v)
              if (value === setting.NODATA_value) {
                return undefined
              }
              max = Math.max(max === undefined ? value : max, value)
              min = Math.min(min === undefined ? value : min, value)
              return value
            })
            data.push(values)
          }
        })
        return Object.assign(setting, { min, max })
      }

      const addBoxes = (file) => {
        const { min, max, data } = file
        const range = max - min

        const lonHelper = new THREE.Object3D()
        scene.add(lonHelper)
        const latHelper = new THREE.Object3D()
        lonHelper.add(latHelper)
        const positionHelper = new THREE.Object3D()
        positionHelper.position.z = 1
        latHelper.add(positionHelper)

        const originHelper = new THREE.Object3D()
        originHelper.position.z = 0.5
        positionHelper.add(originHelper)

        const color = new THREE.Color()

        const lonFudge = Math.PI * 0.5
        const latFudge = Math.PI * -0.135

        const geometries = []
        data.forEach((row, latNdx) => {
          row.forEach((value, lonNdx) => {
            if (value === undefined) {
              return
            }

            const amount = (value - min) / range

            const boxWidth = 1
            const boxHeight = 1
            const boxDepth = 1
            const geometry = new THREE.BoxGeometry(
              boxWidth,
              boxHeight,
              boxDepth
            )
            lonHelper.rotation.y =
              THREE.MathUtils.degToRad(lonNdx + file.xllcorner) + lonFudge
            latHelper.rotation.x =
              THREE.MathUtils.degToRad(latNdx + file.yllcorner) + latFudge
            positionHelper.scale.set(
              0.005,
              0.005,
              THREE.MathUtils.lerp(0.01, 0.5, amount)
            )
            originHelper.updateWorldMatrix(true, false)
            geometry.applyMatrix4(originHelper.matrixWorld)

            const hue = THREE.MathUtils.lerp(0.7, 0.3, amount)
            const saturation = 1
            const lightness = THREE.MathUtils.lerp(0.4, 1.0, amount)
            color.setHSL(hue, saturation, lightness)
            console.log(geometry.getAttribute('position'))
            const rgb = color.toArray().map((v) => v * 255)
            const numVerts = geometry.getAttribute('position').count
            const itemSize = 3 // r, g, b
            const colors = new Uint8Array(itemSize * numVerts)
            console.log(rgb)
            colors.forEach((v, ndx) => {
              colors[ndx] = rgb[ndx % 3]
            })
            const normalized = true
            const colorAttrib = new THREE.BufferAttribute(
              colors,
              itemSize,
              normalized
            )
            geometry.setAttribute('color', colorAttrib)

            geometries.push(geometry)
          })
        })
        const mergedGeometry = BufferGeometryUtils.mergeGeometries(
          geometries,
          false
        )
        const material = new THREE.MeshBasicMaterial({
          vertexColors: true
        })
        const mesh = new THREE.Mesh(mergedGeometry, material)
        scene.add(mesh)
      }

      loadFile(
        'https://threejs.org/manual/examples/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc'
      )
        .then(parseData)
        .then(addBoxes)
        .then(render)

      function requestRenderIfNotRequested() {
        if (!renderRequested) {
          renderRequested = true
          requestAnimationFrame(render)
        }
      }
      controls.addEventListener('change', requestRenderIfNotRequested)
      window.addEventListener('resize', requestRenderIfNotRequested)
    }

    onMounted(() => {
      main()
    })

    return () => (
      <canvas
        id="b"
        style={{ width: '100%', height: '100%', display: 'block' }}
      ></canvas>
    )
  }
})
