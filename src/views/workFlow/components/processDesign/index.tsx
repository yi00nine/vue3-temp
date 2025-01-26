import { defineComponent, ref, onMounted } from 'vue'
import { themeApprove, data } from './config'
import './index.less'
import NodePanel from './components/NodePanel'
import RegisteNode from './components/registerNode'
import PropertyPanel from './components/Property'
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
    const lf:any = ref({})
    const nodeData:any = ref(null)
    const initEvent = (lf: any) => { 
      lf.on('element:click', ({ data }) => {
        nodeData.value = data
        console.log(JSON.stringify(lf.getGraphData()));
      });
      lf.on('connection:not-allowed', (data: any) => {
        console.log(data)
      });
    }
    onMounted(() => {
      const logicFlow = new Core.default({
        ...config,
        container: document.querySelector('#graph') as HTMLElement
      })
      lf.value = logicFlow
      RegisteNode(lf.value)
      logicFlow.render(data)
      initEvent(lf.value)
    })

    const updateProperty = (id: string, data: any) => {
      const node = lf.value.graphModel.nodesMap[id];
      const edge = lf.value.graphModel.edgesMap[id];
      if (node) {
        node.model.setProperties(Object.assign(node.model.properties, data));
      } else if (edge) {
        edge.model.setProperties(Object.assign(edge.model.properties, data));
      }
    }

    const hidePropertyPanel = () => { 
      nodeData.value = undefined
    }

    return () => (
      <div class="approve-example-container">
        <div class="node-panel">
          <NodePanel lf={lf.value}></NodePanel>
        </div>
        <div id="graph" class="viewport" />
        {
          nodeData.value ? <div>
            <PropertyPanel class='property-panel' nodeData={nodeData.value} updateproperty={updateProperty} hidePropertyPanel={hidePropertyPanel}></PropertyPanel>
          </div> : ''
        }
      </div>
    )
  }
})
