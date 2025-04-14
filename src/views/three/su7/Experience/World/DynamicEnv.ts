import * as kokomi from 'kokomi.js'
import * as THREE from 'three'
import dynamicEnvVertexShader from '../Shaders/DynamicEnv/vert.glsl'
import dynamicEnvFragmentShader from '../Shaders/DynamicEnv/frag.glsl'

import type Experience from '../Experience'

export default class DynamicEnv extends kokomi.Component {
  fbo: kokomi.FBO
  material: THREE.ShaderMaterial
  base: Experience
  quad: kokomi.FullScreenQuad
  constructor(base: Experience, config: any) {
    super(base)

    this.base = base
    const { envmap1, envmap2 } = config

    const envData = envmap1.source.data
    const fbo = new kokomi.FBO(this.base, {
      width: envData.width,
      height: envData.height
    })
    this.fbo = fbo
    this.envmap.mapping = THREE.CubeUVReflectionMapping

    const material = new THREE.ShaderMaterial({
      vertexShader: dynamicEnvVertexShader,
      fragmentShader: dynamicEnvFragmentShader,
      uniforms: {
        uEnvmap1: {
          value: envmap1
        },
        uEnvmap2: {
          value: envmap2
        },
        uWeight: {
          value: 0
        },
        uIntensity: {
          value: 1
        }
      }
    })
    this.material = material

    const quad = new kokomi.FullScreenQuad(material)
    this.quad = quad
  }
  get envmap() {
    return this.fbo.rt.texture
  }
  setWeight(value: number) {
    this.material.uniforms.uWeight.value = value
  }
  update() {
    this.base.renderer.setRenderTarget(this.fbo.rt)
    this.quad.render(this.base.renderer)
    this.base.renderer.setRenderTarget(null)
  }
}
