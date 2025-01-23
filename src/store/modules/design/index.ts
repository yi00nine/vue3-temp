import { defineStore } from 'pinia'

interface NotifySettings {
  types: string[]
  title: string
}

interface FormSettings {
  formName: string
  remark: string
  settings: {
    notify: NotifySettings
  }
  design: {
    formItems: any[]
  }
  selectFormItem: any
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
