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
import enBackstage from './en/backstage'
import enEmail from './en/email'
import enCore from './en/core'
import enTheme from './en/theme'
import enSite from './en/site'
import enEnquiry from './en/enquiry'
import enGoods from './en/goods'
import enArticle from './en/article'
import enOptimize from './en/optimize'
import enCustomizePage from './en/customizePage'
import enNavigation from './en/navigation'
import enSettings from './en/settings'
import enDesign from './en/design'
import enDashboard from './en/dashboard'

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
      ...enBackstage,
      ...enEmail,
      ...enCore,
      ...enTheme,
      ...enSite,
      ...enEnquiry,
      ...enGoods,
      ...enArticle,
      ...enOptimize,
      ...enCustomizePage,
      ...enNavigation,
      ...enSettings,
      ...enDesign,
      ...enDashboard
    }
  }
})

export default i18n
