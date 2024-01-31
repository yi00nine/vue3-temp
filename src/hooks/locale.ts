import { message } from 'ant-design-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useLocale() {
  const i18n = useI18n()
  const currentLocale = computed(() => i18n.locale.value)
  const changeLocale = (locale: string) => {
    if (i18n.locale.value === locale) return
    i18n.locale.value = locale
    message.success(i18n.t('navbar.action.locale'))
  }
  return {
    currentLocale,
    changeLocale
  }
}
