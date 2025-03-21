export const ValueType = {
  string: 'String',
  object: 'Object',
  array: 'Array',
  number: 'Number',
  date: 'Date',
  user: 'User',
  dept: 'Dept',
  dateRange: 'DateRange'
}

export const baseComponents = [
  {
    name: '布局',
    components: [
      {
        title: '分栏布局',
        name: 'SpanLayout',
        icon: 'QuestionCircleOutlined',
        value: [],
        valueType: ValueType.array,
        props: {
          items: []
        }
      }
    ]
  },
  {
    name: '基础组件',
    components: [
      {
        title: '单行文本输入',
        name: 'TextInput',
        icon: 'QuestionCircleOutlined',
        value: '',
        valueType: ValueType.string,
        props: {
          required: true,
          enablePrint: true
        }
      },
      {
        title: '多行文本输入',
        name: 'TextareaInput',
        icon: 'QuestionCircleOutlined',
        value: '',
        valueType: ValueType.string,
        props: {
          required: false,
          enablePrint: true
        }
      },
      {
        title: '数字输入框',
        name: 'NumberInput',
        icon: 'QuestionCircleOutlined',
        value: '',
        valueType: ValueType.number,
        props: {
          required: false,
          enablePrint: true
        }
      },
      {
        title: '金额输入框',
        name: 'AmountInput',
        icon: 'QuestionCircleOutlined',
        value: '',
        valueType: ValueType.number,
        props: {
          required: false,
          enablePrint: true,
          showChinese: true
        }
      },
      {
        title: '单选框',
        name: 'SelectInput',
        icon: 'QuestionCircleOutlined',
        value: '',
        valueType: ValueType.string,
        props: {
          required: false,
          enablePrint: true,
          expanding: false,
          options: ['选项1', '选项2']
        }
      },
      {
        title: '多选框',
        name: 'MultipleSelect',
        icon: 'QuestionCircleOutlined',
        value: [],
        valueType: ValueType.array,
        props: {
          required: false,
          enablePrint: true,
          expanding: false,
          options: ['选项1', '选项2']
        }
      },
      {
        title: '日期时间点',
        name: 'DateTime',
        icon: 'QuestionCircleOutlined',
        value: '',
        valueType: ValueType.date,
        props: {
          required: false,
          enablePrint: true,
          format: 'yyyy-MM-dd HH:mm'
        }
      },
      {
        title: '日期时间区间',
        name: 'DateTimeRange',
        icon: 'QuestionCircleOutlined',
        valueType: ValueType.dateRange,
        props: {
          required: false,
          enablePrint: true,
          placeholder: ['开始时间', '结束时间'],
          format: 'yyyy-MM-dd HH:mm',
          showLength: false
        }
      },
      {
        title: '上传图片',
        name: 'ImageUpload',
        icon: 'QuestionCircleOutlined',
        value: [],
        valueType: ValueType.array,
        props: {
          required: false,
          enablePrint: true,
          maxSize: 5, //图片最大大小MB
          maxNumber: 10, //最大上传数量
          enableZip: true //图片压缩后再上传
        }
      },
      {
        title: '上传附件',
        name: 'FileUpload',
        icon: 'QuestionCircleOutlined',
        value: [],
        valueType: ValueType.array,
        props: {
          required: false,
          enablePrint: true,
          onlyRead: false, //是否只读，false只能在线预览，true可以下载
          maxSize: 100, //文件最大大小MB
          maxNumber: 10, //最大上传数量
          fileTypes: [] //限制文件上传类型
        }
      },
      {
        title: '人员选择',
        name: 'UserPicker',
        icon: 'QuestionCircleOutlined',
        value: [],
        valueType: ValueType.user,
        props: {
          required: false,
          enablePrint: true,
          multiple: false
        }
      },
      {
        title: '部门选择',
        name: 'DeptPicker',
        icon: 'QuestionCircleOutlined',
        value: [],
        valueType: ValueType.dept,
        props: {
          required: false,
          enablePrint: true,
          multiple: false
        }
      },
      {
        title: '说明文字',
        name: 'Description',
        icon: 'QuestionCircleOutlined',
        value: '',
        valueType: ValueType.string,
        props: {
          required: false,
          enablePrint: true
        }
      }
    ]
  },
  {
    name: '扩展组件',
    components: [
      {
        title: '明细表',
        name: 'TableList',
        icon: 'QuestionCircleOutlined',
        value: [],
        valueType: ValueType.array,
        props: {
          required: false,
          enablePrint: true,
          showBorder: true,
          rowLayout: true,
          showSummary: false,
          summaryColumns: [],
          maxSize: 0, //最大条数，为0则不限制
          columns: [] //列设置
        }
      }
    ]
  }
]

export default {
  baseComponents
}
