import { defineComponent, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import styles from './styles.module.less'
export default defineComponent({
  setup() {
    const main = () => {
      const canvas = document.querySelector('#f') as HTMLCanvasElement
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
      let countryInfos: any

      const fov = 60
      const aspect = 2 // the canvas default
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
      scene.background = new THREE.Color('#246')

      const pickingScene = new THREE.Scene()
      pickingScene.background = new THREE.Color(0)

      const tempColor = new THREE.Color()
      function get255BasedColor(color) {
        tempColor.set(color)
        const base = tempColor.toArray().map((v) => v * 255)
        base.push(255) // alpha
        return base
      }

      const selectedColor = get255BasedColor('red')
      const unselectedColor = get255BasedColor('#444')
      const oceanColor = get255BasedColor('rgb(100,200,255)')
      const maxNumCountries = 512

      function setPaletteColor(index, color) {
        palette.set(color, index * 4)
      }

      function resetPalette() {
        for (let i = 1; i < maxNumCountries; ++i) {
          setPaletteColor(i, unselectedColor)
        }

        setPaletteColor(0, oceanColor)
        countryInfos?.forEach((countryInfo) => {
          countryInfo.selected = false
        })
        paletteTexture.needsUpdate = true
      }

      const paletteTextureWidth = maxNumCountries
      const paletteTextureHeight = 1
      const palette = new Uint8Array(paletteTextureWidth * 4)
      const paletteTexture = new THREE.DataTexture(
        palette,
        paletteTextureWidth,
        paletteTextureHeight
      )
      paletteTexture.minFilter = THREE.NearestFilter
      paletteTexture.magFilter = THREE.NearestFilter
      paletteTexture.colorSpace = THREE.SRGBColorSpace
      resetPalette()

      {
        const loader = new THREE.TextureLoader()
        const geometry = new THREE.SphereGeometry(1, 64, 32)

        const indexTexture = loader.load(
          'https://threejs.org/manual/examples/resources/data/world/country-index-texture.png',
          render
        )
        indexTexture.minFilter = THREE.NearestFilter
        indexTexture.magFilter = THREE.NearestFilter

        const pickingMaterial = new THREE.MeshBasicMaterial({
          map: indexTexture
        })
        pickingScene.add(new THREE.Mesh(geometry, pickingMaterial))

        const fragmentShaderReplacements = [
          {
            from: '#include <common>',
            to: `
          #include <common>
          uniform sampler2D indexTexture;
          uniform sampler2D paletteTexture;
          uniform float paletteTextureWidth;
        `
          },
          {
            from: '#include <color_fragment>',
            to: `
          #include <color_fragment>
          {
            vec4 indexColor = texture2D(indexTexture, vMapUv);
            float index = indexColor.r * 255.0 + indexColor.g * 255.0 * 256.0;
            vec2 paletteUV = vec2((index + 0.5) / paletteTextureWidth, 0.5);
            vec4 paletteColor = texture2D(paletteTexture, paletteUV);
            // diffuseColor.rgb += paletteColor.rgb;   // white outlines
            diffuseColor.rgb = paletteColor.rgb - diffuseColor.rgb;  // black outlines
          }
        `
          }
        ]

        const texture = loader.load(
          'https://threejs.org/manual/examples/resources/data/world/country-outlines-4k.png',
          render
        )
        const material = new THREE.MeshBasicMaterial({ map: texture })
        material.onBeforeCompile = function (shader) {
          fragmentShaderReplacements.forEach((rep) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              rep.from,
              rep.to
            )
          })
          shader.uniforms.paletteTexture = { value: paletteTexture }
          shader.uniforms.indexTexture = { value: indexTexture }
          shader.uniforms.paletteTextureWidth = { value: paletteTextureWidth }
        }
        scene.add(new THREE.Mesh(geometry, material))
      }

      async function loadJSON(url) {
        const req = await fetch(url)
        return req.json()
      }

      const loadCountryInfo = async () => {
        countryInfos = await loadJSON(
          'https://threejs.org/manual/examples/resources/data/world/country-info.json'
        )
        const lonFudge = -Math.PI * 0.5
        const latFudge = Math.PI
        const lonHelper = new THREE.Object3D()
        const latHelper = new THREE.Object3D()
        lonHelper.add(latHelper)
        const positionHelper = new THREE.Object3D()
        positionHelper.position.z = 1
        latHelper.add(positionHelper)
        const labelParentElem = document.querySelector('#labels')
        console.log(countryInfos)
        for (const countryInfo of countryInfos) {
          const { lat, lon, min, max, name } = countryInfo
          lonHelper.rotation.y = THREE.MathUtils.degToRad(lon) + lonFudge
          latHelper.rotation.x = THREE.MathUtils.degToRad(lat) + latFudge

          positionHelper.updateWorldMatrix(true, false)
          const position = new THREE.Vector3()
          positionHelper.getWorldPosition(position)
          countryInfo.position = position

          const width = max[0] - min[0]
          const height = max[1] - min[1]
          const area = width * height
          countryInfo.area = area

          const elem = document.createElement('div')
          elem.textContent = name
          labelParentElem.appendChild(elem)
          countryInfo.elem = elem
        }

        requestRenderIfNotRequested()
      }
      loadCountryInfo()

      const tempV = new THREE.Vector3()
      const cameraToPoint = new THREE.Vector3()
      const cameraPosition = new THREE.Vector3()
      const normalMatrix = new THREE.Matrix3()
      const updateLabels = () => {
        if (!countryInfos) {
          return
        }
        const minVisibleDot = 0.3
        const large = 10 * 10
        normalMatrix.getNormalMatrix(camera.matrixWorldInverse)
        camera.getWorldPosition(cameraPosition)
        for (const countryInfo of countryInfos) {
          const { position, elem, name, area, selected } = countryInfo
          // 位置向量转换成相机坐标系
          // 世界坐标系原点指向position的向量
          tempV.copy(position)
          tempV.applyMatrix3(normalMatrix)
          // 相机原点指向position的向量
          cameraToPoint.copy(position)
          cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize()
          // 对两个向量进行点乘，得到两个向量的夹角余弦值 值为1 代表两个向量方向相同，值为-1代表两个向量方向相反
          const dot = tempV.dot(cameraToPoint)

          if (dot > minVisibleDot) {
            elem.style.display = 'none'
            continue
          }
          const show = selected || area > large
          if (!show) {
            elem.style.display = 'none'
            continue
          }

          // 将元素恢复为其默认显示样式
          elem.style.display = ''
          // 将点位的坐标映射到屏幕坐标，范围是-1到1
          tempV.copy(position)
          tempV.project(camera)
          const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth
          const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight

          elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
          elem.style.zIndex = ((-tempV.z * 0.5 + 0.5) * 100000) | 0
          if (selected) {
            elem.style.color = 'red'
          } else {
            elem.style.color = ''
          }
        }
      }

      class GPUPickHelper {
        pickingTexture: THREE.WebGLRenderTarget
        pixelBuffer: Uint8Array
        constructor() {
          this.pickingTexture = new THREE.WebGLRenderTarget(1, 1)
          this.pixelBuffer = new Uint8Array(4)
        }
        pick(cssPosition, scene, camera) {
          const { pickingTexture, pixelBuffer } = this

          const pixelRatio = renderer.getPixelRatio()
          camera.setViewOffset(
            renderer.getContext().drawingBufferWidth, // full width
            renderer.getContext().drawingBufferHeight, // full top
            (cssPosition.x * pixelRatio) | 0, // rect x
            (cssPosition.y * pixelRatio) | 0, // rect y
            1, // rect width
            1 // rect height
          )
          // render the scene
          renderer.setRenderTarget(pickingTexture)
          renderer.render(scene, camera)
          renderer.setRenderTarget(null)
          // clear the view offset so rendering returns to normal
          camera.clearViewOffset()
          //read the pixel
          renderer.readRenderTargetPixels(
            pickingTexture,
            0, // x
            0, // y
            1, // width
            1, // height
            pixelBuffer
          )
          console.log(pixelBuffer)

          const id =
            (pixelBuffer[0] << 0) |
            (pixelBuffer[1] << 8) |
            (pixelBuffer[2] << 16)

          return id
        }
      }
      const pickHelper = new GPUPickHelper()

      function getCanvasRelativePosition(event) {
        const rect = canvas.getBoundingClientRect()
        return {
          x: ((event.clientX - rect.left) * canvas.width) / rect.width,
          y: ((event.clientY - rect.top) * canvas.height) / rect.height
        }
      }
      function pickCountry(event) {
        if (!countryInfos) {
          return
        }

        const position = getCanvasRelativePosition(event)
        console.log(position)
        const id = pickHelper.pick(position, pickingScene, camera)
        if (id > 0) {
          const countryInfo = countryInfos[id - 1]
          const selected = !countryInfo.selected
          setPaletteColor(id, selected ? selectedColor : unselectedColor)
          paletteTexture.needsUpdate = true
          countryInfo.selected = selected
        } else {
          resetPalette()
        }

        requestRenderIfNotRequested()
      }

      canvas.addEventListener('pointerup', pickCountry)

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        console.log(canvas.clientWidth, canvas.clientHeight)
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }

        return needResize
      }

      let renderRequested = false

      function render() {
        renderRequested = false

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }

        controls.update()
        updateLabels()
        renderer.render(scene, camera)
      }

      render()

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
      <div class={styles.container}>
        <canvas id="f" style={{ width: '100%', height: '100%' }}></canvas>
        <div id="labels" class={styles.labels}></div>
      </div>
    )
  }
})
