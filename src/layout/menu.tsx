import { defineComponent, reactive } from 'vue'
import { useAppStore } from '../store/index'

export default defineComponent({
  setup() {
    const appStore = useAppStore()
    return () => (
      <a-menu mode="inline" style="height: 100%">
        <a-sub-menu title="subnav 1">
          <a-menu-item key="1">option1</a-menu-item>
          <a-menu-item key="2">option2</a-menu-item>
          <a-menu-item key="3">option3</a-menu-item>
          <a-menu-item key="4">option4</a-menu-item>
        </a-sub-menu>
      </a-menu>
    )
  }
})
