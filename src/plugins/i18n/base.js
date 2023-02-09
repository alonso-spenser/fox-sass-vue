import Vue from 'vue'
import VueI18n from 'vue-i18n'
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
import enClient from './en/client'
import enCollect from './en/collect'
import enPlug from './en/plug'
import enDownload from './en/download'
import enGa from './en/ga'

import cnLang from './zh-CN'
import cnErrorCode from './zh-CN/errorCode'
import cnEnumerate from './zh-CN/enumerate'
import cnPassport from './zh-CN/passport'
import cnMerchant from './zh-CN/merchant'
import cnAside from './zh-CN/aside'
import cnBackstage from './zh-CN/backstage'
import cnEmail from './zh-CN/email'
import cnCore from './zh-CN/core'
import cnTheme from './zh-CN/theme'
import cnSite from './zh-CN/site'
import cnEnquiry from './zh-CN/enquiry'
import cnGoods from './zh-CN/goods'
import cnArticle from './zh-CN/article'
import cnOptimize from './zh-CN/optimize'
import cnCustomizePage from './zh-CN/customizePage'
import cnNavigation from './zh-CN/navigation'
import cnSettings from './zh-CN/settings'
import cnDesign from './zh-CN/design'
import cnDashboard from './zh-CN/dashboard'
import cnClient from './zh-CN/client'
import cnCollect from './zh-CN/collect'
import cnPlug from './zh-CN/plug'
import cnDownload from './zh-CN/download'
import cnGa from './zh-CN/ga'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: utility.getLanguage(),
  messages: {
    'zh-CN': {
      ...cnLang,
      ...cnErrorCode,
      ...cnEnumerate,
      ...cnPassport,
      ...cnMerchant,
      ...cnAside,
      ...cnBackstage,
      ...cnEmail,
      ...cnCore,
      ...cnTheme,
      ...cnSite,
      ...cnEnquiry,
      ...cnGoods,
      ...cnArticle,
      ...cnOptimize,
      ...cnCustomizePage,
      ...cnNavigation,
      ...cnSettings,
      ...cnDesign,
      ...cnDashboard,
      ...cnClient,
      ...cnCollect,
      ...cnPlug,
      ...cnDownload,
      ...cnGa
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
      ...enDashboard,
      ...enClient,
      ...enCollect,
      ...enPlug,
      ...enDownload,
      ...enGa
    }
  }
})

export default i18n
