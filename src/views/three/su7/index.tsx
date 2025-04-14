import { defineComponent, onMounted } from 'vue'
import { adaptMobileDOM } from 'kokomi.js'
import Experience from './Experience/Experience'
export default defineComponent({
  setup() {
    onMounted(() => {
      const container = document.getElementById('container') as HTMLElement
      adaptMobileDOM(container)
      const experience = new Experience('#sketch')
    })

    return () => (
      <div id="container">
        <div id="sketch"></div>
      </div>
    )
  }
})
