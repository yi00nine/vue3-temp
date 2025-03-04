import { defineComponent, onMounted } from 'vue'
import * as THREE from 'three'
import { TankSimulation } from './tankSimulation'
export default defineComponent({
  setup() {
    onMounted(() => {
      new TankSimulation()
    })
    return () => (
      <canvas id="c" style={{ width: '100%', height: '100%' }}></canvas>
    )
  }
})
