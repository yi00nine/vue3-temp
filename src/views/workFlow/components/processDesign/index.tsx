import { defineComponent, ref, onMounted } from 'vue'
import { Drawer } from 'ant-design-vue'
import { themeApprove } from './config'
import './index.less'
import NodePanel from './components/NodePanel'
import RegisteNode from './components/registerNode'
import { useFormSettingsStore } from '../../../../store/modules/design'
import NodeConfig from '../../common/process/config/NodeConfig'
const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  grid: {
    size: 10,
    visible: true,
    type: 'mesh',
    config: {
      color: '#DCDCDC'
    }
  },
  keyboard: { enabled: true },
  style: themeApprove
}

export default defineComponent({
  name: 'ApproveExample',
  setup() {
    const lf: any = ref({})
    const formSettingsStore = useFormSettingsStore()
    const drawerOpen = ref(false)
    const initEvent = (lf: any) => {
      lf.on('element:click', ({ data }) => {
        const currentNode = formSettingsStore.design.process.nodes.find(
          (node: any) => node.id === data.id
        )

        formSettingsStore.selectNode = currentNode
        drawerOpen.value = true
      })
      lf.on('connection:not-allowed', (data: any) => {
        console.log(data)
      })
    }
    onMounted(() => {
      const logicFlow = new Core.default({
        ...config,
        container: document.querySelector('#graph') as HTMLElement
      })
      lf.value = logicFlow
      window.lf = logicFlow
      RegisteNode(lf.value)
      logicFlow.render(formSettingsStore.design.process)
      initEvent(lf.value)
    })

    return () => (
      <div class="approve-example-container">
        <div class="node-panel">
          <NodePanel lf={lf.value}></NodePanel>
        </div>
        <div id="graph" class="viewport" />
        <Drawer v-model:visible={drawerOpen.value} placement="right">
          <NodeConfig></NodeConfig>
        </Drawer>
      </div>
    )
  }
})
