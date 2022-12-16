import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
export default defineComponent({
  props: [],
  components: {},
  setup(props) {
    return () => <router-view></router-view>
  }
})
