import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  merchantModel: {
    merchant: {
      shortForm: ''
    }
  },
  siteModel: {
    id: '',
    createTime: 1625018655524,
    expiryTime: 1629114091117,
    langCode: 'en',
    langName: '',
    logo: '',
    siteName: '',
    thumbnail: '',
    siteType: 3,
    state: 0,
    systemDomain: '',
    mainDomain: '',
    freeRenewal: 0,
    firstOnline: 1625018655524,
    payMonth: 0,
    isExpired: false,
    bindDomain: false,
    designArticle: 1
  },
  agentId: '',
  platformId: '',
  agentModel: {
    address: '',
    agentName: '',
    email: '',
    icp: null,
    id: '',
    logo: '',
    platformId: '',
    shortForm: 'Hey!MySite',
    website: ''
  },
  mySite: [],
  roles: [],
  autoSyncH1: false,
  globalRegionModel: {
    code: 'en',
    isDefault: 0,
    languageName: '英语',
    nativeName: 'English',
    siteId: ''
  }
}

const mutations = {
  /**
   * 商户信息
   * @param state
   * @param data
   */
  setMerchantModel: (state, data) => {
    state.merchantModel = data
    localStorage.setItem('merchantModel', JSON.stringify(data))
  },

  /**
   * 权限
   */
  setRole: (state, data) => {
    const roles = (data || []).map(({ functionCode }) => functionCode)
    state.roles = roles
    localStorage.setItem('roles', JSON.stringify(roles))
  },
  /**
   * 店铺信息
   */
  setSiteModel: (state, data) => {
    state.siteModel = data
    localStorage.setItem('siteModel', JSON.stringify(data))
  },
  /**
   * 店铺信息
   */
  setMySite: (state, data) => {
    state.mySite = data
    localStorage.setItem('mySite', JSON.stringify(data))
  },
  /**
   * 语言信息
   */
  setGlobalRegionModel: (state, data) => {
    let s = state.siteModel.langList.filter((o) => {
      return o.code === data.code
    })
    data = {
      ...data,
      url: s.length > 0 && s[0].isDefault === 0 ? `http://${state.siteModel.mainDomain}/` : s[0].url
    }
    state.globalRegionModel = data
    localStorage.setItem('globalRegionModel', JSON.stringify(data))
  },
  /**
   * 自动更新H1
   */
  setAutoSyncH1: (state, data) => {
    if (data !== undefined && data !== null) {
      state.autoSyncH1 = data
      localStorage.setItem('autoSyncH1', data)
    }
  }
}
/**
 * 缓存加载
 */
for (let stateKey in state) {
  if (localStorage.getItem(stateKey)) {
    try {
      state[stateKey] = JSON.parse(localStorage.getItem(stateKey))
    } catch (error) {
      state[stateKey] = localStorage.getItem(stateKey)
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
