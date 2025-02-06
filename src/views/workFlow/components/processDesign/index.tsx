import { defineComponent, ref, onMounted, watch } from 'vue'
import { Drawer } from 'ant-design-vue'
import { merge } from 'lodash'
import { themeApprove } from './config'
import './index.less'
import NodePanel from './components/NodePanel'
import RegisteNode from './components/registerNode'
import { useFormSettingsStore } from '../../../../store/modules/design'
import NodeConfig from '../../common/process/config/NodeConfig'
import { useDebounceUpdate } from '../../../../utils/useDebounceUpdate'
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
    const { debouncedUpdate } = useDebounceUpdate()

    const updateStoreData = (): Promise<void> => {
      return debouncedUpdate(() => {
        console.log('开始更新数据')
        const graphData = lf.value.getGraphData()
        const mergedNodes = graphData.nodes.map((node: any) => {
          const existingNode = formSettingsStore.design.process.nodes.find(
            (n: any) => n.id === node.id
          )
          return existingNode ? merge({}, existingNode, node) : node
        })

        formSettingsStore.design.process = {
          ...graphData,
          nodes: mergedNodes
        }
      })
    }

    const initEvent = (lf: any) => {
      lf.on('element:click', async ({ data }) => {
        await updateStoreData()
        const currentNode = formSettingsStore.design.process.nodes.find(
          (node: any) => node.id === data.id
        )
        formSettingsStore.selectNode = currentNode
        drawerOpen.value = true
      })
      lf.on('connection:not-allowed', (data: any) => {
        console.log(data)
      })
      lf.on('node:add', updateStoreData)
      lf.on('node:delete', updateStoreData)
      lf.on('node:drag', updateStoreData)
      lf.on('edge:add', updateStoreData)
      lf.on('edge:delete', updateStoreData)
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
    watch(
      () => formSettingsStore.design.process,
      (newProcess) => {
        console.log('newProcess', newProcess)
        if (!newProcess) return
        const currentGraphData = lf.value.getGraphData()
        if (JSON.stringify(currentGraphData) !== JSON.stringify(newProcess)) {
          lf.value.render(newProcess)
        }
      },
      { deep: true }
    )

    return () => (
      <div class="approve-example-container">
        <div class="node-panel">
          <NodePanel lf={lf.value}></NodePanel>
        </div>
        <div id="graph" class="viewport" />
        <Drawer
          v-model:visible={drawerOpen.value}
          placement="right"
          destroyOnClose
        >
          <NodeConfig></NodeConfig>
        </Drawer>
      </div>
    )
  }
})
