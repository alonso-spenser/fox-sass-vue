import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cnLang from './zh-CN'
import cnErrorCode from './zh-CN/errorCode'
import cnEnumerate from './zh-CN/enumerate'
import cnPassport from './zh-CN/passport'
import utility from '../utility'

import enLang from './en'
import enErrorCode from './en/errorCode'
import enEnumerate from './en/enumerate'
import enPassport from './en/passport'
import enMerchant from './en/merchant'
import enAside from './en/aside'
import enBase from './en/base'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: utility.getLanguage(),
  messages: {
    'zh-CN': {
      ...cnLang,
      ...cnErrorCode,
      ...cnEnumerate,
      ...cnPassport
    },
    en: {
      ...enLang,
      ...enErrorCode,
      ...enEnumerate,
      ...enPassport,
      ...enMerchant,
      ...enAside,
      ...enBase
    }
  }
})

export default i18n
