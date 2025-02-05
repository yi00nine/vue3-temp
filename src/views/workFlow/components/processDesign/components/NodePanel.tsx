import { defineComponent } from 'vue'
import { approveNodes } from '../config'
import { HtmlNodeConfig } from '../type'

export default defineComponent({
  name: 'NodePanel',
  props: {
    lf: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const dragNode = (item: HtmlNodeConfig) => {
      props.lf.dnd.startDrag({
        type: item.type,
        text: item.label
      })
    }

    // 节点菜单
    const getNodePanel = () => {
      return approveNodes.map((item, key) => (
        <div class={`approve-node node-${item.type}`} key={key}>
          <div
            class="node-shape"
            style={{ ...item.style }}
            onMousedown={() => dragNode(item)}
          ></div>
          <div class="node-label">{item.label}</div>
        </div>
      ))
    }

    return () => getNodePanel()
  }
})
