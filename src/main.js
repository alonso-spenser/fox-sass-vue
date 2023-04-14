import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import cookies from 'js-cookie'
import store from './store'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import './assets/base.scss'
import elementUI from 'element-ui'
import util from './plugins/utility'
import resource from './plugins/resource'
import ajax from './plugins/api/http'
import passport from './plugins/passport'
import checkPermission from './plugins/permission'
import i18n from './plugins/i18n/base'
import moment from 'moment'
import enLocale from 'element-ui/lib/locale/lang/en'
import cnLocale from 'element-ui/lib/locale/lang/zh-CN'
import countdown from './components/countdown/index'
import LinkPicker from './components/link-picker/index'
import SearchEnginePreview from './components/search-engine-preview'
import AddToCollection from './components/article/add-to-collection'
import neighborAction from './components/neighbor-action'
import Sorting from './components/article/sorting'
import foxUI from 'fox-vue-ui'
import VCharts from 'v-charts'
import echarts from 'echarts'

Vue.use(foxUI)
Vue.use(VCharts)
Vue.component('Countdown', countdown)
Vue.component('SearchEnginePreview', SearchEnginePreview)
Vue.component('AddToCollection', AddToCollection)
Vue.component('neighborAction', neighborAction)
Vue.component('Sorting', Sorting)
Vue.component('LinkPicker', LinkPicker)
let locale = util.getLanguage() === 'en' ? enLocale : cnLocale
Vue.prototype.$moment = moment
Vue.use(elementUI, { locale })

Vue.directive('permission', {
  inserted: function (el, binding) {
    const { value } = binding
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
})
Vue.directive('title', {
  inserted: function (el, binding) {
    if (store.state.agentModel) {
      document.title = `${binding.value}-${store.state.agentModel.name}`
    } else {
      document.title = binding.value
    }
  }
})
/**
 * 获取单位
 */
Vue.filter('getUnit', (id) => {
  let res = i18n.t('service.serviceUnit')[id.toString()]
  return res || ''
})
Vue.prototype.axios = ajax
Vue.prototype.utility = util
Vue.prototype.$uti = util
Vue.prototype.$passport = passport
Vue.prototype.resource = resource
Vue.prototype.$cookies = cookies
Vue.prototype.$checkPermission = checkPermission

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
