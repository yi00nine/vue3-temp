import { defineStore } from 'pinia'

interface NotifySettings {
  types: string[]
  title: string
}

export interface FormItem {
  id: string
  name: string
  icon: string
  props: {
    enablePrint: boolean
    placeholder: string
    required: boolean
  }
  title: string
  value: string | number
  valueType: string
}

interface FormSettings {
  design: {
    formId: string
    formName: string
    remark: string
    settings: {
      notify: NotifySettings
    }
    formItems: FormItem[]
    process: any
  }
  selectFormItem: FormItem | Record<string, never>
  selectNode: any
}

export const useFormSettingsStore = defineStore('formSettings', {
  state: (): FormSettings => ({
    design: {
      formId: '',
      formName: '',
      remark: '',
      settings: {
        notify: {
          types: [],
          title: ''
        }
      },
      formItems: [],
      process: {}
    },
    selectFormItem: {},
    selectNode: {}
  }),
  actions: {
    updateFormSettings(settings: Partial<FormSettings>) {
      Object.assign(this, settings)
    },
    loadForm(data: any) {
      this.design = data
    }
  }
})
