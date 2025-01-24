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
  formName: string
  remark: string
  settings: {
    notify: NotifySettings
  }
  design: {
    formItems: FormItem[]
  }
  selectFormItem: FormItem | Record<string, never>
}

export const useFormSettingsStore = defineStore('formSettings', {
  state: (): FormSettings => ({
    formName: '',
    remark: '',
    settings: {
      notify: {
        types: [],
        title: ''
      }
    },
    design: {
      formItems: []
    },
    selectFormItem: {}
  }),
  actions: {
    updateFormSettings(settings: Partial<FormSettings>) {
      Object.assign(this, settings)
    }
  }
})
