import { nodeProperty } from '../type'

export default function RegisteNode(lf: any) {
  class ApplyNodeModel extends Core.CircleNodeModel {
    getConnectedTargetRules(): any {
      const rules = super.getConnectedTargetRules()
      const geteWayOnlyAsTarget = {
        message: '开始节点只能连出，不能连入！',
        validate: (source: Core.BaseNodeModel, target: Core.BaseNodeModel) => {
          let isValid = true
          if (target) {
            isValid = false
          }
          return isValid
        }
      }
      rules.push(geteWayOnlyAsTarget)
      return rules
    }
  }
  lf.register({
    type: 'apply',
    view: Core.CircleNode,
    model: ApplyNodeModel
  })

  class ApproverNode extends Core.RectNode {
    static extendKey = 'UserTaskNode'
    getLabelShape() {
      const { x, y, width, height, properties } = this.props.model
      const { labelColor, approveTypeLabel } = properties as nodeProperty
      return Core.h(
        'text',
        {
          fill: labelColor,
          fontSize: 12,
          x: x - width / 2 + 5,
          y: y - height / 2 + 15,
          width: 50,
          height: 25
        },
        approveTypeLabel
      )
    }
    getShape() {
      const { x, y, width, height, radius } = this.props.model
      const style = this.props.model.getNodeStyle()
      return Core.h('g', {}, [
        Core.h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width,
          height
        }),
        this.getLabelShape()
      ])
    }
  }
  class ApproverModel extends Core.RectNodeModel {
    constructor(data: any, graphModel: Core.GraphModel) {
      super(data, graphModel)
      this.properties = {
        labelColor: '#000000',
        approveTypeLabel: '',
        approveType: ''
      }
    }
  }

  lf.register({
    type: 'approver',
    view: ApproverNode,
    model: ApproverModel
  })

  class JugementModel extends Core.PolygonNodeModel {
    constructor(data: any, graphModel: Core.GraphModel) {
      super(data, graphModel)
      this.points = [
        [35, 0],
        [70, 35],
        [35, 70],
        [0, 35]
      ]
      this.properties = {
        api: ''
      }
    }
  }
  lf.register({
    type: 'jugement',
    view: Core.PolygonNode,
    model: JugementModel
  })

  class FinshNodeModel extends Core.CircleNodeModel {
    getConnectedSourceRules(): any {
      const rules = super.getConnectedSourceRules()
      const geteWayOnlyAsTarget = {
        message: '结束节点只能连入，不能连出！',
        validate: (source: Core.BaseNodeModel) => {
          let isValid = true
          if (source) {
            isValid = false
          }
          return isValid
        }
      }
      rules.push(geteWayOnlyAsTarget)
      return rules
    }
  }
  lf.register({
    type: 'finsh',
    view: Core.CircleNode,
    model: FinshNodeModel
  })
}
