import { get } from 'lodash'
import { createI18n } from 'vue-i18n'

import { LocaleOptions } from '@/types/constants'
const getMessageFromModules = (_moduleMap: Record<string, unknown>) => {
  const ret = {}
  for (const key in _moduleMap) {
    const exportContent = get(_moduleMap[key], 'default')
    if (exportContent) {
      Object.assign(ret, exportContent)
    }
  }
  return ret
}

const cnMessages = getMessageFromModules(
  import.meta.globEager('./zh-CN/*.json')
)
const enMessages = getMessageFromModules(
  import.meta.globEager('./en-US/*.json')
)
const i18n = createI18n({
  locale: LocaleOptions.cn,
  fallbackLocale: LocaleOptions.cn,
  legacy: false,
  allowComposition: true,
  messages: {
    [LocaleOptions.en]: enMessages,
    [LocaleOptions.cn]: cnMessages
  }
})

export default i18n
