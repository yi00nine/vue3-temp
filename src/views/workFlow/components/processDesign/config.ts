export const approveNodes = [
  {
    type: 'apply',
    label: '申请',
    style: {
      width: '30px',
      height: '30px',
      borderRadius: '15px',
      border: '2px solid #FF6347'
    },
  },
  {
    type: 'approver',
    label: '审批',
    style: {
      width: '50px',
      height: '40px',
      borderRadius: '4px',
      border: '2px solid #3CB371'
    }
  },
  {
    type: 'jugement',
    label: '判断',
    style: {
      width: '30px',
      height: '30px',
      border: '2px solid #6495ED',
      transform: 'rotate(45deg)'
    }
  },
  {
    type: 'finsh',
    label: '结束',
    style: {
      width: '30px',
      height: '30px',
      borderRadius: '15px',
      border: '2px solid #FF6347'
    }
  }
]

// 主题
export const themeApprove = {
  rect: {
    // 矩形样式
    radius: 8,
    stroke: '#3CB371'
  },
  circle: {
    r: 25,
    stroke: '#FF6347'
  },
  polygon: {
    stroke: '#6495ED'
  },
  polyline: {
    strokeWidth: 1
  },
  edgeText: {
    background: {
      fill: 'white'
    }
  }
}

const test = {
  nodes: [
    {
      id: '28df2fbe-f32b-4a9b-b544-7e70d7187b33',
      type: 'apply',
      x: 210,
      y: 210,
      text: { x: 210, y: 210, value: '申请' },
      properties: {}
    },
    {
      id: '64179bd7-c60e-433c-8df7-97c8e98f855d',
      type: 'approver',
      x: 350,
      y: 210,
      text: { x: 350, y: 210, value: '审批' },
      properties: {
        labelColor: '#000000',
        approveTypeLabel: '直接上级',
        approveType: 'leader'
      }
    },
    {
      id: 'fcb96f10-720e-40e5-8ed0-ebdd0a46f234',
      type: 'jugement',
      x: 510,
      y: 210,
      text: { x: 510, y: 210, value: '判断报销是否\n大于1000元' },
      properties: { api: '' }
    },
    {
      id: '9f119df3-c449-4e5d-a67a-cb351b9cbdb5',
      type: 'approver',
      x: 670,
      y: 210,
      text: { x: 670, y: 210, value: '审批' },
      properties: {
        labelColor: '#000000',
        approveTypeLabel: 'T2领导',
        approveType: 't2Leader'
      }
    },
    {
      id: 'ef34f09c-38ea-4ad4-acd2-cc2f464a2be6',
      type: 'finsh',
      x: 850,
      y: 210,
      text: { x: 850, y: 210, value: '结束' },
      properties: {}
    }
  ],
  edges: [
    {
      id: '0d87b1eb-2389-445a-9f34-6227940b2072',
      type: 'polyline',
      sourceNodeId: '28df2fbe-f32b-4a9b-b544-7e70d7187b33',
      targetNodeId: '64179bd7-c60e-433c-8df7-97c8e98f855d',
      startPoint: { x: 235, y: 210 },
      endPoint: { x: 300, y: 210 },
      text: { x: 51.25, y: 0, value: '' },
      properties: {},
      pointsList: [
        { x: 235, y: 210 },
        { x: 300, y: 210 }
      ]
    },
    {
      id: 'd99e7451-b379-411e-b0da-df11be8be20a',
      type: 'polyline',
      sourceNodeId: '64179bd7-c60e-433c-8df7-97c8e98f855d',
      targetNodeId: 'fcb96f10-720e-40e5-8ed0-ebdd0a46f234',
      startPoint: { x: 400, y: 210 },
      endPoint: { x: 475, y: 210 },
      text: { x: 437.5, y: 210, value: '通过' },
      properties: {},
      pointsList: [
        { x: 400, y: 210 },
        { x: 475, y: 210 }
      ]
    },
    {
      id: '4c615802-15d8-442c-be22-b65430286123',
      type: 'polyline',
      sourceNodeId: 'fcb96f10-720e-40e5-8ed0-ebdd0a46f234',
      targetNodeId: '9f119df3-c449-4e5d-a67a-cb351b9cbdb5',
      startPoint: { x: 545, y: 210 },
      endPoint: { x: 620, y: 210 },
      text: { x: 582.5, y: 210, value: '是' },
      properties: {},
      pointsList: [
        { x: 545, y: 210 },
        { x: 620, y: 210 }
      ]
    },
    {
      id: '934ae03a-6ee0-4568-a2b4-8bcede565e0b',
      type: 'polyline',
      sourceNodeId: '9f119df3-c449-4e5d-a67a-cb351b9cbdb5',
      targetNodeId: 'ef34f09c-38ea-4ad4-acd2-cc2f464a2be6',
      startPoint: { x: 720, y: 210 },
      endPoint: { x: 825, y: 210 },
      text: { x: -10, y: 0, value: '' },
      properties: {},
      pointsList: [
        { x: 720, y: 210 },
        { x: 825, y: 210 }
      ]
    },
    {
      id: 'bd5e1dd0-1978-46f7-851b-d31c03aebee9',
      type: 'polyline',
      sourceNodeId: '64179bd7-c60e-433c-8df7-97c8e98f855d',
      targetNodeId: 'ef34f09c-38ea-4ad4-acd2-cc2f464a2be6',
      startPoint: { x: 350, y: 170 },
      endPoint: { x: 850, y: 185 },
      text: { x: 600, y: 140, value: '驳回' },
      properties: {},
      pointsList: [
        { x: 350, y: 170 },
        { x: 350, y: 140 },
        { x: 850, y: 140 },
        { x: 850, y: 185 }
      ]
    },
    {
      id: '453139c3-faa1-4e3a-a413-38f251243baa',
      type: 'polyline',
      sourceNodeId: 'fcb96f10-720e-40e5-8ed0-ebdd0a46f234',
      targetNodeId: 'ef34f09c-38ea-4ad4-acd2-cc2f464a2be6',
      startPoint: { x: 510, y: 245 },
      endPoint: { x: 850, y: 235 },
      text: { x: 680, y: 275, value: '否' },
      properties: {},
      pointsList: [
        { x: 510, y: 245 },
        { x: 510, y: 275 },
        { x: 850, y: 275 },
        { x: 850, y: 235 }
      ]
    }
  ]
}

//审批节点默认属性
export const APPROVAL_PROPS = {
  assignedType: 'ASSIGN_USER',
  mode: 'AND',
  sign: false,
  nobody: {
    handler: 'TO_PASS',
    assignedUser: []
  },
  timeLimit: {
    timeout: {
      unit: 'H',
      value: 0
    },
    handler: {
      type: 'REFUSE',
      notify: {
        once: true,
        hour: 1
      }
    }
  },
  assignedUser: [],
  formPerms: [],
  selfSelect: {
    multiple: false
  },
  leaderTop: {
    endCondition: 'TOP',
    endLevel: 1
  },
  leader: {
    level: 1
  },
  role: [],
  refuse: {
    type: 'TO_END', //驳回规则 TO_END  TO_NODE  TO_BEFORE
    target: '' //驳回到指定ID的节点
  },
  formUser: ''
}

//根节点默认属性
export const ROOT_PROPS = {
  assignedUser: [],
  formPerms: []
}

//条件节点默认属性
export const CONDITION_PROPS = {
  groupsType: 'OR', //条件组逻辑关系 OR、AND
  groups: [
    {
      groupType: 'AND', //条件组内条件关系 OR、AND
      cids: [], //条件ID集合
      conditions: [] //组内子条件
    }
  ],
  expression: '' //自定义表达式，灵活构建逻辑关系
}

//抄送节点默认属性
export const CC_PROPS = {
  shouldAdd: false,
  assignedUser: [],
  formPerms: []
}

//触发器节点默认属性
export const TRIGGER_PROPS = {
  type: 'WEBHOOK',
  http: {
    method: 'GET', //请求方法 支持GET/POST
    url: '', //URL地址，可以直接带参数
    headers: [
      //http header
      {
        name: '',
        isField: true,
        value: '' //支持表达式 ${xxx} xxx为表单字段名称
      }
    ],
    contentType: 'FORM', //请求参数类型
    params: [
      //请求参数
      {
        name: '',
        isField: true, //是表单字段还是自定义
        value: '' //支持表达式 ${xxx} xxx为表单字段名称
      }
    ],
    retry: 1,
    handlerByScript: false,
    success: 'function handlerOk(res) {\n  return true;\n}',
    fail: 'function handlerFail(res) {\n  return true;\n}'
  },
  email: {
    subject: '',
    to: [],
    content: ''
  }
}

//延时节点默认属性
export const DELAY_PROPS = {
  type: 'FIXED', //延时类型 FIXED:到达当前节点后延时固定时长 、AUTO:延时到 dateTime设置的时间
  time: 0, //延时时间
  unit: 'M', //时间单位 D天 H小时 M分钟
  dateTime: '' //如果当天没有超过设置的此时间点，就延时到这个指定的时间，到了就直接跳过不延时
}

export default {
  APPROVAL_PROPS,
  CC_PROPS,
  DELAY_PROPS,
  CONDITION_PROPS,
  ROOT_PROPS,
  TRIGGER_PROPS
}
